import React, { Component } from 'react';

class Commentaire extends Component{
	constructor(props){
		super(props);
		this.state={commentaire:this.props.commentaire,autor:this.props.autor,date:this.props.date};
	}

	render() {
		return (
			<div className="Commentaire example-collapse-text pt-1">
				<li className="media tw_back">
					<div className="media-body pl-2">
						<div className="media">
							<div className="media-body">
								<h4 className="media-heading">{this.state.autor} <small className="float-right pr-2 pt-1"><i>{this.state.date}</i></small></h4>
									<p>{this.state.commentaire}</p>
							</div>
						</div>
					</div>
				</li>
				
			</div>
		);
	}
}

export default Commentaire;