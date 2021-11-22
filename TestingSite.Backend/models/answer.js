const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

const AnswerSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
        default:"",
	},
    is_correct:{
        type: Boolean,
        required: true,
        default:false,
    },
}, { collection: 'answers' })

AnswerSchema.plugin(timestamps)

module.exports = exports = mongoose.model('Answer', AnswerSchema)