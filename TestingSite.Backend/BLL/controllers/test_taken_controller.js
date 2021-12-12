const TestTakenModel = require("../../models/test_taken");
const user_controller = require("./user_controller");
const test_taken_question_controller = require("./test_taken_questions_controller");
const user_test_report_controller = require('./user_report_controller');
const logger = require("../../logger");

class TestTakenService {
  add_test_taken = async (test_taken) => {
    const test_taken_modified = await add_user_and_questions(test_taken);
    const model = new TestTakenModel(test_taken_modified);
    const validatedModel = model.validateSync();
    if (!!validatedModel) return null;
    try {
      const test_taken_added = await TestTakenModel.create(model);
      await TestTakenModel.populate(test_taken_added, "test_id");
      await TestTakenModel.populate(test_taken_added, "user");
      await TestTakenModel.populate(test_taken_added, {
        path: "test_questions",
        model: "TestTakenQuestion",
        populate: {
          path: "question_id",
          model: "Question",
          populate: { path: "optional_answers", model: "Answer" },
        },
      });
      await TestTakenModel.populate(test_taken_added,{path:"test_questions.answers_chosen", model: "Answer"});
      test_taken_added.grade = await calculate_grade(test_taken_added);
      await test_taken_added.save();
      if(test_taken_added.test_id.is_answer_shown){
        return user_test_report_controller.get_user_test_report(test_taken_added._id);
      }else{
        return {
          grade: test_taken_added.grade,
        };
      }
    } catch (err) {
      logger.error(err);
    }
  };
}

const add_user_and_questions = async (test_taken) => {
  const user_added = await user_controller.add_user(test_taken.user);
  if (user_added == null) return null;
  else test_taken.user = user_added;
  let test_taken_questions_added = [];
  for (let index = 0; index < test_taken.test_questions.length; index++) {
      const ques = test_taken.test_questions[index];
      const test_taken_question = await test_taken_question_controller.add_test_taken_question(ques);
      test_taken_questions_added.push(test_taken_question);
  }
  if (test_taken_questions_added.includes(null)) return null;
  test_taken.test_questions = test_taken_questions_added;
  return test_taken;
};

const calculate_grade = async (test_taken) => {
  const score_for_question = 100 / test_taken.test_questions.length;
  let grade = 0;
  for (let i = 0; i < test_taken.test_questions.length; i++) {
    const question = test_taken.test_questions[i];
    let num_of_correct_questions = 0;
    question.question_id.optional_answers.forEach((ans) => {
      if (ans.is_correct) num_of_correct_questions++;
    });
    let is_skip = false;
    for (let j = 0; j < question.answers_chosen.length; j++) {
      const answer = question.answers_chosen[j];
      if (!answer.is_correct) {
        is_skip=true;
        j=question.answers_chosen.length;
      }
    }
    if(is_skip) continue;
    if (question.answers_chosen.length === num_of_correct_questions)
      grade += score_for_question;
  }
  return grade;
};
module.exports = new TestTakenService();
