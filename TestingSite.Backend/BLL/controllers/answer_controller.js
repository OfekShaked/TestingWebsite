const AnswerModel = require('../../models/answer');

class AnswerService {
    /**
     * finds an existing answer and updates it, or create a new one
     * @param {*} answer 
     * @returns created or updated answer
     */
  update_or_add_answer = async (answer) => {
    if(answer._id!=null)
    {
        let answer_id=answer._id
        delete answer._id;
        //const update ={text:answer.text,is_correct:answer.is_correct};
        return await AnswerModel.findByIdAndUpdate(answer_id,answer,{
            new: true,
        });
    }
    else{
        return await AnswerModel.create(answer);
    }
  };
  
}
module.exports = new AnswerService();
