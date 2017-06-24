import React, { Component } from 'react'
import { Profiles, Bugs, Admin, Tracks } from '../containers'

class Home extends Component {
	render(){
		return(
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <Tracks />
                    </div>

                    <div className="col-md-6">
                        <Bugs />
                    </div>

                    <div className="col-md-3">
                        <Admin />

                    </div>
                    

                </div>
            </div>
		)
	}
}

export default Home