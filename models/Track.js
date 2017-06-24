var mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({
	name:{type:String, default:''},
	slug:{type:String, default:''},
	timestamp:{type:String, default: Date.now}
})

TrackSchema.methods.summary = function(){
	var summary = {
		id:this._id,
		name:this.name,
        slug:this.slug,
        timestamp:this.timestamp
	}

	return summary
}

module.exports = mongoose.model('TrackSchema', TrackSchema)

