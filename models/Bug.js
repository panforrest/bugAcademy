var mongoose = require('mongoose')

var BugSchema = new mongoose.Schema({
    title: {type:String, defualt:''},
    description: {type:String, default:''},
    solution: {type:String, default:''},
    timestamp: {type:String, default:Date.now}
})

BugSchema.methods.summary = function(){
	var summary = {
        id: this._id,
        title: this.title,
        description: this.description,
        solution: this.solution,
        timestamp: this.timestamp
	}

	return summary
}

module.exports = mongoose.model('BugSchema', BugSchema)



