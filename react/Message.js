import React, { Component } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';
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
	    }
	}
	resplikerem(resp){
	    if(resp.data["code"]){
	      alert(resp.data["message"]);
	    }
	    else{
	      this.setState({likelength:this.state.likelength-1})
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
			comm=<Liste_Commentaire listeCom={this.props.listeCom} refreshMsg={this.props.refreshMsg} login={this.props.user} id_msg={this.state.id} Ukey={this.props.Ukey} />;
		}
		var like='';
		//console.log(this.state.message)
		//console.log(this.state.listeLike)
		if (this.state.listeLike === null || this.state.listeLike === undefined){
			like=<label>Pas de like</label>
		}
		else{
			this.state.listeLike[0].forEach(function(item){like+=item+"\n"});
			//console.log(like)
		}
		if(this.state.showed){
			return (
				<div className="Message">
					<li className="media tw_back">
						<div className="media-body pl-2">
							<div className="media">
								<div className="media-body">
									<h4 className="media-heading "> <input type="button" className="btn pseudo pl-1" onClick={() => this.GoProfil(this.state.autor.toString())} value={this.state.autor}/> <div className="float-right pr-2 pt-1"><input type="button" className=" btn btn-outline-success" onClick={(e)=>{this.props.delete(this.state.id);this.setState({showed:false})}} value="X"/></div><small className="float-right pr-2 pt-2"><i>{this.state.date}</i></small> </h4>
									<p>{this.state.message}</p>
								    <div className="float-left">
								        
								        <ButtonToolbar>
									        <input type="button" className="btn btn-outline-success" onClick={() => this.setState({ buttonLike: true })} value={likelength}/>
									        <input type="button" className="btn btn-outline-success" onClick={() => this.addLike()} value={this.state.liked ? "Unlike" : "Like"}/>
									        <Modal size="sg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.buttonLike} onHide={modalClose} listeLike={this.state.listeLike}>
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
								    <div className="float-right pr-2 pb-1">
								        <input type="button" className="btn btn-outline-success" onClick={((event)=>this.getCom())} aria-controls="example-collapse-text" aria-expanded={this.state.buttonCom} value="+"/>
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