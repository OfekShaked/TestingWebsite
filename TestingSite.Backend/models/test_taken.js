const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

const TestTakenSchema = new mongoose.Schema({
	test_id: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        index: true,
        required: true,
	},
    test_questions:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref:'TestQuestionAnswer'}]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User',
        index: true,
        required: true,
    },
    grade:{
        type:Number
    }

}, { collection: 'tests_taken' })

TestTakenSchema.plugin(timestamps)

module.exports = exports = mongoose.model('TestTaken', TestTakenSchema)