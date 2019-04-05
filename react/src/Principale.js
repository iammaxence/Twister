import React, { Component } from 'react';
import FormulaireSaisieMessage from './FormulaireSaisieMessage.js';
import NavBar from './NavBar';
import Liste_msg from './Liste_msg';
import Liste_ami from './Liste_ami';
import axios from 'axios';

class Principale extends Component {
   	constructor(props){
   		super(props);

   	}

   	componentDidMount(){
    	//alert("Mounting");
		const url= new URLSearchParams();
		url.append("key",this.props.Ukey);
		url.append("query",null);
		if(this.props.page === "Principale"){
			url.append("friends",this.props.liste_ami);
		}
		else{
			url.append("friends",null);
		}
		axios.get("http://localhost:8080/Web/message/listmessage?"+url).then(res=> this.respliste(res));
    }
	respliste(resp){
		//console.log(resp.data);
		if(resp.data["code"]){
		  alert(resp.data["message"]);
		}
		else{
		  this.props.refreshMsg(resp.data["messages"]);
		}
	}
   	render(){
    	return (
     		<div className="Principale">
     			<NavBar logout={this.props.logout} principale={this.props.principale} profil={this.props.profil} user={this.props.user} Ukey={this.props.Ukey}/>
	     		<div className="row">
					<div className="column left green0">
						<br/>
						<Liste_ami liste_ami={this.props.liste_ami} profil={this.props.profil} owner={this.props.owner} user={this.props.user}/>
					</div>
					<div className="column right">
						<div className="row">
							<FormulaireSaisieMessage login={this.props.login} Ukey={this.props.Ukey} addMsg={this.props.addMsg} liste_ami={this.props.liste_ami}/> 
							<div className="container-fluid">
								<br/>
							</div>
							<Liste_msg liste_msg={this.props.liste_msg} profil={this.props.profil} delete={this.props.delete} owner={this.props.owner} user={this.props.user} page={this.props.page} Ukey={this.props.Ukey} refreshMsg={this.props.refreshMsg}/>
						</div>
					</div>
				</div>
		    </div>);
   	}
 }
 export default Principale;
//<input type="button" value="TEST" onClick={(e)=> alert(this.props.Ukey)}></input>