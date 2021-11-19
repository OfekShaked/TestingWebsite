const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

const TopicSchema = new mongoose.Schema({
	organization_id: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        index: true,
        required: true,
	},
	name: {
		type: String,
		required: true,
	},
}, { collection: 'topics' })

TopicSchema.plugin(timestamps)

module.exports = exports = mongoose.model('Topic', TopicSchema)