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
	     		<div class="row">
					<div class="column left green0">
						<Liste_ami liste_ami={this.props.liste_ami} profil={this.props.profil} owner={this.props.owner} user={this.props.user}/>
					</div>
					<div class="column right">
						<div class="row">
							<FormulaireSaisieMessage login={this.props.login} /> 
							<div class="container-fluid">
								<br/>
							</div>
							<Liste_msg liste_msg={this.props.liste_msg}/>
						</div>
					</div>
				</div>
		    </div>);
   	}
 }
 export default Principale;
