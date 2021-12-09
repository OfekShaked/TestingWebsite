const UserModel = require("../../models/user");
const logger = require("../../logger");

class UserService {
  /**
   * add new user
   * @param {*} user
   * @returns
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
}

module.exports = new UserService();
