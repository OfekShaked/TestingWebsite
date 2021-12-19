const DBManager = require("./db_manager");
const answerController = require("../BLL/controllers/answer_controller");
const defaultData = require('./default_data');
const dbman = new DBManager();

let answers = defaultData.get_default_answers();

afterAll(async () => {
    await dbman.cleanup();
    await dbman.stop();
  });
beforeAll(async () => await dbman.start());

it("can be added successfully", async () => {
  let answer_to_add = answers[0];
  let answer_added = await answerController.update_or_add_answer(answer_to_add);
  expect(answer_added._id).toBeDefined();
  expect(answer_added.text).toBe(answer_to_add.text);
});

it("can be updated successfully",async () =>{
  let answer_to_add = answers[0];
  let answer_added = await answerController.update_or_add_answer(answer_to_add);
  let answer_to_update = {_id:answer_added._id, text: "This answer is updated", is_correct: true }
  let answer_updated = await answerController.update_or_add_answer(answer_to_update);
  expect(answer_updated._id).toBeDefined();
  expect(answer_updated.text).toBe(answer_to_update.text);

})

