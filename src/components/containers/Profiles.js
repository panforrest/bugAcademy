                // <li key=profile.id>profile.email</li>
import React, { Component } from 'react'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { connect } from 'react-redux'

class Profiles extends Component {
    constructor(){
    	super()  //I FORGOT THE MOST IMPORTANT THING
    	this.state = {
    		profiles: []
    	}
    }

    componentDidMount(){
         APIManager.get('/api/profile', null, (err, response) =>{
         	if (err) {
         		alert(err)
         		return
         	}

            console.log(JSON.stringify(response))
            var results = response.results
            // this.setState({
            // 	profiles: results  //profile: response
            // })
            this.props.profilesReceived(results)  //this.props.profileReceived(response)

         })
    }

	render(){
        var list = this.props.profiles.map((profile, i) => {
        	return (
                <li key={profile.id}>{profile.email}</li>
        	)
        })

		return(
			<div>
			    <ol>
			        { list }
			    </ol>
			</div>
		)
	}
} 

const stateToProps = (state) => {  //const stateToProps (state) => {
    return {
        profiles: state.profile.list   //NOT SURE WHY? list: profile.profiles
    }
}

const dispatchToProps = (dispatch) => {  //constat dispatchToProps (dispatch) => {
    return {
        //profileReceived: (profiles) => this.props.actions.profileReceived(profiles)
        profilesReceived: (profiles) => dispatch(actions.profilesReceived(profiles))
    }
}

export default connect(stateToProps, dispatchToProps)(Profiles)