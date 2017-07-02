// <li key={i}>{this.props.track.name}</li>
                // <li key={track._id}><a href={'/track/'+track.slug}>{track.name}</a></li>
import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'
import TrackPreview from './TrackPreview'
import Admin from './Admin'

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
        var trackList = this.props.tracks.map((track, i) => {
        	return <TrackPreview key={track._id} track={track} />
        })

    	return(
    		<div className="container clearifx">
                <div className="col_three_fifth bothsidebar nobottommargin">
                    <div className="fancy-title title-border">
                        <h3>Tracks</h3>
                    </div>

                    <div id="posts" className="events small-thumbs">
                        {trackList}
                    </div>    
                </div>
                <Admin />
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