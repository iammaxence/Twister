import React, { Component } from 'react';
import Commentaire from './Commentaire.js'

class Message extends Component{
	constructor(props){
		super(props);
		this.state={message:this.props.message,listeCom:this.props.listeCom};
	}

	render() {
		return (
			<div className="Message"> 
				{this.state.message} 
				<div>
					{this.state.listeCom.map(commentaires => {
						return <Commentaire commentaire={commentaires.commentaire}/>;
					})}
			
				</div>
			</div>
		);
	}
}

export default Message;