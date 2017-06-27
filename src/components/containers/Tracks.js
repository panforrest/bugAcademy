// <li key={i}>{this.props.track.name}</li>
import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'
// import { Admin } from '../containers'

class Tracks extends Component {
	constructor(context, props){
		super(context, props)
		this.state = {
			tracks: []
		}
	}

	componentDidMount(){
		// console.log('Tracks container componentDidMount: ')
		APIManager.get('/api/track', null, (err, response) => {
			if (err) {
				const msg = err.message || err
				alert(msg)
				return
			}

			// console.log('Tracks container componentDidMount: '+JSON.stringify(response.results))
			var results = response.results
			// this.setState({
			// 	tracks: results
			// })
			this.props.tracksReceived(response.results)
		})
	}

	render(){
        var list = this.props.tracks.map((track, i) => {
        	return (
                <li key={track._id}><a href={'/track/'+track.slug}>{track.name}</a></li>
        	)
        })

		return(
			<div>
			    <h2>Track List</h2>
			    
			    <ol>
			        {list}
			    </ol>    
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
        tracks: state.track.list
	}
}

const dispatchToProps = (dispatch) => {
	return {
        tracksReceived: (tracks) => dispatch(actions.tracksReceived(tracks))
	}
}

export default connect(stateToProps, dispatchToProps)(Tracks)