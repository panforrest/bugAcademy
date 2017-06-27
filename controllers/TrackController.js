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
        // var parts = params.name.split(' ')

        // var slug = ''
        // for (var i=0; i<parts.length; i++){
        //     var word = parts[i]
        //     slug += word
        //     if (i != parts.length-1)
        //         slug += '-'
        // }

        // slug = slug.repalce('?', '-')
        // params['slug'] = slug
        // console.log(JSON.stringify(params))
    	return new Promise(function(resolve, reject){
            // var parts = params.name.split(' ')

            // var slug = ''
            // for (var i=0; i<parts.length; i++){
            //     var word = parts[i]
            //     slug += word
            //     if (i != parts.length-1)
            //         slug += '-'
            // }

            // slug = slug.repalce('?', '-')
            // params['slug'] = slug
            // console.log(JSON.stringify(params))

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