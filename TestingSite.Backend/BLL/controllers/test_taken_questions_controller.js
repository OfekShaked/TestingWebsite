const TestTakenQuestionModel = require("../../models/test_taken_question");
const logger = require("../../logger");

class TestTakenQuestionService {
  /**
   * Add test taken question and populate answers
   * @param {*} test_taken_question
   * @returns added model with ids and answers
   */
  add_test_taken_question = async (test_taken_question) => {
    const model = new TestTakenQuestionModel(test_taken_question);
    const validatedModel = model.validateSync();
    if (!!validatedModel) return null;
    try {
      const test_taken_question_added = await TestTakenQuestionModel.create(
        model
      );
      await TestTakenQuestionModel.populate(
        test_taken_question_added,
        "answers_chosen"
      );
      return test_taken_question_added;
    } catch (err) {
      logger.error(err);
    }
  };
}
module.exports = new TestTakenQuestionService();
