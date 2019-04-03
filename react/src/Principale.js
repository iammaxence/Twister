import React, { Component } from 'react';
import FormulaireSaisieMessage from './FormulaireSaisieMessage.js';
import NavBar from './NavBar';
import Liste_msg from './Liste_msg';
import Liste_ami from './Liste_ami';
import axios from 'axios';

class Principale extends Component {
   	/*getMsg(){
   	const url= new URLSearchParams();
     var login=this.refs.login.value;
     var password=this.refs.password.value;

     url.append("login",login);
     
     url.append("password",password);
     
     //console.log(url);
     //alert("http://localhost:8080/Web/auth/login?"+url);
     axios.get("http://localhost:8080/Web/auth/login?"+url).then(res=> this.resplogin(res));
     
   }
   
   resplogin(resp){
    console.log(resp.data);
    if(resp.data["code"]=== 201){
      //this.setState({"Status":"error","texterror":resp.data["description"]})
      alert(resp.data["message"]);
    }
    else if(resp.data["code"]=== 202){
      alert(resp.data["message"]);
    }
    else if(resp.data["code"]=== 203){
      alert(resp.data["message"]);
    }
    else if(resp.data["code"]=== 204){
      alert(resp.data["message"]);
    }
    else if(resp.data["code"]=== 210){
      alert(resp.data["message"]);
    }
    else if(resp.data["code"]=== 220){
      alert(resp.data["message"]);
    }
    else{
      this.props.login(resp.data["Login"],resp.data["Key"]);
    }
   }*/
  
   	render(){
		//var liste_msg=this.getMsg();


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
//<input type="button" value="TEST" onClick={(e)=> alert(this.props.Ukey)}></input>