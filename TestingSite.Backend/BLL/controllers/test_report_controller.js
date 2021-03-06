const logger = require("../../logger");
const TestTakenModel = require("../../models/test_taken");

class TestReportService {
  /**
   * get test report by date
   * @param {*} user
   * @returns
   */
  get_test_report_by_date = async (test_id, start_date, end_date) => {
    let startDate = Date.parse(start_date);
    let endDate = Date.parse(end_date);
    const report = { summary: {}, grades: [], questions: [], tests: [] };
    try {
      let tests_to_create_report_on = await TestTakenModel.find({
        test_id: test_id,
        createdAt: {
          $gt: startDate,
          $lt: endDate,
        },
      });
      if (tests_to_create_report_on.length > 0) {
        tests_to_create_report_on = await populate_test_report(
          tests_to_create_report_on
        );
        report.summary = get_test_summary(
          tests_to_create_report_on,
          start_date,
          end_date
        );
        report.tests = tests_to_create_report_on;
        report.question_statistics = get_question_statistics(
          tests_to_create_report_on
        );
      }
      return report;
    } catch (err) {
      logger.error(err);
    }
  };

  get_test_report_by_id = async (test_id) => {
    const report = { summary: {} };
    try {
      let tests_to_create_report_on = await TestTakenModel.find({
        test_id: test_id,
      });
      tests_to_create_report_on = await populate_test_report(
        tests_to_create_report_on
      );
      report.summary = get_test_summary(tests_to_create_report_on, "", "");
      report.tests = tests_to_create_report_on;
      report.question_statistics = get_question_statistics(
        tests_to_create_report_on
      );
      return report;
    } catch (err) {
      logger.error(err);
    }
  };
}

/**
 * get statistics about the questions
 * @param {*} tests_to_report list of TestTaken
 * @returns object with question statistics
 */
const get_question_statistics = (tests_to_report) => {
  let questions = add_basic_question_statistics(tests_to_report);
  for (let j = 0; j < tests_to_report.length; j++) {
    //loop tests taken
    const test_taken = tests_to_report[j];
    for (let i = 0; i < test_taken.test_questions.length; i++) {
      //loop questions in
      const question = test_taken.test_questions[i];
      let num_of_correct_questions = 0;
      question.question_id.optional_answers.forEach((ans) => {
        if (ans.is_correct) num_of_correct_questions++;
      });
      let is_skip = false;
      for (let k = 0; k < question.answers_chosen.length; k++) {
        //loop answers
        const answer = question.answers_chosen[k];
        if (!answer.is_correct) {
          is_skip = true;
        }
        questions[i] = increment_answer_chosen_count(questions[i], answer);
      }
      if (is_skip) continue; //skip if not all answers were correct
      if (question.answers_chosen.length === num_of_correct_questions)
        questions[i].num_passed += 1;
    }
  }
  questions = add_questions_summary(questions, tests_to_report);
  return questions;
};

const add_questions_summary = (questions, tests_to_report) => {
  let questions_to_update = questions.map((question) => {
    let question_edit = { ...question };
    question_edit.num_of_submissions = tests_to_report.length;
    question_edit.answer_correct_percent = Math.round(
      (question.num_passed / tests_to_report.length) * 100
    );
    return question_edit;
  });
  return questions_to_update;
};

const add_basic_question_statistics = (tests_to_report) => {
  let questions = [];
  tests_to_report[0].test_id.questions.forEach((question) => {
    //add question statistic object
    let answers = [];
    question.optional_answers.forEach((answer) => {
      //loop answers in the questions
      answers.push({ answer: answer, num_chosen: 0 }); //set basic answer statistics object
    });
    questions.push({
      question: question,
      num_passed: 0,
      answer_statistics: answers,
    });
  });
  return questions;
};

/**
 * Increment count for each answer chosen
 * @param {*} question
 * @param {*} answer
 * @returns
 */
const increment_answer_chosen_count = (question, answer) => {
  for (let index = 0; index < question.answer_statistics.length; index++) {
    let answer_stats = question.answer_statistics[index];
    if (answer_stats.answer._id.equals(answer._id)) {
      answer_stats.num_chosen += 1;
      break;
    }
  }
  return question;
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
  summary.id = tests[0].test_id._id;
  summary.num_of_questions = tests[0].test_id.questions.length;
  summary.passing_grade = tests[0].test_id.passing_grade;
  summary.date_range = `${start_date} - ${end_date}`;
  summary.number_of_submissions = tests.length;
  let { num_passed, passing_percentage, avg_score } = get_general_scores(tests);
  summary.num_passed = num_passed;
  summary.passing_percentage = passing_percentage;
  summary.average_grade = avg_score;
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
    sum += !isNaN(test_taken.grade) ? test_taken.grade : 0;
    if (test_taken.grade >= test_taken.test_id.passing_grade) num_passed++;
  }
  let passing_percentage = Math.round((num_passed / tests.length) * 100);
  let avg_score = Math.round(sum / tests.length);
  return {
    num_passed,
    passing_percentage,
    avg_score,
  };
};

const populate_test_report = async (test_report) => {
  try {
    await TestTakenModel.populate(test_report, {
      path: "test_id",
      populate: { path: "questions", populate: { path: "optional_answers" } },
    });
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
    await TestTakenModel.populate(test_report, {
      path: "test_questions.answers_chosen",
      model: "Answer",
    });
    return test_report;
  } catch (err) {
    logger.error(err);
  }
};

module.exports = new TestReportService();
