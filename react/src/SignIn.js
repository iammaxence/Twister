import React, { Component } from 'react';
import './html-css/css/bootstrap.min.css';
import './html-css/fonts/font-awesome-4.7.0/css/font-awesome.css';
import './html-css/css/util.css';
import './html-css/css/enregistrement.css';

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
        <div className="limiter">
          <div className="container-login100 justify-content-center">
            <div className="wrap-enreg justify-content-center">
              <form className="login100-form validate-form ">
                <span className="login100-form-title">
                  Create Account
                </span>

                <div className="wrap-input100 validate-input" >
                  <input className="input100" type="text" name="prenom" placeholder="Prenom" required />
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input" >
                  <input className="input100" type="text" name="nom" placeholder="Nom" required />
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input" >
                  <input className="input100" type="text" name="login" placeholder="Login" required />
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input" >
                  <input className="input100" type="mail" name="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Must be an email" required />
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input">
                  <input className="input100" type="password" name="pass" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />  
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input">
                  <input className="input100" type="password" name="repeat" placeholder="Repeat Password" required />
                  <span className="focus-input100"></span>
                </div>
                
                <div className="container-login100-form-btn">
                  <input className="login100-form-btn w-50" type="submit" value="Register" onClick={((event)=>this.register())} />
                  <input className="login100-form-btn w-50" type="button" value="cancel" onClick={((event)=>this.cancel())} />
                </div>
              </form>
            </div>
          </div>
        </div>
        
      );
   }
  
}

export default SignIn;