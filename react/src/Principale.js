import React, { Component } from 'react';
import FormulaireSaisieMessage from './FormulaireSaisieMessage.js';
import NavBar from './NavBar';
import Liste_msg from './Liste_msg';
import Liste_ami from './Liste_ami';

class Principale extends Component {
   	constructor(props){
    	super(props);
   	}
  
   	render(){
    	return (
     		<div className="Principale">
     			<NavBar logout={this.props.logout} principale={this.props.principale} profil={this.props.profil} user={this.props.user}/>
	     		<div className="row">
					<div className="column left green0">
						<Liste_ami liste_ami={this.props.liste_ami} profil={this.props.profil} owner={this.props.owner} user={this.props.user}/>
					</div>
					<div className="column right">
						<div className="row">
							<FormulaireSaisieMessage login={this.props.login} /> 
							<div className="container-fluid">
								<br/>
							</div>
							<Liste_msg liste_msg={this.props.liste_msg} profil={this.props.profil} owner={this.props.owner} user={this.props.user}/>
						</div>
					</div>
				</div>
		    </div>);
   	}
 }
 export default Principale;
