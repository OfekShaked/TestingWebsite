const TestModel = require("../../models/test");
const questionController = require("./question_controller");
const logger = require("../../logger");

class TestService {
  /**
   *
   * @returns Array array of all tests
   */
  get_all_tests = async (topic_id) => {
    try {
      return await TestModel.find({'topic_id':topic_id})
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

    //get test names with their id
    get_all_test_names = async(topic_id) =>{
      try{
        return await TestModel.find({topic_id:topic_id}).select("name _id");
      }catch(err){
        logger.error(err);
      }
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
      await set_questions_active(test_added.questions);
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
    delete test.createdAt;
    const model = new TestModel(test);
    const validatedModel = model.validateSync();
    if (!!validatedModel) return null;
    var modelCopy = model.toObject(); //turn object back
    await decrement_previous_questions_tests(test_id);
    try {
      delete modelCopy._id;
      delete modelCopy.createdAt;
      const test_model = await TestModel.findByIdAndUpdate(test_id, modelCopy, {
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
      await set_questions_active(test_model.questions);
      return test_model;
    } catch (err) {
      logger.error(err);
    }
  };

  set_test_active = async (test_id) =>{
    await TestModel.findByIdAndUpdate(test_id,{is_active:true});
  }
}

//set questions to active after they appear in a test
const set_questions_active = async (questions) =>{
  for (let index = 0; index < questions.length; index++) {
    const question = questions[index];
    await questionController.set_question_active(question._id);
  }
}

//decrement all questions test count before updating a test
const decrement_previous_questions_tests = async (test_id) => {
  try {
    const test_found = await TestModel.findById(test_id);
    for (const question_id of test_found.questions) {
      await questionController.decrement_test_count(question_id);
    }
  } catch (err) {
    logger.error(err);
  }
};

//increment test count for every question that appears in a test
const increment_test_question_count = async (questions) => {
  for (const question_id of questions) {
    await questionController.increment_test_count(question_id);
  }
};
module.exports = new TestService();
