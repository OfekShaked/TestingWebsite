const DBManager = require("./db_manager");
const organizationController = require("../BLL/controllers/organization_controller");
const OrganizationModel = require('../models/organization');
const defaultData = require('./default_data'); 

const dbman = new DBManager();

afterAll(async () => {
    await dbman.cleanup();
    await dbman.stop();
  });
beforeAll(async () => {
  await dbman.start()
  let organizations = defaultData.get_default_organizations();
  await OrganizationModel.create(organizations[0]);
  await OrganizationModel.create(organizations[1]);
  await OrganizationModel.create(organizations[2]);
});

it("can get all organizations successfully", async () => {
  let organizations = await organizationController.get_all_organizations();
  expect(organizations.length).toBe(3);
  expect(organizations[0]._id).toBeDefined();
});

