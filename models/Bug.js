var mongoose = require('mongoose')

var BugSchema = new mongoose.Schema({
    profile: {type:String, default:''},
    track: {type:String, default:''},
    title: {type:String, defualt:''},
    detail: {type:String, default:''},
    response: {type:String, default:''},
    timestamp: {type:String, default:Date.now}
})

BugSchema.methods.summary = function(){
	var summary = {
        id: this._id,
        profile: this.profile,
        track: this.track,
        title: this.title,
        detail: this.detail,
        response: this.response,
        timestamp: this.timestamp
	}

	return summary
}

module.exports = mongoose.model('BugSchema', BugSchema)



