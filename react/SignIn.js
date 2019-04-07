import React, { Component } from 'react';
import './html-css/css/bootstrap.min.css';
import './html-css/fonts/font-awesome-4.7.0/css/font-awesome.css';
import './html-css/css/util.css';
import './html-css/css/enregistrement.css';
import axios from 'axios';

class SignIn extends Component {
	
	send(){
		if(this.refs.pass.value === this.refs.repeat.value){
			const url= new URLSearchParams();
			var prenom=this.refs.prenom.value;
			var nom=this.refs.nom.value;
			var login=this.refs.login.value;
			var mail=this.refs.email.value;
			var password=this.refs.pass.value;
			url.append("prenom",prenom);
			url.append("nom",nom);
			url.append("login",login);
			url.append("mail",mail);
			url.append("password",password);
			axios.get("http://localhost:8080/Web/user/create?"+url).then(res=> this.resplogin(res));
		}
		else{
			alert("Password doesn't match");
		}
	}
	
	resplogin(resp){
		if(resp.data["code"]){
			alert(resp.data["message"]);
		}
		else{
			alert("Account created");
			this.props.logout();
		}
	}

	cancel(){
		this.props.logout();
	}
	
	render(){
		return (
			<div className="limiter">
				<div className="container-login100 justify-content-center">
					<div className="wrap-enreg justify-content-center">
						<div className="login100-form validate-form "onKeyPress= {(e) => {if(e.key === 'Enter'){this.send()}}}>
							<span className="login100-form-title">
								Create Account
							</span>

							<div className="wrap-input100 validate-input" >
								<input className="input100" type="text" ref="prenom" placeholder="Prenom" required />
								<span className="focus-input100"></span>
							</div>

							<div className="wrap-input100 validate-input" >
								<input className="input100" type="text" ref="nom" placeholder="Nom" required />
								<span className="focus-input100"></span>
							</div>

							<div className="wrap-input100 validate-input" >
								<input className="input100" type="text" ref="login" placeholder="Login" required />
								<span className="focus-input100"></span>
							</div>

							<div className="wrap-input100 validate-input" >
								<input className="input100" type="mail" ref="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Must be an email" required />
								<span className="focus-input100"></span>
							</div>

							<div className="wrap-input100 validate-input">
								<input className="input100" type="password" ref="pass" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required />	
								<span className="focus-input100"></span>
							</div>

							<div className="wrap-input100 validate-input">
								<input className="input100" type="password" ref="repeat" placeholder="Repeat Password" required />
								<span className="focus-input100"></span>
							</div>
							
							<div className="container-login100-form-btn">
								<input className="login100-form-btn w-50" type="submit" value="Register" onClick={((event)=>this.send())} />
								<input className="login100-form-btn w-50" type="button" value="cancel" onClick={((event)=>this.cancel())} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SignIn;