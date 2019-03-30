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
		this.state={message:this.props.message,autor:this.props.autor,date:this.props.date,listeCom:this.props.listeCom,listeLike:this.props.listeLike,buttonCom:false,buttonLike:false};

	}
	getCom(){
		this.setState({buttonCom: !this.state.buttonCom});
	}

	render() {
		let modalClose = () => this.setState({ buttonLike: false });
		var comm;

		if (this.state.buttonCom === true){
			comm=<Liste_Commentaire listeCom={this.props.listeCom}/>;
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
							        
							        <ButtonToolbar>
								        <input type="button" class="btn btn-outline-success" onClick={() => this.setState({ buttonLike: true })} value={this.state.listeLike.length}/>
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
							    <div class="float-right pr-2 pb-1">
							        <input type="button" class="btn btn-outline-success" onClick={((event)=>this.getCom())} aria-controls="example-collapse-text" aria-expanded={this.state.buttonCom} value="+"/>
							    </div>
								<div class="pt-5" >
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