var Bug = require('../models/Bug')
var Promise = require('bluebird')

module.exports = {

	find: function(params, isRaw){                  //get: {
		return new Promise(function(resolve, reject){         //Promise = new Promise {
		    Bug.find(params, function(err, bugs){  //bug.find(function(err, bugs){
		    	if (err){
		    		reject(err)
		    		return
		    	}

                if (isRaw){
                	resolve(bugs)
                	return
                }

                var summaries = []
                // forEach bug in bugs
                //     summaries.push(bug)
                bugs.forEach(function(bug){
                	summaries.push(bug.summary())
                })
		    	
		    	resolve(summaries)
		    	// resolve(bugs)
		    })
		})
	},

	create: function(params){
		return new Promise(function(resolve, reject){
			Bug.create(params, function(err, bug){
				if (err){
					reject(err)
					return
				} 
				resolve(bug)    //return(bug.summary())
			})
		})
	},

	findById: function(id, isRaw){
		return new Promise(function(resolve, reject){
			Bug.findById(id, function(err, bug){
				if (err) {
					reject(err)
					return
				}

				if (isRaw){
					resolve(bug)
					return
				}

				resolve(bug.summary())
				
			})
		})
	} 
}
