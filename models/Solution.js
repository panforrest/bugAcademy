var mongoose = require('mongoose')

var SolutionSchema = new mongoose.Schema({
	profile:{type:String},
	bug:{type:String},
	text:{type:String}
})

SolutionSchema.methods.summary = function(){
	var summary = {
        id:this._id,
        profile:this.profile,
        bug:this.bug,
        text:this.text
	}

	return summary
}

module.exports = mongoose.model('SolutionSchema', SolutionSchema)