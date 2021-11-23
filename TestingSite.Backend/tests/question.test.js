const DBManager = require("./db_manager");
const answerController = require("../BLL/controllers/answer_controller");
const questionController = require("../BLL/controllers/question_controller");
const TopicModel = require('../models/topic');
const OrganizationModel = require('../models/organization');
const dbman = new DBManager();
let answers=[];
let topic;
afterAll(async () => {
    await dbman.cleanup();
    await dbman.stop();
  });
beforeAll(async () => {
    await dbman.start();
    await addDefaultTopicAndOrganization();
    addDefaultTestAnswers();
});

it("can be added successfully", async () => {
  let question_added = await addQuestionToDb();
  expect(question_added._id).toBeDefined();
  expect(getDefaultQuestion().text).toBe(question_added.text);
});

it("can be updated successfully",async () =>{
    let question_added = await addQuestionToDb();
    expect(question_added.tags.length).toBe(3);
    let question_to_update = getDefaultQuestion();
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
  let question_to_add = getDefaultQuestion();
  let question_added = await questionController.add_question(question_to_add);
  return question_added;
}

const addDefaultTestAnswers = () =>{
    answers.push({ text: "answer 1", is_correct: true });
    answers.push({ text: "answer 2", is_correct: false });
    answers.push({ text: "answer 3", is_correct: false });
    answers.push({ text: "answer 4", is_correct: false });
}
const addDefaultTopicAndOrganization = async () =>{
    const organization = await OrganizationModel.create({name:"organ1"});
    topic = await TopicModel.create({name:"topic1", organization_id:organization._id});
}
const getDefaultQuestion = () =>{
    return {
        type: "SingleChoiceQuestion",
        text: "First question",
        inner_text: "this is inside",
        orientation: "Horizontal",
        optional_answers:answers,
        tags:["one","two","three"],
        topic_ids:[topic._id],
        };
}