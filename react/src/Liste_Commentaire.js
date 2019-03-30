import React, { Component } from 'react';
import Commentaire from './Commentaire.js'

class Liste_Commentaire extends Component{
	constructor(props){
		super(props);
		this.state={listeCom:this.props.listeCom};
	}
	send(){

	}

	render(){
		return(
			<div class="container"> 
				<div class="row">
					<div class="botbar"></div>
					<ul class="list-unstyled w-75">
						{this.state.listeCom.map(commentaires => {
							return <Commentaire commentaire={commentaires.commentaire} autor={commentaires.autor} date={commentaires.date}/>;
						})}
					</ul>
					
					<div class="form-inline pt-1 w-100">
		                <textarea class="form-control w-75"  placeholder="Commentaire" required></textarea>
		                <input class="btn green2" type="submit" value="Send" onClick={((event)=>this.send())} />
		            </div>
				</div>
				<div class="pt-1" ></div>
			</div>
		)
	}
}
export default Liste_Commentaire;