import React, { Component } from 'react';
import logo from './html-css/images/Logo_White.png';
import deco from './html-css/images/power-button.png';
import profil from './html-css/images/user.png';
import search from './html-css/images/search.png';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';
import axios from 'axios';

class NavBar extends Component{
	search(requete){
		alert("Marche po ¯\\_(ツ)_/¯");
	}
	profil(){
		this.props.profil("me");
	}
	deconnexion(){
		//this.props.logout();
		const url= new URLSearchParams();
		url.append("key",this.props.Ukey);
		axios.get("http://localhost:8080/Web/auth/logout?"+url).then(res=> this.resplogin(res));
	}
	resplogin(resp){
		//console.log(resp.data);
		if(resp.data["code"]){
			alert(resp.data["message"]);
		}
		else{
			this.props.logout();
		}
	}

	principale(){
		this.props.principale();
	}
	
	render(){
		return(
			<div className="container-fullwidth NavBar">
				<header>
					<nav className="navbar navbar-expand-sm navbar-dark green2 navbar-fixed-top">
						<div className="navbar-collapse collapse w-100 order-1 order-md-0">
							<ul className="navbar-nav mr-auto">
								<div className="">
									<input type="image" width="50px" alt="Logo" src={logo} onClick={((event)=>this.principale())}/>
								</div>
							</ul>
						</div>
						<div className="navbar-collapse collapse w-100 justify-content-center">
							<form className="form-inline">
								<input className="form-control mr-sm-2" id="search" type="text" placeholder="Search"/>
								<img type="image" className="cursor" width="35px" src={search} alt="search" value="Search" onClick={(event)=>this.search(document.getElementById("search").value)} />
							</form>
						</div>
						<div className="navbar-collapse collapse w-100 order-3">
							<ul className="navbar-nav ml-auto pt-1">
								<li className="nav-item">
									<div className="nav-link">
										<input className="" type="image" width="35px" src={profil} alt="Profil" value="Profil" onClick={((event)=>this.profil())}/>
									</div>
								</li>
								<li className="nav-item">
									<div className="nav-link " >
										<input className="" type="image" width="35px" src={deco} alt="Deconnexion" value="Deconnexion" onClick={((event)=>this.deconnexion())}/>
									</div>
								</li>
							</ul>
						</div>
					</nav>
				</header>
			</div>
		);
	}
}

export default NavBar;