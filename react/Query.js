import React, { Component } from 'react';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';
import NavBar from './NavBar';
import Liste_msg from './Liste_msg';
import Liste_ami from './Liste_ami';
import Liste_Co from './Liste_Co';

class Query extends Component{


	render(){
		var liste;
		console.log(this.props.liste_query)
		if(this.props.liste_query === undefined){
			liste=<h3>Nothing found ¯\_(ツ)_/¯</h3>
		}
		else{
			liste=<Liste_msg liste_query={this.props.liste_query} profil={this.props.profil} delete={this.props.delete} deleteCom={this.props.deleteCom} user={this.props.user} page={this.props.page} Ukey={this.props.Ukey} refreshQuery={this.props.refreshQuery}/>
		}
		return(
			<div className="Query">
				<NavBar logout={this.props.logout} principale={this.props.principale} profil={this.props.profil} user={this.props.user} Ukey={this.props.Ukey} refreshMsg={this.props.refreshMsg} refreshQuery={this.props.refreshQuery}/>
				<br/>
				<div className="row">
					
					<div className="col-md-6 offset-md-2 white1">
						<div className="justify-content-center">
							<br/>
							<h1>Result for the query:  <i>"{this.props.query}"</i></h1>
							<br/>
						</div>
						<div className="row justify-content-center">
							{liste}
						</div>
					</div>
					<div className="col-md-2 column white2">
						<br/>
						<Liste_ami liste_ami={this.props.liste_ami} profil={this.props.profil} owner={this.props.owner} user={this.props.user}/>
						<br/>
						<div className="botbar" ></div>
						<br/>
						<Liste_Co liste_co={this.props.liste_co} profil={this.props.profil} Ukey={this.props.Ukey}/>
					</div>
				</div>
			</div>
		);
	}


}

export default Query;