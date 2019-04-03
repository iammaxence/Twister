import React, { Component } from 'react';
import NavigationPannel from './NavigationPannel.js';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={connected:false,page:"Login",owner:"me",user:"",Ukey:"",liste_ami:"empty"};
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.getRegister = this.getRegister.bind(this);
    this.getProfil = this.getProfil.bind(this);
    this.getListAmi = this.getListAmi.bind(this);
  }

  getConnected(login,key){
    this.setState({connected:true,page:"Principale",user:login,Ukey:key});
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
  getListAmi(liste){
    this.setState({list_ami:liste});
    alert(this.state.liste_ami.map((e)=>alert()));
  }

  
  render(){
    return(
      <div className="MainPage">
        <NavigationPannel login={this.getConnected} logout={this.setLogout} register={this.getRegister} profil={this.getProfil} connected={this.state.connected} page={this.state.page} 
          principale={this.getConnected} owner={this.state.owner} liste_msg={this.props.liste_msg} user={this.state.user} Ukey={this.state.Ukey} 
          getListAmi={this.getListAmi} liste_ami={this.state.liste_ami}/>
      </div>);
  }
  
}


export default MainPage;