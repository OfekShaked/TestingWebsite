const DBManager = require("./db_manager");
const questionController = require("../BLL/controllers/question_controller");
const TopicModel = require('../models/topic');
const OrganizationModel = require('../models/organization');
const defaultData = require('./default_data');
const dbman = new DBManager();
let topic;
afterAll(async () => {
    await dbman.cleanup();
    await dbman.stop();
  });
beforeAll(async () => {
    await dbman.start();
    await addDefaultTopicAndOrganization();
});

it("can be added successfully", async () => {
  let question_added = await addQuestionToDb();
  expect(question_added._id).toBeDefined();
  expect(defaultData.get_default_questions()[0].text).toBe(question_added.text);
});

it("can be updated successfully",async () =>{
    let question_added = await addQuestionToDb();
    expect(question_added.tags.length).toBe(3);
    let question_to_update = defaultData.get_default_questions()[0];
    question_to_update.tags.push("four");
    question_to_update._id = question_added._id;
    let question_updated = await questionController.update_question(question_to_update);
    expect(question_updated._id).toBeDefined();
    expect(question_updated.tags.length).toBe(4);
});

it("can increment test count", async ()=>{
    let question_added = await addQuestionToDb();
    expect(question_added.tags.length).toBe(3);
    let question_updated = await questionController.increment_test_count(question_added._id);
    expect(question_updated.number_of_tests).toBe(1);
})

it("can decrement test count", async ()=>{
    let question_added = await addQuestionToDb();
    expect(question_added.tags.length).toBe(3);
    let question_updated = await questionController.increment_test_count(question_added._id);
    question_updated = await questionController.increment_test_count(question_added._id);
    expect(question_updated.number_of_tests).toBe(2);
    question_updated = await questionController.decrement_test_count(question_added._id);
    expect(question_updated.number_of_tests).toBe(1);

})

const addQuestionToDb = async() =>{
  let question_to_add = defaultData.get_default_questions()[0];
  let question_added = await questionController.add_question(question_to_add);
  return question_added;
}

const addDefaultTopicAndOrganization = async () =>{
    const organization = await OrganizationModel.create({name:"organ1"});
    topic = await TopicModel.create({name:"topic1", organization_id:organization._id});
}