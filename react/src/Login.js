import React, { Component } from 'react';
import logo from './html-css/images/TW.png';
import './html-css/css/login.css';
import './html-css/fonts/font-awesome-4.7.0/css/font-awesome.css';
import './html-css/css/style.css';
import './html-css/css/bootstrap.min.css';
import axios from 'axios';

class Login extends Component {
     getListAmi(user){
      
        const url= new URLSearchParams();
        url.append("login",user);
        alert("http://localhost:8080/Web/friends/list?"+url);
        axios.get("http://localhost:8080/Web/friends/list?"+url).then(res=> this.respami(res));
      
    }
     
     respami(resp){
      console.log(resp.data);
      if(resp.data["code"]=== 1001){
        alert(resp.data["message"]);
      }
      else if(resp.data["code"]=== 1010){
        alert(resp.data["message"]);
      }
      else if(resp.data["code"]=== 1020){
        alert(resp.data["message"]);
      }
      else if(resp.data["code"]=== 1030){
        alert(resp.data["message"]);
      }
      else if(resp.data["code"]=== 1040){
        alert(resp.data["message"]);
      }
      else if(resp.data["code"]=== 1050){
        alert(resp.data["message"]);
      }
      else{
        this.props.getListAmi(resp.data["friend"]);
      }
     
    }
   
   send(){
     //this.props.login();
     
     const url= new URLSearchParams();
     var login=this.refs.login.value;
     var password=this.refs.password.value;

     url.append("login",login);
     
     url.append("password",password);
     
     //console.log(url);
     //alert("http://localhost:8080/Web/auth/login?"+url);
     axios.get("http://localhost:8080/Web/auth/login?"+url).then(res=> this.resplogin(res));
     
   }
   
   resplogin(resp){
    console.log(resp.data);
    if(resp.data["code"]=== 201){
      //this.setState({"Status":"error","texterror":resp.data["description"]})
      alert(resp.data["message"]);
    }
    else if(resp.data["code"]=== 202){
      alert(resp.data["message"]);
    }
    else if(resp.data["code"]=== 203){
      alert(resp.data["message"]);
    }
    else if(resp.data["code"]=== 204){
      alert(resp.data["message"]);
    }
    else if(resp.data["code"]=== 210){
      alert(resp.data["message"]);
    }
    else if(resp.data["code"]=== 220){
      alert(resp.data["message"]);
    }
    else{
      this.props.login(resp.data["Login"],resp.data["Key"]);
      this.getListAmi(resp.data["Login"]);
    }
   }


   //onKeyPress= {(e) => {if(e.key === 'Enter'){this.send()}}}
   
   render(){
     return (
        <div className="Login limiter">
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
                  <input className="input100" type="text" ref="login" placeholder="Login"/>
                  <span className="focus-input100"></span>
                </div>

                <div className="wrap-input100 validate-input">
                  <input className="input100" type="password" ref="password" placeholder="Password" />
                  <span className="focus-input100"></span>
                </div>
                
                <div className="container-login100-form-btn">
                  
                  <input  className="login100-form-btn" type="button" value="Login" onClick={((event)=>this.send())}  />
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