var Track = require('../models/Track')
var Promise = require('bluebird')

module.exports = {

    find: function(params, isRaw){
        return new Promise(function(resolve, reject){
            Track.find(params, function(err, response){
            	if (err){
            		reject(err)
            		return
            	}

            	resolve(response)

            })
        }) 
    },

    // findById:

    create: function(params) {
    	return new Promise(function(resolve, reject){
    		Track.create(params, function(err, response){
    			if (err) {
    				reject(err)
    				return
    			}

    			resolve(response)
    		})
    	})
    }


}