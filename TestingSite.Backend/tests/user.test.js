const DBManager = require("./db_manager");
const userController = require('../BLL/controllers/user_controller');
const defaultData = require('./default_data');
const dbman = new DBManager();

let users=[];

afterAll(async () => {
    await dbman.cleanup();
    await dbman.stop();
  });
beforeAll(async () => {
  await dbman.start()
});

it("should add a new user successfully" , async ()=>{
    let user_added = await userController.add_user(defaultData.get_default_users()[0]);
    if(user_added!=null) users.push(user_added);
    expect(user_added._id).toBeDefined();
    expect(user_added.email).toBe(defaultData.get_default_users()[0].email);
})

it("should get all users grouped by email", async()=>{
    await userController.add_user(defaultData.get_default_users()[1])
    await userController.add_user(defaultData.get_default_users()[2])
    let users_found = await userController.get_all_users();
    expect(users_found.length).toBe(defaultData.get_default_users().length-1);
})

