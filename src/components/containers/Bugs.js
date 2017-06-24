// let bugs = this.props.bugs.map(bug, i) => () {
	                // <li key={bug._id}>{bug.title}</li>
import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Bugs extends Component {

	constructor(){
		super()
		this.state = {
			bugs: []
		}
	}

	componentDidMount(){
		// console.log('componentDidMount: ')
		APIManager.get('/api/bug', null, (err, response) => {
			if (err) {
				const msg = err.message || err
				alert(msg)
				return
			}

			// console.log(JSON.stringify(response.results))
			var results = response.results
			// this.setState({
			// 	bugs: results
			// })
			this.props.bugsReceived(results)
		})
	}

	render(){
        const bugs = this.props.bugs.map((bug, i) => {
        	return(
                <li key={i}>{bug.title}</li>
        	)
        })

		return(
			<div>
                This is Bugs List:
                <ol>
                    {bugs}
                </ol>
            </div>    
		)
	}
}

const stateToProps = (state) => {
	return {
        bugs: state.bug.list
	}
}

const dispatchToProps = (dispatch) => {
	return {
        bugsReceived: (bugs) => dispatch(actions.bugsReceived(bugs))

	}
}

export default connect(stateToProps, dispatchToProps)(Bugs)