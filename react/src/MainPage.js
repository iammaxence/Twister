import React, { Component } from 'react';
import NavigationPannel from './NavigationPannel.js';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={connected:false,page:"Login",owner:"me",user:""};
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.getRegister = this.getRegister.bind(this);
    this.getProfil = this.getProfil.bind(this);
  }

  getConnected(){
    this.setState({connected:true,page:"Principale",user:"Guillaume Lethug"});
  }
  setLogout(){
    this.setState({connected:false,page:"Login"});
  }
  getRegister(){ 
    this.setState({connected:false,page:"Register"});
  }
  getProfil(wantedProfil){
    this.setState({connected:true,page:"Profil",owner:wantedProfil});
  }
  
  render(){
    return(
      <div className="MainPage">
        <NavigationPannel login={this.getConnected} logout={this.setLogout} register={this.getRegister} profil={this.getProfil} connected={this.state.connected} page={this.state.page} 
          principale={this.getConnected} owner={this.state.owner} liste_msg={this.props.liste_msg} user={this.state.user}/>
      </div>);
  }
  
}


export default MainPage;