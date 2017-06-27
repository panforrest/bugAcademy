            // content = <div><Tracks /><Admin /></div>
            // content = <Track slug={this.props.slug} />
import React, { Component } from 'react'
import Tracks from './Tracks'
import Admin from './Admin'
import Track from '../layout/Track'
// import { Track } from '../layout'

class Main extends Component {
    componentDidMount(){
    	console.log('Main componentDidMount props.page: '+this.props.page)
        // console.log('page: '+JSON.stringify(this.state.page))
        // alert('slug: '+JSON.stringify(this.state.slug))
    }

	render(){
        var content = null
        var page = this.props.page
        if (page == 'home')
        	content = <div><Tracks /><Admin /></div>

        if (page == 'track')
            content = <Track slug={this.props.slug} />

		return(
			<div>
                { content }
	        </div>
		)
	}
}

export default Main
