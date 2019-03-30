import React, { Component } from 'react';
import Message from './Message.js'


class Liste_msg extends Component{
	constructor(props){
		super(props);
		//this.state=this.props.liste_msg;
		this.state={liste:[{message:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
								autor:'Joris Lecon',date:'10/03/2019',listeCom:[{commentaire:'commentaire 1',autor:'Jojo',date:'10/03/2019'},
																				{commentaire:'commentaire 2',autor:'Jojo',date:'10/03/2019'}],listeLike:[{like:'Jojo'},{like:'Bernard'}]},
				   		   {message:'HELLO',
				   		   		autor:'Quentin Filsdeup',date:'10/03/2019',listeCom:[{commentaire:'com3',autor:'Jojo',date:'10/03/2019'},
				   		   															 {commentaire:'com4',autor:'Jojo',date:'10/03/2019'}],listeLike:[{like:'Jojo'},{like:'Bernard'}]}]};
	}
	render() {
		return (
			<div className="container"> 
				<div className="row">
					<ul className="list-unstyled w-50 mx-auto">	  
						{this.state.liste.map(messages => {
							return <Message message={messages.message} autor={messages.autor} date={messages.date} listeCom={messages.listeCom} listeLike={messages.listeLike} profil={this.props.profil} owner={this.props.owner} user={this.props.user}/>;
							})}
						<p></p>
					</ul>
				</div>
			</div>
		);
	}
}


export default Liste_msg; 