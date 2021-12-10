const logger = require("../../logger");
const TestTakenModel = require("../../models/test_taken");

class TestReportService {
  /**
   * get test report by date
   * @param {*} user
   * @returns
   */
  get_test_report_by_date = async (start_date, end_date, test_id) => {
    let startDate = Date.parse(start_date);
    let endDate = Date.parse(end_date);
    const report = { summary: {}, grades: [], questions: [] };
    const tests_to_create_report_on = await TestTakenModel.find({
      test_id: test_id,
      createdAt: {
        $gt: startDate,
        $lt: endDate,
      },
    });
    tests_to_create_report_on = await populate_test_report(tests_to_create_report_on);
    report.summary = get_test_summary(tests_to_create_report_on,start_date, end_date);
    report.tests = tests_to_create_report_on;
    report.question_statistics = get_question_statistics(
      tests_to_create_report_on
    );
    return report;
  };

  get_test_report_by_id = async(test_id) =>{
    const report = { summary: {}, grades: [], questions: [] };
    let tests_to_create_report_on = await TestTakenModel.find({test_id:test_id});
    tests_to_create_report_on = await populate_test_report(tests_to_create_report_on);
    report.summary = get_test_summary(tests_to_create_report_on,"","");
    report.tests = tests_to_create_report_on;
    report.question_statistics = get_question_statistics(
      tests_to_create_report_on
    );
    return report;
  }
}

const get_question_statistics = (tests_to_report) => {
  let questions = [];
  tests_to_report[0].test_id.questions.forEach((question)=>{
    questions.push( {question:{question},num_passed:0})
  });
  for (let j = 0; j < tests_to_report.length; j++) {
    const test_taken = tests_to_report[j];
    for (let i = 0; i < test_taken.test_questions.length; i++) {
      const question = test_taken.test_questions[i];
      let num_of_correct_questions = 0;
      question.question_id.optional_answers.forEach((ans) => {
        if (ans.is_correct) num_of_correct_questions++;
      });
      for (let k = 0; k < question.answers_chosen.length; k++) {
        const answer = question.answers_chosen[k];
        if (!answer.is_correct) i += 1;
      }
      if (question.answers_chosen.length === num_of_correct_questions)
        questions[i].num_passed+=1;
    }
  }
  questions.map((question=>{
    let question_edit={...question};
    question_edit.num_of_submissions=tests_to_report.length;
    question_edit.answer_correct_percent=Math.round((question.num_passed / tests_to_report.length) * 100);
    return question_edit;
  }))
  return questions;
};

/**
 * get general summary of the test taken
 * @param {*} tests tests taken
 * @param {*} start_date start date to check on
 * @param {*} end_date end date to check on
 * @returns
 */
const get_test_summary = (tests, start_date, end_date) => {
  let summary = {};
  summary.name = tests[0].test_id.name;
  summary.Id = tests[0].test_id._id;
  summary.num_of_questions = tests[0].test_id.questions.length;
  summary.passing_grade = tests[0].test_id.passing_grade;
  summary.date_rage = `${start_date} - ${end_date}`;
  summary.number_of_submissions = tests.length;
  let { num_passed, passing_percentage, average_grade } =
    get_general_scores(tests);
  summary.num_passed = num_passed;
  summary.passing_percentage = passing_percentage;
  summary.average_grade = average_grade;
  return summary;
};

/**
 * get general statistics about the test
 * @param {*} tests tests taken
 * @returns
 */
const get_general_scores = (tests) => {
  let sum = 0;
  let num_passed = 0;
  for (let i = 0; i < tests.length; i++) {
    const test_taken = tests[i];
    sum += test_taken.grade;
    if (test_taken.grade >= test_taken.test_id.passing_grade) num_passed++;
  }
  let passing_percentage = Math.round((num_passed / tests.length) * 100);
  let avg_score = sum / tests.length;
  return {
    num_passed,
    passing_percentage,
    avg_score,
  };
};

const populate_test_report = async(test_report) => {
  await TestTakenModel.populate(test_report, "test_id");
  await TestTakenModel.populate(test_report, "user");
  await TestTakenModel.populate(test_report, {
    path: "test_questions",
    model: "TestTakenQuestion",
    populate: {
      path: "question_id",
      model: "Question",
      populate: { path: "optional_answers", model: "Answer" },
    },
  });
  await TestTakenModel.populate(test_report,{path:"test_questions.answers_chosen", model: "Answer"});
  return test_report;
};

module.exports = new TestReportService();
