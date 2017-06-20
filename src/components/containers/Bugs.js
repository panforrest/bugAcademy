// let bugs = this.props.bugs.map(bug, i) => () {
import React, { Component } from 'react'
import { APIManager } from '../../utils'

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

			console.log(JSON.stringify(response.results))
			var results = response.results
			this.setState({
				bugs: results
			})
		})
	}

	render(){
        const bugs = this.state.bugs.map((bug, i) => {
        	return(
                <li key={bug.id}>{bug.title}</li>
        	)
        })

		return(
			<div>
                This is Bugs List:
               
                    {bugs}
                
            </div>    
		)
	}
}

export default Bugs