const TestModel = require("../../models/test");
const questionController = require("./question_controller");

class TestService {
  /**
   *
   * @returns Array array of all tests
   */
  get_all_tests = async () => {
    return await TestModel.find({}).populate("topic_id").populate("questions").populate('optional_answers');
  };

  /**
   *  get test by id
   * @returns test
   */
  get_test_by_id = async(id)=>{
    return await TestModel.findById(id).populate("topic_id").populate("questions").populate('optional_answers');
}

  /**
   *
   * @param {*} test
   * @returns new test if success, null if failed
   */
  add_test = async (test) => {
    const model = new TestModel(test);
    const validatedModel = model.validateSync();
    if (!!validatedModel) return null;
    const test_added = await TestModel.create(model);
    await increment_test_question_count(test_added.questions);
    await TestModel.populate(test_added, "topic_id");
    await TestModel.populate(test_added, "questions");
    await TestModel.populate(test_added, "optional_answers")
    return test_added;
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
    const test_model = await TestModel.findByIdAndUpdate(test_id, model, {
      new: true,
    })
      .populate("topic_id")
      .populate("questions")
      .populate('optional_answers');
    await increment_test_question_count(test_model.questions);
    return test_model;
  };
}
const decrement_previous_questions_tests = async (test_id) => {
  const test_found = await TestModel.find({ _id: test_id });
  for (const question_id of test_found.questions) {
    await questionController.decrement_test_count(question_id);
  }
};
const increment_test_question_count = async (questions) => {
  for (const question_id of questions) {
    await questionController.increment_test_count(question_id);
  }
};
module.exports = new TestService();
