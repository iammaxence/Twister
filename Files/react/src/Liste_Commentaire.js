import React, { Component } from 'react';
import Commentaire from './Commentaire.js';
import axios from 'axios';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';

class Liste_Commentaire extends Component{
	constructor(props){
		super(props);
		this.state={listeCom:this.props.listeCom};
	}
	send(comm){
		if(comm===''){
			alert("Need text");
		}
		else{
			const url= new URLSearchParams();
			url.append("login",this.props.login);
			url.append("id_message",this.props.id_msg);
			url.append("text",comm);
			axios.get("http://localhost:8080/Web/message/addcomment?"+url).then(res=> this.respcomm(res));
		}
	}
	respcomm(resp){
		if(resp.data["code"]){
			alert(resp.data["message"]);
		}
		else{
			console.log(this.props.login)
			console.log(this.props.autor)
			if(this.props.page==='Principale'){
				this.props.refresh();
			}
			else if(this.props.login===this.props.autor[0]){
				this.props.profil("me");
			}
			else{
				this.props.profil(this.props.autor);	
			}
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({listeCom:nextProps.listeCom});
	}

	render(){
		var temp;
		console.log(this.state.listeCom)
		if(this.state.listeCom[0].length !== 0){
			try{
				temp=this.state.listeCom[0].map(commentaires => {
							return <Commentaire commentaire={commentaires.content} deleteCom={this.props.deleteCom} autor={commentaires.author} date={commentaires.date} user={this.props.login} id_msg={this.props.id_msg}/>;
				});
			}
			catch{
				temp=this.state.listeCom.map(commentaires => {
							return <Commentaire commentaire={commentaires.content} deleteCom={this.props.deleteCom} autor={commentaires.author} date={commentaires.date} user={this.props.login} id_msg={this.props.id_msg}/>;
				});
			}
		}
		else { 
			temp=<label>Ajoutez votre commentaire</label>;
		}
		return(
			<div className="container"> 
				<div className="row topbar">
					<ul className="list-unstyled w-85">
						{temp}
					</ul>
					<div className="form-inline pt-1 w-100 ">
						<textarea className="form-control w-75" id="comm" placeholder="Commentaire"></textarea>
						<div className="w-25">
							<input className="btn green2 float-right" type="submit" value="Send" onClick={((event)=>{this.send(document.getElementById("comm").value);document.getElementById("comm").value=''})} />
						</div>
					</div>
				</div>
				<div className="pt-1" ></div>
			</div>
		);
	}
}
export default Liste_Commentaire;