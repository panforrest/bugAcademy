                    // <h2>User is not logged in. </h2>
                    // export default connect(stateToProps, dispatchToProps)(Admin)
import React, { Component } from 'react'
import actions from '../../actions'
import { connect } from 'react-redux'
import Signup from './Signup'

class Admin extends Component {

    // login(event){
    //     event.preventDefault()
    //     APIManager.post('/account/login', this.state.visitor, (err, response) => {
    //         if (err) {
    //             const msg = err.message || err
    //             // console.log(msg)
    //             alert(msg)
    //             return
    //         }

    //         console.log(JSON.stringify(response))
    //         var result = response.profile
    //         this.props.currentUserReceived(result)
    //     })
    // }

    render(){
    	return(
    		<div>
                {(this.props.currentUser != null) ? <h2>Welcome, {this.props.currentUser.email}</h2> : 

                    <Signup />

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
        currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
    }
}

export default Admin