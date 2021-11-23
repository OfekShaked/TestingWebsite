const QuestionModel = require('../../models/question');
const topic_controller = require('./topic_controller');
const answer_controller = require('./answer_controller');

class QuestionService {
    /**
     * 
     * @returns Array array of all questions
     */
  get_all_questions = async () => {
    return await QuestionModel.find({}).populate('optional_answers').populate('topic_ids');
  };
  /**
   * 
   * @param {*} question 
   * @returns new question if success, null if failed
   */
  add_question = async (question) =>{
      const model = await populate_question(question);
      const validatedModel = model.validateSync();
      if(!!validatedModel) return null;
      const question_added = await QuestionModel.create(model);
      await QuestionModel.populate(question_added,'optional_answers');
      await QuestionModel.populate(question_added,'topic_ids');
      return question_added;
  }
  /**
   * Update existing question
   * @param {*} question 
   * @returns Updated question if success, null if failed
   */
  update_question = async (question) =>{
      const question_id = question._id;
      delete question._id;
      const model = await populate_question(question);
      const validatedModel = model.validateSync();
      var modelCopy = model.toObject(); //turn object back
      delete modelCopy._id;
      if(!!validatedModel) return null;
      return await QuestionModel.findByIdAndUpdate(question_id,modelCopy,{
          new: true,
      }).populate('optional_answers').populate('topic_ids');
  }
  increment_test_count = async(question_id) =>{
      return await QuestionModel.findByIdAndUpdate(question_id,{$inc: {number_of_tests:1}},{
        new: true,
    }).populate('optional_answers').populate('topic_ids');
  }
  decrement_test_count = async(question_id) =>{
    return await QuestionModel.findByIdAndUpdate(question_id,{$inc: {number_of_tests: -1}},{
      new: true,
  }).populate('optional_answers').populate('topic_ids');
}
}
/**
 * 
 * @param {*} answers 
 * @returns array of answer objects
 */
const get_answers = async(answers) =>{
    let answer_array = [];
    for (const answer of answers) {
        let answer_added = await answer_controller.update_or_add_answer(answer);
        if(answer_added == null) return [];
        answer_array.push(answer_added._id);
    }
    return answer_array;
}

const populate_question = async (question) =>{
    let answer_array = await get_answers(question.optional_answers);
    if(answer_array.length<1||question.topic_ids.length<1) return null;
    question.optional_answers = answer_array;
    return new QuestionModel(question);
}
module.exports = new QuestionService();
