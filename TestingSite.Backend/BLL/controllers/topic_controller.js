const TopicModel = require('../../models/topic');

class TopicService{
    get_all_topics = async() =>{
        return await TopicModel.find({}).populate('organization_id');
    }
    get_topic_by_name = async(topic_name) =>{
        return await TopicModel.findOne({name: topic_name}).populate('organization_id');
    }
}

module.exports = new TopicService();