const TestModel = require("../../models/test");
const questionController = require("./question_controller");
const logger = require("../../logger");

class TestService {
  /**
   *
   * @returns Array array of all tests
   */
  get_all_tests = async () => {
    try {
      return await TestModel.find({})
        .populate("topic_id")
        .populate({
          path: "questions",
          model: "Question",
          populate: { path: "optional_answers", model: "Answer" },
        });
    } catch (err) {
      logger.error(err);
    }
  };

  /**
   *  get test by id without is correct
   * @returns test
   */
  get_test_by_id_without_correct = async (id) => {
    try {
      return await TestModel.findById(id)
        .populate("topic_id")
        .populate({
          path: "questions",
          model: "Question",
          populate: { path: "optional_answers", model: "Answer",select:'-is_correct' },
        });
    } catch (err) {
      logger.error(err);
    }
  };

    /**
   *  get test by id with is correct
   * @returns test
   */
     get_test_by_id_with_correct = async (id) => {
      try {
        return await TestModel.findById(id)
          .populate("topic_id")
          .populate({
            path: "questions",
            model: "Question",
            populate: { path: "optional_answers", model: "Answer" },
          });
      } catch (err) {
        logger.error(err);
      }
    };

  /**
   *
   * @param {*} test
   * @returns new test if success, null if failed
   */
  add_test = async (test) => {
    const model = new TestModel(test);
    const validatedModel = model.validateSync();
    if (!!validatedModel) return null;
    try {
      const test_added = await TestModel.create(model);
      await increment_test_question_count(test_added.questions);
      await TestModel.populate(test_added, "topic_id");
      await TestModel.populate(test_added, "questions");
      await TestModel.populate(test_added, {
        path: "questions",
        model: "Question",
        populate: { path: "optional_answers", model: "Answer" },
      });
      return test_added;
    } catch (err) {
      logger.error(err);
    }
  };
  /**
   * Update existing test
   * @param {*} test
   * @returns Updated test if success, null if failed
   */
  update_test = async (test) => {
    const test_id = test._id;
    delete test._id;
    const model = new TestModel(test);
    const validatedModel = model.validateSync();
    if (!!validatedModel) return null;
    await decrement_previous_questions_tests(test_id);
    try {
      const test_model = await TestModel.findByIdAndUpdate(test_id, model, {
        new: true,
      })
        .populate("topic_id")
        .populate("questions")
        .populate({
          path: "questions",
          model: "Question",
          populate: { path: "optional_answers", model: "Answer" },
        });
      await increment_test_question_count(test_model.questions);
      return test_model;
    } catch (err) {
      logger.error(err);
    }
  };
}
const decrement_previous_questions_tests = async (test_id) => {
  try {
    const test_found = await TestModel.find({ _id: test_id });
    for (const question_id of test_found.questions) {
      await questionController.decrement_test_count(question_id);
    }
  } catch (err) {
    logger.error(err);
  }
};
const increment_test_question_count = async (questions) => {
  for (const question_id of questions) {
    await questionController.increment_test_count(question_id);
  }
};
module.exports = new TestService();
