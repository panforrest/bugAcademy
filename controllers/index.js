var bugController = require('../controllers/BugController')
var profileController = require('../controllers/ProfileController')
var trackController = require('../controllers/TrackController')
var solutionController = require('../controllers/SolutionController')

module.exports = {

	bug: bugController,
	profile: profileController,
	track: trackController,
	solution: solutionController

}