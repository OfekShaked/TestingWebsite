const DBManager = require("./db_manager");
const OrganizationModel = require('../models/organization');
const testController = require('../BLL/controllers/test_controller')
const questionController = require('../BLL/controllers/question_controller');
const TopicModel = require('../models/topic');
const defaultData = require('./default_data');

const dbman = new DBManager();
let topic;
let questions=[];
let tests = [];
afterAll(async () => {
    await dbman.cleanup();
    await dbman.stop();
  });
beforeAll(async () => {
    await dbman.start();
    await addDefaultTopicAndOrganization();
    await addQuestionsToDb();
});

it("can be added successfully", async ()=>{
    let test_to_add = defaultData.get_default_tests(topic._id,questions)[0];
    const test_added = await testController.add_test(test_to_add);
    if(test_added!=null)tests.push(test_added);
    expect(test_added._id).toBeDefined();
    expect(test_to_add.name).toBe(test_added.name);
})

it("can be updated successfully", async ()=>{
    let test_to_add = defaultData.get_default_tests(topic._id,questions)[0];
    const test_added = await testController.add_test(test_to_add);
    let test_to_update = defaultData.get_default_tests(topic._id,questions)[0];
    test_to_update._id = test_added._id;
    test_to_update.name = "Updated test";
    const updated_test = await testController.update_test(test_to_update);
    if(updated_test!=null) tests.push(updated_test);
    expect(updated_test._id).toBeDefined();
    expect(test_added._id).toStrictEqual(updated_test._id);
    expect(updated_test.name).toBe(test_to_update.name);
})
it("should get all tests by topic", async() =>{
    let tests_found = await testController.get_all_tests(topic._id);
    expect(tests_found.length).toBe(tests.length);
})

it("should get a test by id without the correct answers for questions", async ()=>{
    let test_found = await testController.get_test_by_id_without_correct(tests[0]._id);
    expect(test_found._id).toBeDefined();
    expect(test_found.questions[0].optional_answers[0].is_correct).toBeUndefined();
})

it("should get a test by id with the correct answers for questions" , async ()=>{
    let test_found = await testController.get_test_by_id_with_correct(tests[0]._id);
    expect(test_found._id).toBeDefined();
    expect(test_found.questions[0].optional_answers[0].is_correct).toBeDefined();
})

it("should get all test names", async ()=>{
    let test_names = await testController.get_all_test_names(topic._id);
    expect(test_names.length).toBe(tests.length);
    expect(test_names[0].name).toBe(tests[0].name);
})

it("should test active", async ()=>{
    await testController.set_test_active(tests[0]._id);
    let test_found = await testController.get_test_by_id_with_correct(tests[0]._id);
    expect(test_found.is_active).toBe(true);
})

const addQuestionsToDb = async() =>{
    let questions_to_add = defaultData.get_default_questions();
    for (let index = 0; index < questions_to_add.length; index++) {
        const question_to_add = questions_to_add[index];
        questions.push(await questionController.add_question(question_to_add));
    }
  }
  
  const addDefaultTopicAndOrganization = async () =>{
      const organization = await OrganizationModel.create({name:"organ1"});
      topic = await TopicModel.create({name:"topic1", organization_id:organization._id});
  }
