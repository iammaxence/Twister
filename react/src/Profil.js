import React, { Component } from 'react';
import FormulaireSaisieMessage from './FormulaireSaisieMessage.js';
import NavBar from './NavBar';
import Liste_msg from './Liste_msg';
import Liste_ami from './Liste_ami';

class Profil extends Component{
	
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
	     		<NavBar logout={this.props.logout} principale={this.props.principale} profil={this.props.profil} user={this.props.user} Ukey={this.props.Ukey}/>
	     		<div className="row">
					<div className="column left green0">
						<br/>
						<Liste_ami liste_ami={this.props.liste_ami} profil={this.props.profil} owner={this.props.owner} user={this.props.user}/>
					</div>
					<div className="column right">
						<br/>
						<div className="flex-wrap">
							<div className="container">
								<div className="col-md-8 offset-md-2">
									<div className="card card-header">
										<h1>{profilpage}</h1>
										<h3>bio</h3>
					                    <div className=""><input className="btn green1 float-right" type="submit" value="Follow" onClick={((event)=>this.follow())} /></div>
					                    <div className="row">
					                    	<div className="col-md-4">
					                    		<b>44</b> twists
					                    	</div>
					                    	<div className="col-md-4">
					                    		<b>743</b> following
					                    	</div>
					                    	<div className="col-md-4">
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
						<Liste_msg liste_msg={this.props.liste_msg} profil={this.props.profil} owner={this.props.owner} user={this.props.user}/>
					</div>
				</div>
	       </div>);
	}
}

export default Profil;