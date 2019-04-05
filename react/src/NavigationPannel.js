import React, { Component } from 'react';
import SignIn from './SignIn';
import Principale from './Principale';
import Login from './Login';
import Profil from './Profil';
import axios from 'axios';

class NavigationPannel extends Component{
  constructor(props){
    super(props);

  }
  render(){

    //this.props.getListAmi(this.props.user);
      
    

    var temp;
    if (this.props.page === "Register"){//Page d'enregistrement
      temp=<SignIn logout={this.props.logout} login={this.props.login}/>;
    }else if (this.props.page === "Profil"){//Page profil
      temp=<Profil addMsg={this.props.addMsg} login={this.props.login} logout={this.props.logout} page={this.props.page} profil={this.props.profil} principale={this.props.principale} owner={this.props.owner} liste_msg={this.props.liste_msg} liste_ami={this.props.liste_ami} user={this.props.user} Ukey={this.props.Ukey} refreshMsg={this.props.refreshMsg}/>
    }else if (this.props.connected){//page connecter
      temp=<Principale key="1" addMsg={this.props.addMsg} delete={this.props.delete} login={this.props.login} logout={this.props.logout} page={this.props.page} profil={this.props.profil} principale={this.props.principale}  owner={this.props.owner} liste_msg={this.props.liste_msg} liste_ami={this.props.liste_ami} user={this.props.user} Ukey={this.props.Ukey} refreshMsg={this.props.refreshMsg}/>;
    }else {//page de connexion
      temp=<Login login={this.props.login} register={this.props.register} getListAmi={this.props.getListAmi} refreshMsg={this.props.refreshMsg}/>;
    }
    
    return (
      <div className="NaviagtionPannel">
        <nav>
          {temp}
        </nav>
      </div>);
          
            
   }
}

export default NavigationPannel;