import React, { Component } from 'react';

class Commentaire extends Component{
	constructor(props){
		super(props);
		this.state={commentaire:this.props.commentaire};
	}

	render() {
		return (
			<div className="Commentaire"> 
				{this.state.commentaire} 
			</div>
		);
	}
}

export default Commentaire;