import React, { Component } from 'react';
import Commentaire from './Commentaire.js'

class Liste_Commentaire extends Component{
	constructor(props){
		super(props);
		this.state={listeCom:this.props.listeCom};
	}

	render(){
		return(
			<div class="container"> 
				<div class="row">
					<ul class="list-unstyled w-75">
						{this.state.listeCom.map(commentaires => {
							return <Commentaire commentaire={commentaires.commentaire} autor={commentaires.autor} date={commentaires.date}/>;
						})}
						<p></p>
					</ul>
				</div>
			</div>
		)
	}
}
export default Liste_Commentaire;