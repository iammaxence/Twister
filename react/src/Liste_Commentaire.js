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
					
					<div class="form-inline pt-1 ">
		                <textarea class="form-control" placeholder="Commentaire"></textarea>
		                <input class="btn green1 " type="submit" value="Comment" onClick={((event)=>this.send())} />
		            </div>
				</div>
				<div class="pt-1" ></div>
			</div>
		)
	}
}
export default Liste_Commentaire;