const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

const TestSchema = new mongoose.Schema({
	topic_id: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
		required: true,
	},
    language:{
        type: String,
        enum: [
            'Hebrew',
			'English',
        ],
        default: 'English',
        required:true,
    },
    name:{
        type:String,
        required: true,
    },
    instructions:{
        type:String,
    },
    is_answer_shown:{
        type: Boolean,
        required: true,
        default:false,
    },
    diploma_url:{
        type:String,
    },
    success_text:{
        type:String,
        default:"Success",
    },
    failed_text:{
        type:String,
        default:"Failed",
    },
    questions:{
        type: [{type: mongoose.Schema.Types.ObjectId, ref:'Question'}]
    },
    passing_grade:{
        type:Number,
        required: true,
        default:50,
    },
    tester_email:{
        type: String,
		trim: true,
		lowercase: true,
		required: true,
    },
    email_success_content:{
        type: String,
    },
    email_failed_conent:{
        type: String,
    }
}, { collection: 'tests' })

TestSchema.plugin(timestamps)

module.exports = exports = mongoose.model('Test', TestSchema)