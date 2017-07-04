                // <Nav transparent="no" />
                // <li key={bug._id}>{bug.title}</li>
import React, { Component } from 'react'
import { APIManager } from '../../utils' 
import { Nav } from '../containers'
import actions from '../../actions'
import { connect } from 'react-redux'

class Track extends Component {
    constructor(){
    	super()
    	this.state = {
    		track: {
                name:''
    		},
            bug: {
                title:'',
                detail:'',
                response: ''
            }
    	}
    }

	componentDidMount(){
        var _this = this  //var this = _this
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
            _this.fetchPosts()
        })
	}

    fetchPosts(){
        console.log('fetchPosts: ')
        console.log(JSON.stringify(this.props.track._id))
        if (this.props.track._id == null){
            return
        }

        var id = this.props.track._id
        APIManager.get('/api/bug?track='+id, null, (err, response) => {
            if (err){
                const msg = err.message || err
                alert(msg)
                return
            }

            console.log(JSON.stringify(response.results))
            this.props.bugsReceived(response.results)

        })
    }

    updateBug(event){
        event.preventDefault()
        console.log(event.target.id+' == '+event.target.value)
        var updatedBug = Object.assign({}, this.state.bug)
        updatedBug[event.target.id] = event.target.value
        var bug = updatedBug
        this.setState({
            bug: bug
        })
        console.log('updatedBug: '+JSON.stringify(this.state.bug))
    }

    submitBug(event){
        event.preventDefault()
        if (this.props.currentUser == null) {
            alert('Please log in to record new bug')
            return
        }

        var bug = Object.assign({}, this.state.bug)   // var bug = this.state.bug
        console.log(JSON.stringify(this.props.track._id))
        bug['track'] = this.props.track._id
        bug['profile'] = this.props.currentUser.id

        APIManager.post('/api/bug', bug, (err, response) => {
            if (err) {
                const msg = err.message || err
                alert(msg)
                return
            }
            this.props.bugCreated(response.result)
            console.log('submitBug: '+JSON.stringify(response.result))

        })
        

    }

	render(){
        var bugList = this.props.bugs.map((bug, i) => {
            return (
                <a key={i} href="#" className="list-group-item">
                        <h4 className="list-group-item-heading">{bug.title}</h4>
                        <p className="list-group-item-text">{bug.detail}</p>
                </a> 
            )
        })

		return(
            <div>

                <section id="content">
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="postcontent nobottommargin clearfix">

                                <h4>{this.props.track.name}</h4>
                                <input onChange={this.updateBug.bind(this)} placeholder="Bug Title" id="title" className="form-control" type="text" /><br />
                                <textarea onChange={this.updateBug.bind(this)} placeholder="Bug Detail" id="detail" className="form-control"></textarea><br /> 
                                <textarea onChange={this.updateBug.bind(this)} placeholder="Response" id="response" className="form-control"></textarea><br /> 
                                <button onClick={this.submitBug.bind(this)} className="btn btn-success">Record Bug</button><br />
                                <hr style={{borderTop: '1px solid red #444'}} />
                                {bugList}
 
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
        track: (tracksArray.length == 0) ? {name:''} : tracksArray[0],
        bugs: state.bug.list,
        currentUser: state.account.currentUser
    }
}

const dispatchToProps = (dispatch) => {
    return {
        tracksReceived: (tracks) => dispatch(actions.tracksReceived(tracks)),
        bugCreated: (bug) => dispatch(actions.bugCreated(bug)),
        bugsReceived: (bugs) => dispatch(actions.bugsReceived(bugs)),
        // currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
        // currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))    
    }
}

export default connect(stateToProps, dispatchToProps)(Track)