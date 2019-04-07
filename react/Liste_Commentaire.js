import React, { Component } from 'react';
import Commentaire from './Commentaire.js';
import axios from 'axios';

class Liste_Commentaire extends Component{
	constructor(props){
		super(props);
		this.state={listeCom:this.props.listeCom};
	}
	send(comm){
		const url= new URLSearchParams();
    	url.append("login",this.props.login);
    	url.append("id_message",this.props.id_msg);
    	url.append("text",comm);
    	axios.get("http://localhost:8080/Web/message/addcomment?"+url).then(res=> this.respcomm(res));
	}
	respcomm(resp){
		if(resp.data["code"]){
	      alert(resp.data["message"]);
	    }
	    else{
      		this.refresh();
    	}
  	}

	refresh(){
		const url= new URLSearchParams();
		url.append("key",this.props.Ukey);
		url.append("query",'');
		if(this.props.page === "Principale"){
			url.append("friends",this.props.liste_ami);
		}
		else{
	    	url.append("friends",'');
	    }
	    axios.get("http://localhost:8080/Web/message/listmessage?"+url).then(res=> this.respliste(res));
	}
  	respliste(resp){
	    if(resp.data["code"]){
	    	alert(resp.data["message"]);
	    }
	    else{
	    	this.props.refreshMsg(resp.data["messages"]);
	    }
  	}
  	componentWillReceiveProps(nextProps){
  		this.setState({listeCom:nextProps.listeCom});
  	}

	render(){
		var temp;
		console.log(this.state.listeCom[0])
		if(this.state.listeCom[0].length !== 0){
			temp=this.state.listeCom[0].map(commentaires => {
							return <Commentaire commentaire={commentaires.content} autor={commentaires.author} date={commentaires.date}/>;
						});
		}
		else { 
			temp=<label>Ajoutez votre commentaire</label>;
		}
		return(
			<div className="container"> 
				<div className="row">
					<div className="botbar"></div>
					<ul className="list-unstyled w-75">
						{temp}
					</ul>
					
					<div className="form-inline pt-1 w-100">
		                <textarea className="form-control w-75" id="comm" placeholder="Commentaire"></textarea>
		                <div className="w-15">
		                	<input className="btn green2 float-right" type="submit" value="Send" onClick={((event)=>this.send(document.getElementById("comm").value))} />
		                </div>
		            </div>
				</div>
				<div className="pt-1" ></div>
			</div>
		)
	}
}
export default Liste_Commentaire;