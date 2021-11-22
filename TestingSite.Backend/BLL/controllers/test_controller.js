const TestModel = require('../../models/test');
const questionController = require('./question_controller');

class TestService {
    /**
     * 
     * @returns Array array of all tests
     */
  get_all_tests = async () => {
    return await TestModel.find({});
  };
  /**
   * 
   * @param {*} test 
   * @returns new test if success, null if failed
   */
  add_test = async (test) =>{
      const model = populate_test(question);
      const validatedModel = model.validateSync();
      if(!!validatedModel) return null;
      const test_model = await TestModel.create(model);
      await increment_test_question_count(test_model.questions);
      return test_model;
  }
  /**
   * Update existing test
   * @param {*} test 
   * @returns Updated test if success, null if failed
   */
  update_test = async (test) =>{
      const model = new TestModel(test);
      const validatedModel = model.validateSync();
      if(!!validatedModel) return null;
      await decrement_previous_questions_tests(test._id);
      const test_model = await TestModel.findByIdAndUpdate(test._id,model,{
          overwrite: true,
          new: true,
      });
      await increment_test_question_count(test_model.questions);
      return test_model;
  }
}
const decrement_previous_questions_tests = async(test_id)=>{
    const test_found = await TestModel.find({_id: test_id});
    test_found.questions.forEach(question_id => {
        await questionController.decrement_test_count(question_id);
    });
}
const increment_test_question_count = async(questions)=>{
    questions.forEach(question_id => {
        await questionController.increment_test_count(question_id);
      });
}
module.exports = new TestService();
