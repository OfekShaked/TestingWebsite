const organizationModel = require('../../models/organization');
const logger = require('../../logger');

class OrganizationService {
  get_all_organizations = async () => {
    try{
    return await organizationModel.find({});
    }catch(err){
      logger.error(err);
    }
  };
}
module.exports = new OrganizationService();
