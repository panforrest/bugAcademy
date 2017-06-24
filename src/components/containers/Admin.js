                    // <h2>User is not logged in. </h2>
                    // export default connect(stateToProps, dispatchToProps)(Admin)
import React, { Component } from 'react'
import actions from '../../actions'
import { connect } from 'react-redux'
import { Signup } from '../presentation'
import { APIManager } from '../../utils' 

class Admin extends Component {

    constructor(){
        super()
        this.state = {
            bug: {
                title: '',
                detail: '',
                response: ''
            },
            track: {
                name: ''
            }
        }
    }

    componentDidMount(){
        // console.log('componentDidMount: ')
        APIManager.get('/account/currentuser', null, (err, response) => {
            if (err) {
                const msg = err.message || err
                alert(msg)
                return
            }
            // console.log('Admin.js: ', JSON.stringify(response.profile))
            this.props.currentUserReceived(response.profile)
        })
    }

    register(visitor){
        APIManager.post('/account/register', visitor, (err, response) => {
            if (err) {
             const msg = err.message || err
                alert(msg)
             return
            }

            console.log('register: '+JSON.stringify(response))
            this.props.profileCreated(response.profile)
        })
    }

    login(credentials){
        APIManager.post('/account/login', credentials, (err, response) => {
            if (err) {
                const msg = err.message || err
                // console.log(msg)
                alert(msg)
                return
            }

            console.log(JSON.stringify(response))
            this.props.currentUserReceived(response.profile)
        })
    }

    updateBug(event){
        event.preventDefault()
        // console.log(event.target.id+" == "+event.target.value)
        let updatedBug = Object.assign({}, this.state.bug)
        updatedBug[event.target.id] = event.target.value  //updatedBug['event.target.id'] = event.target.value
        this.setState({
            bug: updatedBug 
        }) 
        console.log('updatedBug: '+JSON.stringify(this.state.bug))
    }

    submitBug(event){
        event.preventDefault()
        var bug = this.state.bug
        bug['profile'] = this.props.currentUser.id

        APIManager.post('/api/bug', bug, (err, response) => {
            if (err){
                const msg = err.message || err
                // console.log(msg)
                alert(JSON.stringify(msg))
                return
            }
            console.log('submit: '+JSON.stringify(response.result))
            var result = response.result
            this.props.bugCreated(bug)
        })
    }

    updateTrack(event){
        event.preventDefault()
        console.log('updateTrack: '+event.target.id+' == '+event.target.value)
        var updatedTrack = Object.assign({}, this.state.track)
        updatedTrack[event.target.id] = event.target.value
        this.setState({
            track: updatedTrack
        })
    }

    submitTrack(event){
        event.preventDefault()
        console.log('to submitTrack: '+JSON.stringify(this.state.track))
        APIManager.post('/api/track', this.state.track, (err, response) => {
            if (err){
                const msg = err.message || err
                alert(msg)
                return
            }

            console.log('track submitted: '+JSON.stringify(response.result))
            this.props.trackCreated(response.result)
        })
    }

    render(){
    	return(
    		<div>
                {(this.props.currentUser == null) ? <Signup onRegister={this.register.bind(this)} onLogin={this.login.bind(this)}/> : 
                  <div>    
                    <h2>Welcome, {this.props.currentUser.email}</h2> 

                        <h3>Create Bug</h3>
                        <input onChange={this.updateBug.bind(this)} type="text" id="title" placeholder="Title" /><br />
                        <textarea onChange={this.updateBug.bind(this)} type="text" id="detail" placeholder="Detail" /><br />
                        <textarea onChange={this.updateBug.bind(this)} type="text" id="response" placeholder="Response" /><br />
                        <input onClick={this.submitBug.bind(this)} type="submit" value="Submit" />

                        <h3>Create Track</h3>
                        <input onChange={this.updateTrack.bind(this)} type="text" id="name" placeholder="Track Name" /><br />
                        <input onClick={this.submitTrack.bind(this)} type="submit" value="Submit" />

                  </div>

                }   
    		</div>
    	)
    }
}

const stateToProps = (state) => {
    return {
        profiles: state.profile.list,
        currentUser: state.account.currentUser
    }
}

const dispatchToProps = (dispatch) => {
    return {
        profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
        //profilesReceived: (profiles) => disptach(actions.profilesReceived(profiles)),
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile)),
        bugCreated: (bug) => dispatch(actions.bugCreated(bug)),
        trackCreated: (track) => dispatch(actions.trackCreated(track))

    }
}

export default connect(stateToProps, dispatchToProps)(Admin)