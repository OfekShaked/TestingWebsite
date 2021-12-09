const TopicModel = require("../../models/topic");
const logger = require("../../logger");

class TopicService {
  get_all_topics = async () => {
    try {
      return await TopicModel.find({}).populate("organization_id");
    } catch (err) {
      logger.error(err);
    }
  };
  get_topic_by_name = async (topic_name) => {
    try {
      return await TopicModel.findOne({ name: topic_name }).populate(
        "organization_id"
      );
    } catch (err) {
      logger.error(err);
    }
  };
}

module.exports = new TopicService();
