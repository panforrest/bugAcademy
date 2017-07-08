var Solution = require('../models/Solution.js') 
var Promise = require('bluebird') 

module.exports = {

	find: function(params, isRaw){  //find: function(params, err){
		return new Promise(function(resolve, reject){  //return new Promise(params, function(resolve, reject){
			Solution.find(params, function(err, solutions){
				if (err){
					reject(err)
					return
				}

				resolve(solutions)

			})
		})
	},

	create: function(params){
		return new Promise(function(resolve, reject){
			Solution.create(params, function(err, solution){
				if (err) {
					reject(err)
					return
				}

                resolve(solution)

			})
		})
	},

	findById: function(id){
		return new Promise(function(resolve, reject){
            Solution.findById(id, function(err, solution){
            	if (err) {
            		reject(err)
            		return
            	}

                resolve(solution)

            })
		})
	}
}

