import React, { Component } from 'react';
import SignIn from './SignIn';
import Principale from './Principale';
import Liste_msg from './Liste_msg';
import Logout from './Logout';
import Login from './Login';

class NavigationPannel extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    var temp;
    
    if (this.props.page === "Register"){//Page d'enregistrement
      temp=<SignIn logout={this.props.logout} login={this.props.login}/>;
    }else if (this.props.connected){//page connecter
      temp=<div><Principale log={this.props.login} /><Liste_msg/><Logout logout={this.props.logout}/></div>;
    }else {//page de connexion
      temp=<div><Login login={this.props.login} register={this.props.register}/></div>;
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