const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

const OrganizationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
}, { collection: 'organizations' })

OrganizationSchema.plugin(timestamps)

module.exports = exports = mongoose.model('Organization', OrganizationSchema)