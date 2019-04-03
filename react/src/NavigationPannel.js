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
      //this.getListAmi(this.props.user);
      temp=<Profil login={this.props.login} logout={this.props.logout} profil={this.props.profil} principale={this.props.principale} owner={this.props.owner} liste_msg={this.props.liste_msg} user={this.props.user} Ukey={this.props.Ukey}/>
    }else if (this.props.connected){//page connecter
      temp=<Principale login={this.props.login} logout={this.props.logout} profil={this.props.profil} principale={this.props.principale}  owner={this.props.owner} liste_msg={this.props.liste_msg} user={this.props.user} Ukey={this.props.Ukey}/>;
    }else {//page de connexion
      temp=<Login login={this.props.login} register={this.props.register} getListAmi={this.props.getListAmi}/>;
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