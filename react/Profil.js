import React, { Component } from 'react';
import FormulaireSaisieMessage from './FormulaireSaisieMessage.js';
import NavBar from './NavBar';
import Liste_msg from './Liste_msg';
import Liste_ami from './Liste_ami';
import Liste_Co from './Liste_Co';
import followIc from './html-css/images/userAdd.png';
import unfollowIc from './html-css/images/userRem.png';
import axios from 'axios';

class Profil extends Component{
	constructor(props){
		super(props)
		if(this.props.liste_ami === undefined){
			this.state={followed:false}
		}
		else{
			this.state={followed: this.props.liste_ami.find(ami=>ami.friend === this.props.owner) !== undefined}
		}
		console.log(this.props.liste_ami)
	}

	follow(){
		const url= new URLSearchParams();
		url.append("key",this.props.Ukey);
		url.append("login_friend",this.props.owner);	
		axios.get("http://localhost:8080/Web/user/addfriend?"+url).then(res=> this.respaddF(res));
	}

	respaddF(resp){
		if(resp.data["code"]){
			alert(resp.data["message"]);
		}
		else{
			this.setState({followed:!this.state.followed})
			this.getListAmi(this.props.user)
		}
	}

	unfollow(){
		const url= new URLSearchParams();
		url.append("key",this.props.Ukey);
		url.append("login_friend",this.props.owner);
		axios.get("http://localhost:8080/Web/user/removefriend?"+url).then(res=> this.respremF(res));
	}

	
	respremF(resp){
		if(resp.data["code"]){
			alert(resp.data["message"]);
		}
		else{
			this.setState({followed:!this.state.followed})
			this.getListAmi(this.props.user)
		}
	}
	
	getListAmi(user){
		const url= new URLSearchParams();
		url.append("login",user);
		axios.get("http://localhost:8080/Web/friends/list?"+url).then(res=> this.respami(res));
	}
	
	respami(resp){
		//console.log(resp.data);
		if(resp.data["code"]){
			alert(resp.data["message"]);
		}
		else{
			//console.log(resp.data["friends"]);
			this.props.getListAmi(resp.data["friends"]);
		}
	}
	componentWillReceiveProps(nextP){
		if(nextP.liste_ami === undefined){
			this.setState({followed:false});
		}
		else{
			this.setState({followed: nextP.liste_ami.find(ami=>ami.friend === nextP.owner) !== undefined})
		}
		
	}

	render(){
		var owner;
		var profilpage;
		var following;
		if (this.props.owner === "me" || this.props.owner === this.props.user){
			owner=<FormulaireSaisieMessage login={this.props.login} principale={this.props.principale} Ukey={this.props.Ukey} page={this.props.page} refreshMsg={this.props.refreshMsg} liste_ami={this.props.liste_ami} owner={this.props.owner} user={this.props.user}/>;
			profilpage=this.props.user;
			if(this.props.liste_ami !== undefined){
				following=
						<div className="col-md-4 pt-4">
							<b>{this.props.liste_ami.length}</b> following
						</div>;
			}
			else{
				following=
						<div className="col-md-4 pt-4">
							<b>0</b> following
						</div>;
			}
		}
		else{
			profilpage=this.props.owner;
			following='';
		}

		var followBut;
		if(this.props.owner === 'me'|| this.props.owner === this.props.user){
			followBut='';
		}
		else if(this.state.followed){
			followBut=<input className="float-right pb-2" type="image" width="50px" src={unfollowIc} alt="Unfollow" onClick={((event)=>this.unfollow())} />;			
		}
		else{
			followBut=<input className="float-right pb-2" type="image" width="50px" src={followIc} alt="Follow" onClick={((event)=>this.follow())} />;
		}

		return (
			<div className="Profil">
				<NavBar logout={this.props.logout} principale={this.props.principale} profil={this.props.profil} user={this.props.user} Ukey={this.props.Ukey}/>
				<br/>
				<div className="row">
					
					<div className="col-md-6 offset-md-2 white1">
						<br/>
						<div className="flex-wrap">
							<div className="container">
								<div className="col-md-8 offset-md-2">
									<div className="card card-header">
										<h1>{profilpage}</h1>
										<h3>bio</h3>
										<br/>
										<div className="row">
											<div className="col-md-4 pt-4">
												<b>{this.props.liste_msg ? this.props.liste_msg.length : 0 }</b> twists
											</div>
											{following}
											<div className="col-md-4 offset-md-4 float-right">
												{followBut}
											</div>
										</div>
									</div>
								</div>
							</div>	
						</div>
						<div>
							{owner}
						</div>
						<div className="container-fluid">
								<br/>
								<div className="botbar"></div> 
								<br/>
						</div>
						<Liste_msg liste_msg={this.props.liste_msg} profil={this.props.profil} delete={this.props.delete} deleteCom={this.props.deleteCom}  owner={this.props.owner} user={this.props.user} page={this.props.page} Ukey={this.props.Ukey} refreshMsg={this.props.refreshMsg}/>
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
			</div>);
	}
}

export default Profil;