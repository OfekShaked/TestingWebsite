const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

const TestTakenQuestionSchema = new mongoose.Schema({
	test_taken_id: {
		type: mongoose.Schema.Types.ObjectId,
        ref:'TestTaken',
		required: true,
        index:true,
	},
    question_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Question',
		required: true,
        index:true,
    },
    answers_chosen:{
        type: [{type:mongoose.Schema.Types.ObjectId, ref:'Answer'}],
    }
}, { collection: 'test_taken_questions' })

TestTakenQuestionSchema.plugin(timestamps)

module.exports = exports = mongoose.model('TestTakenQuestion', TestTakenQuestionSchema)