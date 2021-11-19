const TestModel = require('../../models/test');

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
      return await TestModel.create(model);
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
      return await TestModel.findByIdAndUpdate(test._id,model,{
          overwrite: true,
          new: true,
      })
  }
}

module.exports = new TestService();
