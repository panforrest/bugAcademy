                        // <li><a href="#"><i className="icon-time"></i> {this.props.track.address} </a></li>
                        // <li><a href="#"><i className="icon-map-marker2"></i> {this.props.track.city} </a></li>
                    // <ul className="entry-meta clearfix">
                    //     <li><span className="label label-warning">Private</span></li>

                    // </ul>
                    // <div className="entry-content">
                    //     <a href={'/track/'+this.props.track.slug} className="btn  btn-danger">Visit</a>
                    // </div>

import React, { Component } from 'react'

class TrackPreview extends Component {
	render(){
		return (

			<div className="entry clearfix">
                <div className="entry-image hidden-sm">
                    <a href={'/track/'+this.props.track.slug}>
                        <img src="images/events/thumbs/1.jpg" alt="tenetur" />
                    </a>
                </div>
                <div className="entry-c">
                    <div className="entry-title">
                        <h2>
                            <a href={'/track/'+this.props.track.slug}>{this.props.track.name}</a>
                        </h2>
                    </div>

                    <hr style={{borderTop:'1px solid #ddd'}} />

                </div>
            </div>

		)
	}
}

export default TrackPreview