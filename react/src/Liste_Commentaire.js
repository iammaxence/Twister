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
			<div className="container"> 
				<div className="row">
					<div className="botbar"></div>
					<ul className="list-unstyled w-75">
						{this.state.listeCom.map(commentaires => {
							return <Commentaire commentaire={commentaires.commentaire} autor={commentaires.autor} date={commentaires.date}/>;
						})}
					</ul>
					
					<div className="form-inline pt-1 w-100">
		                <textarea className="form-control w-75"  placeholder="Commentaire" required></textarea>
		                <input className="btn green2" type="submit" value="Send" onClick={((event)=>this.send())} />
		            </div>
				</div>
				<div className="pt-1" ></div>
			</div>
		)
	}
}
export default Liste_Commentaire;