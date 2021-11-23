const DBManager = require("./db_manager");
const OrganizationModel = require('../models/organization');
const TopicModel = require('../models/topic');
const topicController = require('../BLL/controllers/topic_controller');

const dbman = new DBManager();
let topic1;
afterAll(async () => {
    await dbman.cleanup();
    await dbman.stop();
  });
beforeAll(async () => {
  await dbman.start()
  const organization = await OrganizationModel.create({name:"organ1"});
  topic1 = await TopicModel.create({name:"topic1", organization_id:organization._id});
  await TopicModel.create({name:"topic2", organization_id:organization._id});
});

it("can get all topics successfully", async () => {
  let topics = await topicController.get_all_topics();
  expect(topics.length).toBe(2);
  expect(topics[0]._id).toBeDefined();
  expect(topics[0].organization_id.name).toBe('organ1');
});

it("can get topic by name", async()=>{
    let topic = await topicController.get_topic_by_name('topic1');
    expect(topic).toBeDefined();
    expect(topic._id).toStrictEqual(topic1._id);
})

