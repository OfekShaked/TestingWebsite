const UserModel = require("../../models/user");
const logger = require("../../logger");

class UserService {
  /**
   * add new user
   * @param {*} user
   * @returns new user added
   */
  add_user = async (user) => {
    const model = new UserModel(user);
    const validatedModel = model.validateSync();
    if (!!validatedModel) return null;
    try {
      const user_added = await UserModel.create(model);
      return user_added;
    } catch (err) {
      logger.error(err);
    }
  };

  /**
   * get all users grouped by email
   */
  get_all_users = async() =>{
    try{
      return await UserModel.aggregate([
        {
          $group:{
            _id: '$email',
            last_updated:{$last:'$createdAt'},
            name:{$last:'$name'},
          },
        }
      ])
    }catch(err){
      logger.error(err);
    }
  }
}

module.exports = new UserService();
