const QuestionModel = require('../../models/question');
const topic_controller = require('./topic_controller');
const answer_controller = require('./answer_controller');

class QuestionService {
    /**
     * 
     * @returns Array array of all questions
     */
  get_all_questions = async () => {
    return await QuestionModel.find({});
  };
  /**
   * 
   * @param {*} question 
   * @returns new question if success, null if failed
   */
  add_question = async (question) =>{
      const model = populate_question(question);
      const validatedModel = model.validateSync();
      if(!!validatedModel) return null;
      return await QuestionModel.create(model);
  }
  /**
   * Update existing question
   * @param {*} question 
   * @returns Updated question if success, null if failed
   */
  update_question = async (question) =>{
      const model = populate_question(question);
      const validatedModel = model.validateSync();
      if(!!validatedModel) return null;
      return await QuestionModel.findByIdAndUpdate(question._id,model,{
          overwrite: true,
          new: true,
      })
  }
}
/**
 * 
 * @param {*} answers 
 * @returns array of answer objects
 */
const get_answers = async(answers) =>{
    let answer_array = [];
    answers.forEach(answer => {
        let answer_added = await answer_controller.update_or_add_answer(answer);
        if(answer_added == null) return [];
        answer_array.push(answer_added);
    });
    return answer_array;
}

const get_topics = async(topics) =>{
    let topic_array =[];
    topics.forEach(topic => {
        let topic_added = topic_controller.get_topic_by_name(topic);
        if(topic_added==null) return null;
        topic_array.push(topic_added);
    });
    return topic_array;
}

const populate_question = (question) =>{
    let answer_array = await get_answers(question.answers);
    //let topic_array = await get_topics(question.topics);
    if(answer_array.length<1||question.topics.length<1) return null;
    //question.topics = topic_array;
    question.answers = answer_array;
    return new QuestionModel(question);
}
module.exports = new QuestionService();
