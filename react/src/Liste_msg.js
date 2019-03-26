import React, { Component } from 'react';
import Message from './Message.js'


class Liste_msg extends Component{
	constructor(props){
		super(props);
		this.state={liste:[{message:'SALUT',autor:'Joris Lecon',date:'10/03/2019',listeCom:[{commentaire:'com1'},{commentaire:'com2'}],listeLike:[{like:'Jojo'},{like:'Bernard'}]},
				   		   {message:'HELLO',autor:'Quentin Filsdeup',date:'10/03/2019',listeCom:[{commentaire:'com3'},{commentaire:'com4'}],listeLike:[{like:'Jojo'},{like:'Bernard'}]}]};
	}
	render() {
		return (
			<div class="container"> 
				<div class="row">
					<ul class="list-unstyled w-50 mx-auto">	  
						{this.state.liste.map(messages => {
							return <Message message={messages.message} autor={messages.autor} date={messages.date} listeCom={messages.listeCom} listeLike={messages.listeLike}/>;
							})}
						<p></p>
					</ul>
				</div>
			</div>
		);
	}
}


export default Liste_msg;