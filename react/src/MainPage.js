import React, { Component } from 'react';
import NavigationPannel from './NavigationPannel.js';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={connected:false,page:"Login"};
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
    this.getRegister = this.getRegister.bind(this);
  }

  getConnected(){
    this.setState({connected:true,page:"Principale"});
  }
  setLogout(){
    this.setState({connected:false,page:"Login"});
  }
  getRegister(){ 
    this.setState({connected:false,page:"Register"});
  }
  
  render(){
    return(
      <div className="MainPage">
        <NavigationPannel login={this.getConnected} logout={this.setLogout} register={this.getRegister} connected={this.state.connected} page={this.state.page}/>
      </div>);
  }
  
}


export default MainPage;