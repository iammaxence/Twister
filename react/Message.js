import React, { Component } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';
import likeB from './html-css/images/like.png';
import unlikeB from './html-css/images/unlike.png';
import del from './html-css/images/garbage.png';
import plus from './html-css/images/expand-button.png';
import moins from './html-css/images/expand-arrow.png';
import Liste_Commentaire from './Liste_Commentaire.js';
import axios from 'axios';


class Message extends Component{
	constructor(props){
		super(props);
		this.state={showed:true,message:this.props.message,autor:this.props.autor,date:this.props.date,listeCom:this.props.listeCom,listeLike:this.props.listeLike,id:this.props.id,buttonCom:false,buttonLike:false,liked:this.props.listeLike[0].includes(this.props.user),likelength:this.props.listeLike[0].length};
	}
	getCom(){
		this.setState({buttonCom: !this.state.buttonCom});
	}
	GoProfil(ami){
		this.props.profil(ami);
	}
	addLike(){
		if(this.state.liked === false){
			const url= new URLSearchParams();
			url.append("login",this.props.user);
			url.append("id_message",this.props.id);
			//alert("http://localhost:8080/Web/auth/login?"+url);
			axios.get("http://localhost:8080/Web/message/addlike?"+url).then(res=> this.resplikeadd(res));
		}
		else{
			const url= new URLSearchParams();
			url.append("login",this.props.user);
			url.append("id_message",this.props.id);
			//alert("http://localhost:8080/Web/auth/login?"+url);
			axios.get("http://localhost:8080/Web/message/removelike?"+url).then(res=> this.resplikerem(res));
		}
		this.setState({liked: !this.state.liked});
	}
	resplikeadd(resp){
		if(resp.data["code"]){
			alert(resp.data["message"]);
		}
		else{
			this.setState({likelength:this.state.likelength+1})
			this.refresh();
		}
	}
	resplikerem(resp){
		if(resp.data["code"]){
			alert(resp.data["message"]);
		}
		else{
			this.setState({likelength:this.state.likelength-1})
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
		if(nextProps.message!==this.props.message){
			this.setState({showed:true,message:nextProps.message,autor:nextProps.autor,date:nextProps.date,listeCom:nextProps.listeCom,listeLike:nextProps.listeLike,id:nextProps.id,likelength:nextProps.listeLike[0].length})
		}
	}

	render() {
		let modalClose = () => this.setState({ buttonLike: false });
		var comm;
		var likelength=this.state.likelength;
		
		if (this.state.buttonCom === true && this.state.listeCom !== null){
			comm=<Liste_Commentaire page={this.props.page} listeCom={this.props.listeCom} refresh={this.refresh.bind(this)} refreshMsg={this.props.refreshMsg} login={this.props.user} autor={this.state.autor} deleteCom={this.props.deleteCom} id_msg={this.state.id} Ukey={this.props.Ukey} profil={this.props.profil}/>;
		}
		var like='';
		//console.log(this.state.message)
		//console.log(this.state.listeLike)
		if (this.state.listeLike[0].length === 0){
			like=<label>Pas de like</label>
		}
		else{
			this.state.listeLike[0].forEach(function(item){like+=item+"\n"});
			//console.log(like)
		}
		var deleteB;
		//console.log(this.state.autor.toString())
		//console.log(this.props.user)
		if(this.state.autor.toString()===this.props.user){
			deleteB=<div className="float-right pr-2 pt-1"><input type="image" width="25px" src={del} alt="delete" onClick={(e)=>{this.props.delete(this.state.id);this.setState({showed:false})}} /></div>
		}
		else{
			deleteB=''
		}

		//Conversion date
		var split=this.state.date[0].split(' ');
		var jour=split[0].split('-');
		var heure=split[1].split(':',2);
		var annee=jour[0].split('');
		var date=jour[2]+"/"+jour[1]+"/"+annee[2]+annee[3]+" "+heure[0]+":"+heure[1];

		if(this.state.showed){
			return (
				<div className="Message">
					<li className="media tw_back">
						<div className="media-body pl-2">
							<div className="media">
								<div className="media-body">
									<h4 className="media-heading "> 
										<input type="button" className="btn pseudo pl-1" onClick={() => this.GoProfil(this.state.autor.toString())} value={this.state.autor}/> 
										{deleteB} 
										<small className="float-right pr-2 pt-2 fs-2"><i>{date}</i></small> 
									</h4>
									<p className="fs-1">{this.state.message}</p>
									<div className="float-left">
										<ButtonToolbar>
											<input type="button" className="btn btn-outline-success" onClick={() => this.setState({ buttonLike: true })} value={likelength}/>
											<input type="image" height="35px" width="35px" alt="Likes" src={this.state.liked ? unlikeB : likeB} onClick={() => this.addLike()} />
											<Modal size="sg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.buttonLike} onHide={modalClose}>
												<Modal.Header closeButton>
													<Modal.Title id="contained-modal-title-vcenter">
														Likes
												  	</Modal.Title>
												</Modal.Header>
												<Modal.Body>
												  <pre className="font">
													{like}
												  </pre>
												</Modal.Body>
												
											</Modal>
										</ButtonToolbar>
									</div>
									<div className="float-right pr-25">
										<input type="image" className="pt-4" width="20px" alt="extend" src={this.state.buttonCom ? moins : plus} onClick={((event)=>this.getCom())} aria-controls="example-collapse-text" aria-expanded={this.state.buttonCom} />
									</div>
									<div className="pt-5" >
										<Collapse in={this.state.buttonCom}>
										  <div id="example-collapse-text">
											{comm}
										  </div>
										</Collapse>
									</div>
								</div>
							</div>
						</div>
					</li>
					<br/>
				</div>
			);
		}
		else{
			return(<div></div>);
		}
	}
}

export default Message;