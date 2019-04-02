import React, { Component } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';
import Liste_Commentaire from './Liste_Commentaire.js';



class Message extends Component{
	constructor(props){
		super(props);
		this.state={message:this.props.message,autor:this.props.autor,date:this.props.date,listeCom:this.props.listeCom,listeLike:this.props.listeLike,buttonCom:false,buttonLike:false,liked:false};

	}
	getCom(){
		this.setState({buttonCom: !this.state.buttonCom});
	}
	GoProfil(ami){
		this.props.profil(ami);
	}
	addLike(){
		this.setState({liked: !this.state.liked});
		//Add like in liste
	}

	render() {
		let modalClose = () => this.setState({ buttonLike: false });
		var comm;

		if (this.state.buttonCom === true){
			comm=<Liste_Commentaire listeCom={this.props.listeCom}/>;
		}

		return (
			<div className="Message">
				<li className="media tw_back">
					<div className="media-body pl-2">
						<div className="media">
							<div className="media-body">
								<h4 className="media-heading "> <input type="button" className="btn pseudo pl-1" onClick={() => this.GoProfil(this.state.autor)} value={this.state.autor}/> <small className="float-right pr-2 pt-2"><i>{this.state.date}</i></small></h4>
								<p>{this.state.message}</p>
							    <div className="float-left">
							        
							        <ButtonToolbar>
								        <input type="button" className="btn btn-outline-success" onClick={() => this.setState({ buttonLike: true })} value={this.state.listeLike.length}/>
								        <input type="button" className="btn btn-outline-success" onClick={() => this.addLike()} value={this.state.liked ? "Unlike" : "Like"}/>
								        <Modal size="sg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.buttonLike} onHide={modalClose} listeLike={this.props.listeLike}>
								        	<Modal.Header closeButton>
								        		<Modal.Title id="contained-modal-title-vcenter">
									            	Likes
									          	</Modal.Title>
									        </Modal.Header>
									        <Modal.Body>
									          <p>
									            {this.props.listeLike.map(likes => {
													return <div>{likes.like}<br/></div>;
												})}
									          </p>
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
}

export default Message;