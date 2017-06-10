                // <li key=profile.id>profile.email</li>
import React, { Component } from 'react'
import { APIManager } from '../../utils'

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

            // console.log(JSON.stringify(response))
            var results = response.results
            this.setState({
            	profiles: results  //profile: response
            })

         })
    }

	render(){
        var list = this.state.profiles.map((profile, i) => {
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

export default Profiles