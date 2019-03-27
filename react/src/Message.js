import React, { Component } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';
import Liste_Commentaire from './Liste_Commentaire.js';



class Message extends Component{
	constructor(props){
		super(props);
		this.state={message:this.props.message,autor:this.props.autor,date:this.props.date,listeCom:this.props.listeCom,listeLike:this.props.listeLike,buttonCom:false,buttonLike:false};

	}
	getLikes(liste){
		let map = liste.map(x => x.like);
		var reg = /,/gi;

		return map.toString().replace(reg,'\n');
	}

	getCom(){
		this.setState({buttonCom: !this.state.buttonCom});
	}
	handleClose() {
    	this.setState({ buttonLike: false });
  	}

  	handleShow() {
  	  this.setState({ buttonLike: true });
 	}

	render() {
		var comm;

		if (this.state.buttonCom === true){
			comm=<Liste_Commentaire listeCom={this.props.listeCom}/>
		}

		return (
			<div className="Message">
				<li class="media tw_back">
					<div class="media-body pl-2">
						<div class="media">
							<div class="media-body">
								<h4 class="media-heading ">{this.state.autor} <small class="float-right pr-2 pt-1"><i>{this.state.date}</i></small></h4>
									<p>{this.state.message}</p>
								    <div class="float-left">
								        <input type="button" class="btn btn-outline-success" onClick={((event)=>this.handleShow)} value={this.state.listeLike.length}/>
								        <Modal show={this.state.buttonLike} aria-labelledby="contained-modal-title-vcenter" size="lg" onHide={this.handleClose}>
								          <Modal.Header closeButton>
								            <Modal.Title>Likes</Modal.Title>
								          </Modal.Header>
								          <Modal.Body>{this.getLikes(this.state.listeLike)}</Modal.Body>
								          <Modal.Footer>
								            <Button variant="primary" onClick={this.handleClose}>
								              Close
								            </Button>
								          </Modal.Footer>
								        </Modal>
								    </div>
								    <div class="float-right pr-2 pb-1">
								        <input type="button" class="btn btn-outline-success" onClick={((event)=>this.getCom())} aria-controls="example-collapse-text" aria-expanded={this.state.buttonCom} value="+"/>
								    </div>
							</div>
						</div>
					</div>
				</li>
				<br/>
				<Collapse in={this.state.buttonCom}>
		          <div id="example-collapse-text">
		            {comm}
		          </div>
		        </Collapse>
		        
			</div>
		);
	}
}

export default Message;