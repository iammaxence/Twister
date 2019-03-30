import React, { Component } from 'react';
import FormulaireSaisieMessage from './FormulaireSaisieMessage.js';
import NavBar from './NavBar';
import Liste_msg from './Liste_msg';
import Liste_ami from './Liste_ami';

class Profil extends Component{
	constructor(props){
		super(props);
	}
	follow(){

	}

	render(){
		var owner;
		var profilpage;
		if (this.props.owner === "me"){
	      owner=<FormulaireSaisieMessage login={this.props.login} />;
	      profilpage=this.props.user;
	    }
	    else{
	    	profilpage=this.props.owner;
	    }



	    return (
	     	<div className="Profil">
	     		<NavBar logout={this.props.logout} principale={this.props.principale} profil={this.props.profil} user={this.props.user}/>
	     		<div class="row">
					<div class="column left green0">
						<Liste_ami liste_ami={this.props.liste_ami} profil={this.props.profil} owner={this.props.owner} user={this.props.user}/>
					</div>
					<div class="column right">
						<br/>
						<div class="flex-wrap">
							<div class="container">
								<div class="col-md-8 offset-md-2">
									<div class="card card-header">
										<h1>{profilpage}</h1>
										<h3>bio</h3>
					                    <div class=""><input class="btn float-right" type="submit" value="Follow" onClick={((event)=>this.follow())} /></div>
					                    <div class="row">
					                    	<div class="col-md-4">
					                    		<b>44</b> twists
					                    	</div>
					                    	<div class="col-md-4">
					                    		<b>743</b> following
					                    	</div>
					                    	<div class="col-md-4">
					                    		<b>345</b> followers
					                    	</div>
					                    </div>
									</div>
								</div>
							</div>	
						</div>
						<div>
							{owner}
						</div>
						<br/>
						<Liste_msg liste_msg={this.props.liste_msg}/>
					</div>
				</div>
	       </div>);
	}
}

export default Profil;