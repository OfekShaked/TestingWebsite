const TopicModel = require('../../models/topic');

class TopicService{
    get_all_topics = async() =>{
        return await TopicModel.find({});
    }
    get_topic_by_name = async(topic_name) =>{
        return await TopicModel.find({name: topic_name});
    }
}

module.exports = new TopicService();