import React, { Component } from 'react';
import NavigationPannel from './NavigationPannel.js';
import axios from 'axios';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={connected:false,page:"Login",owner:"me",user:"",Ukey:"",liste_ami:"empty",liste_msg:"empty"};
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.getRegister = this.getRegister.bind(this);
    this.getProfil = this.getProfil.bind(this);
    this.getListAmi = this.getListAmi.bind(this);
    this.refreshMsg = this.refreshMsg.bind(this);
    this.getPrincipal = this.getPrincipal.bind(this);
    this.addMsg = this.addMsg.bind(this);
    this.delete = this.delete.bind(this);
  }

  getConnected(login,key){
    this.setState({connected:true,page:"Principale",user:login,Ukey:key});
  }
  getPrincipal(){
    this.setState({page:"Principale"});
  }
  setLogout(){
    this.setState({connected:false,page:"Login"});
  }
  getRegister(){ 
    this.setState({connected:false,page:"Register"});
  }
  getProfil(wantedProfil){
    this.setState({page:"Profil",owner:wantedProfil});
  }
  getListAmi(liste){
    this.setState({liste_ami:liste});
  }
  refreshMsg(listeM){
    this.setState({liste_msg:listeM});
    console.log(this.state.liste_msg);
  }
  addMsg(msg){
    this.setState({
        liste_msg: [...this.state.liste_msg, msg]
    })
    //this.state.liste_msg.push(msg);
    //this.forceUpdate();
  }
  delete(msg){
    const url= new URLSearchParams();
    url.append("id",msg);
    url.append("key",this.state.Ukey);
        //alert("http://localhost:8080/Web/friends/list?"+url);
    axios.get("http://localhost:8080/Web/message/removemessage?"+url).then(res=> alert("Removed"));
  }

  
  render(){
    return(
      <div className="MainPage">
        <NavigationPannel login={this.getConnected} logout={this.setLogout} register={this.getRegister} profil={this.getProfil} connected={this.state.connected} page={this.state.page} 
          principale={this.getPrincipal} owner={this.state.owner} liste_msg={this.state.liste_msg} user={this.state.user} Ukey={this.state.Ukey} 
          getListAmi={this.getListAmi} liste_ami={this.state.liste_ami} refreshMsg={this.refreshMsg} addMsg={this.addMsg} delete={this.delete}/>
      </div>);
  }
  
}


export default MainPage;