            // content = <div><Tracks /><Admin /></div>
            // content = <Track slug={this.props.slug} />
import React, { Component } from 'react'
import Tracks from './Tracks'
import Nav from './Nav'
import Footer from './Footer'
import { Track, Register, Account, Bug } from '../layout/'
// import Register from './Register'

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
        	// content = <div><Tracks /><Admin /></div>
            content = <div><Tracks /></div>

        if (page == 'track')
            content = <Track slug={this.props.slug} />

        if (page == 'register')
            content = <Register />

        if (page == 'account')
            content = <Account />

        if (page == 'bug')
            content = <Bug slug={this.props.slug}/>

		return(
			<div>
                <Nav />
                { content }
                <Footer />
	        </div>
		)
	}
}

export default Main
