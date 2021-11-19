const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

const QuestionSchema = new mongoose.Schema({
	type:{
        type: String,
        enum: [
            'SingleChoiceQuestion',
			'MultipleChoiceQuestion',
        ],
        default: 'SingleChoiceQuestion',
        required:true,
    },
	text:{
        type: String,
        required:true,
    },
    inner_text:{
        type:String,
    },
    orientation:{
        type: String,
        enum: [
            'Horizontal',
            'Vertical'
        ],
        default: 'Vertical',
        required:true,
    },
    optional_answers:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref:'Answer'}]
    },
    tags: { 
        type: [String], 
        index: true 
    },
    topic_ids:{
        type:[{type: mongoose.Schema.Types.ObjectId,ref:'Topic'}]
    },
    is_active:{
        type:Boolean,
        default:false,
    },
    updated_at: { 
        type: Date 
    },
}, { collection: 'questions' })

QuestionSchema.plugin(timestamps)

module.exports = exports = mongoose.model('Question', QuestionSchema)