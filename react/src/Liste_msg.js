import React, { Component } from 'react';
import Message from './Message.js'

class Liste_msg extends Component{
	constructor(props){
		super(props);
		this.state={liste:[{message:'SALUT',listeCom:[{commentaire:'com1'},{commentaire:'com2'}]},{message:'HELLO',listeCom:[{commentaire:'com3'},{commentaire:'com4'}]}]};
	}
	render() {
		return (
			this.state.liste.map(messages => {
				return <Message message={messages.message} listeCom={messages.listeCom}/>;
			})
		);
	}
}


export default Liste_msg;