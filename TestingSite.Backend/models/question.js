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
        default:'',
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
        type: Date,
        default: Date.now()
    },
    number_of_tests:{
        type:Number,
        default:0,
        required:true,
        min:0,
    }
}, { collection: 'questions' })

QuestionSchema.plugin(timestamps)

QuestionSchema.pre('findOneAndUpdate',function(next){
    let update = {...this.getUpdate()};
    update.updated_at = Date.now();
    next();
});

module.exports = exports = mongoose.model('Question', QuestionSchema)