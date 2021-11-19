const organizationModel = require('../../models/organization');

class OrganizationService {
  get_all_organizations = async () => {
    return await organizationModel.find({});
  };
}
module.exports = new OrganizationService();
