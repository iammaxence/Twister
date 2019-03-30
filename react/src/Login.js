import React, { Component } from 'react';
import logo from './html-css/images/TW.png';
import './html-css/css/login.css';
import './html-css/fonts/font-awesome-4.7.0/css/font-awesome.css';
import './html-css/css/style.css';
import './html-css/css/bootstrap.min.css';

class Login extends Component {
   constructor(props){
     super(props);
   }
   
   send(){
     this.props.login();
   }
   
   render(){
     return (
        <div className="Login" className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-pic js-tilt" data-tilt>
                <img src={logo} alt="Twister"/>
              </div>

              <form className="login100-form validate-form">
                <span className="login100-form-title">
                  Member Login
                </span>

                <div className="wrap-input100 validate-input">
                  <input className="input100" type="text" name="email" placeholder="Email"/>
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input">
                  <input className="input100" type="password" name="pass" placeholder="Password"/>
                  <span className="focus-input100"></span>
                </div>
                
                <div className="container-login100-form-btn">
                  
                  <input  className="login100-form-btn" type="submit" value="Login" onClick={((event)=>this.send())} />
                </div>

                <div className="text-center p-t-12">
                  <span className="txt1">
                    Forgot your
                  </span>
                  <input className="white txt1 " type="submit" value=" password ?" onClick={((event)=>this.props.lost())}/>
                </div>

                <div className="text-center p-t-136">
                  <div className="txt2">
                    <input className="white" type="submit" value="Create your Account" onClick={((event)=>this.props.register())}/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>);
       
   }
 }

 export default Login;