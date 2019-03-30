import React, { Component } from 'react';
import './html-css/css/bootstrap.min.css';
import './html-css/css/util.css';
import './html-css/css/enregistrement.css';
import './html-css/fonts/font-awesome-4.7.0/css/font-awesome.css';

class SignIn extends Component {
  constructor(props){
     super(props);
   }
  send(){
    this.props.register();
  }
  cancel(){
    this.props.logout();
  }
  register(){

  }
   
  render(){
    return (
        <div class="limiter ">
          <div class="container-login100 ">
            <div class="wrap-login100 justify-content-center">
              <form class="login100-form validate-form">
                <span class="login100-form-title">
                  Create Account
                </span>

                <div class="wrap-input100 validate-input" >
                  <input class="input100" type="text" name="prenom" placeholder="Prenom" required />
                  <span class="focus-input100"></span>
                </div>

                <div class="wrap-input100 validate-input" >
                  <input class="input100" type="text" name="nom" placeholder="Nom" required />
                  <span class="focus-input100"></span>
                </div>

                <div class="wrap-input100 validate-input" >
                  <input class="input100" type="text" name="login" placeholder="Login" required />
                  <span class="focus-input100"></span>
                </div>

                <div class="wrap-input100 validate-input" >
                  <input class="input100" type="mail" name="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Must be an email" required />
                  <span class="focus-input100"></span>
                </div>

                <div class="wrap-input100 validate-input">
                  <input class="input100" type="password" name="pass" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />  
                  <span class="focus-input100"></span>
                </div>

                <div class="wrap-input100 validate-input">
                  <input class="input100" type="password" name="repeat" placeholder="Repeat Password" required />
                  <span class="focus-input100"></span>
                </div>
                
                <div class="container-login100-form-btn">
                  <input class="login100-form-btn w-50" type="submit" value="Register" onClick={((event)=>this.register())} />
                  <input class="login100-form-btn w-50" type="button" value="cancel" onClick={((event)=>this.cancel())} />
                </div>
              </form>
            </div>
          </div>
        </div>
        
      );
   }
  
}

export default SignIn;