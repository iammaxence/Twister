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
        <div className="Login" class="limiter">
          <div class="container-login100">
            <div class="wrap-login100">
              <div class="login100-pic js-tilt" data-tilt>
                <img src={logo} alt="Twister"/>
              </div>

              <form class="login100-form validate-form">
                <span class="login100-form-title">
                  Member Login
                </span>

                <div class="wrap-input100 validate-input">
                  <input class="input100" type="text" name="email" placeholder="Email"/>
                  <span class="focus-input100"></span>
                </div>

                <div class="wrap-input100 validate-input">
                  <input class="input100" type="password" name="pass" placeholder="Password"/>
                  <span class="focus-input100"></span>
                </div>
                
                <div class="container-login100-form-btn">
                  
                  <input  class="login100-form-btn" type="submit" value="Login" onClick={((event)=>this.send())} />
                </div>

                <div class="text-center p-t-12">
                  <span class="txt1">
                    Forgot your
                  </span>
                  <input class="white txt1 " type="submit" value=" password ?" onClick={((event)=>this.props.lost())}/>
                </div>

                <div class="text-center p-t-136">
                  <div class="txt2">
                    <input class="white" type="submit" value="Create your Account" onClick={((event)=>this.props.register())}/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>);
       
   }
 }

 export default Login;