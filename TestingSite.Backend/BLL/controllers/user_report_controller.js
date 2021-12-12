const UserModel = require("../../models/user");
const TestTakenModel = require("../../models/test_taken");
const logger = require("../../logger");

class UserReportService {
  /**
   * Get all tests submitted by a user by an email
   * @param {*} user_id
   */
  get_user_tests_by_email = async (user_email) => {
    const users = await UserModel.find({ email: user_email }, { _id: 1 });
    const ids = users.map((user) => {
      return user._id;
    });
    const tests_to_send = await TestTakenModel.find({ user: { $in: ids } });
    await TestTakenModel.populate(tests_to_send, "test_id");
    return tests_to_send;
  };

  get_user_test_report = async (test_taken_id) => {
    let test = await TestTakenModel.findById(test_taken_id);
    test = await populate_test(test);
    let report = { summary: {}, questions: [] };
    report.summary = await get_test_summary(test);
    let [questions, correct_questions] = await get_question_details(test);
    report.questions = questions;
    report.summary.num_of_correct_questions = correct_questions;
    return report;
  };
}

const get_question_details = async (test) => {
  let correct_questions = 0;
  let questions = [];
  for (let i = 0; i < test.test_questions.length; i++) {
    const question = test.test_questions[i];
    let question_to_add = {
      id:question.question_id._id,
      name: question.question_id.text,
      is_correct: false,
      last_modified:question.createdAt,
      answers: [],
    };
    let num_of_correct_answers = 0;
    question.question_id.optional_answers.forEach((ans) => {
      if (ans.is_correct) num_of_correct_answers++;
      question_to_add.answers.push({
        id: ans._id,
        text: ans.text,
        is_correct: ans.is_correct,
        is_selected: false,
      });
    });
    let is_skip = false;
    for (let j = 0; j < question.answers_chosen.length; j++) {
      const answer = question.answers_chosen[j];
      question_to_add.answers[
        question_to_add.answers.findIndex((ans) => ans.id.equals(answer._id))
      ].is_selected = true;
      if (!answer.is_correct) {
        if (j === question.answers_chosen.length - 1)
          questions.push(question_to_add);
        is_skip = true;
        j = question.answers_chosen.length;
      }
    }
    if (is_skip) continue;
    if (question.answers_chosen.length === num_of_correct_answers) {
      question_to_add.is_correct = true;
      correct_questions += 1;
    }
    questions.push(question_to_add);
  }
  return [questions, correct_questions];
};

const get_test_summary = async (test) => {
  let summary = {};
  summary.name = test.test_id.name;
  summary.id = test.test_id._id;
  summary.num_of_questions = test.test_id.questions.length;
  summary.passing_grade = test.test_id.passing_grade;
  summary.last_submitted = test.createdAt;
  summary.number_of_questions_submitted = test.test_questions.length;
  summary.grade = test.grade;
  summary.user_name = test.user.name;
  return summary;
};

const populate_test = async (test) => {
    await TestTakenModel.populate(test, "test_id");
    await TestTakenModel.populate(test, "user");
    await TestTakenModel.populate(test, {
      path: "test_questions",
      model: "TestTakenQuestion",
      populate: {
        path: "question_id",
        model: "Question",
        populate: { path: "optional_answers", model: "Answer" },
      },
    });
    await TestTakenModel.populate(test,{path:"test_questions.answers_chosen", model: "Answer"});
  return test;
};
module.exports = new UserReportService();
