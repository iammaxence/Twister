import React, { Component } from 'react';
import Message from './Message.js'


class Liste_msg extends Component{
	constructor(props){
		super(props);
		this.state={liste:[{message:'SALUTSALUTSALUTSALUTSALUTSALUTSALUTSALUTSALUTSALUTSALUT SALUTSALUTSALUTSALUTSALUTSALUT',autor:'Joris Lecon',date:'10/03/2019',listeCom:[{commentaire:'commentaire 1',autor:'Jojo',date:'10/03/2019'},
																							{commentaire:'commentaire 2',autor:'Jojo',date:'10/03/2019'}],listeLike:[{like:'Jojo'},{like:'Bernard'}]},
				   		   {message:'HELLO',autor:'Quentin Filsdeup',date:'10/03/2019',listeCom:[{commentaire:'com3',autor:'Jojo',date:'10/03/2019'},
				   		   																		 {commentaire:'com4',autor:'Jojo',date:'10/03/2019'}],listeLike:[{like:'Jojo'},{like:'Bernard'}]}]};
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