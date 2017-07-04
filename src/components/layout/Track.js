                // <Nav transparent="no" />
import React, { Component } from 'react'
import {APIManager} from '../../utils' 
import { Nav } from '../containers'
import actions from '../../actions'
import { connect } from 'react-redux'

class Track extends Component {
    constructor(){
    	super()
    	this.state = {
    		track: {
                name:''
    		}
    	}
    }

	componentDidMount(){
		// console.log('Track.js layout componentDidMount: ')
        // APIManager.get('/api/track/'+this.props.slug, null, (err, response) => {
        APIManager.get('/api/track?slug='+this.props.slug, null, (err, response) => {	
        	if (err){
        		const msg = err.message || err
        		alert(msg)
        		return
        	}
        	console.log(JSON.stringify(response.results))  //(response.result))
        	var tracks = response.results
        	// this.setState({
        	// 	track: track
        	// })
            this.props.tracksReceived(tracks)
        })
	}

	render(){
		return(
            <div>


                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="postcontent nobottommargin clearfix">

                                <h4>{this.props.track.name}</h4>
                                <input placeholder="Post Title" className="form-control" type="text" /><br />
                                <textarea placeholder="Post Text" className="form-control"></textarea><br /> 
                                <button className="btn btn-success">Add Bug</button><br />
                                <hr style={{borderTop: '1px solid red #444'}} />

                                <div className="list-group">
                                    <a href="#" className="list-group-item">
                                        <h4 className="list-group-item-heading">List group item heading</h4>
                                        <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.</p>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <h4 className="list-group-item-heading">List group item heading</h4>
                                        <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.</p>
                                    </a>
                                    <a href="#" className="list-group-item">
                                        <h4 className="list-group-item-heading">List group item heading</h4>
                                        <p className="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, sit, reiciendis expedita voluptate fuga perferendis soluta doloribus quasi quia odio.</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
		)
	}
}

const stateToProps = (state) => {
    // var tracksArray = state.tracks.list
    var tracksArray = state.track.list

    return {
        track: (tracksArray.length == 0) ? {name:''} : tracksArray[0] 
    }
}

const dispatchToProps = (dispatch) => {
    return {
        tracksReceived: (tracks) => dispatch(actions.tracksReceived(tracks))
    }
}

export default connect(stateToProps, dispatchToProps)(Track)