const AnswerModel = require('../../models/answer');

class AnswerService {
    /**
     * finds an existing answer and updates it, or create a new one
     * @param {*} answer 
     * @returns created or updated answer
     */
  update_or_add_answer = async (answer) => {
    if(answer._id!==undefined)
        return await AnswerModel.findByIdAndUpdate(answer.id,answer,{
            overwrite: true,
            new: true,
        });
    else{
        return await AnswerModel.create(answer);
    }
  };
  
}
module.exports = new AnswerService();
