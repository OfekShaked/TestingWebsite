const DBManager = require("./db_manager");
const organizationController = require("../BLL/controllers/organization_controller");
const OrganizationModel = require('../models/organization');

const dbman = new DBManager();

afterAll(async () => {
    await dbman.cleanup();
    await dbman.stop();
  });
beforeAll(async () => {
  await dbman.start()
  await OrganizationModel.create({name:"organ1"});
  await OrganizationModel.create({name:"organ2"});
  await OrganizationModel.create({name:"organ3"});
});

it("can get all organizations successfully", async () => {
  let organizations = await organizationController.get_all_organizations();
  expect(organizations.length).toBe(3);
  expect(organizations[0]._id).toBeDefined();
});

