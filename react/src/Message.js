import React, { Component } from 'react';
import Commentaire from './Commentaire.js'
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';



class Message extends Component{
	constructor(props){
		super(props);
		this.state={message:this.props.message,autor:this.props.autor,date:this.props.date,listeCom:this.props.listeCom,listeLike:this.props.listeLike};

	}
	getLikes(liste){
		let map = liste.map(x => x.like);
		var reg = /,/gi;
		alert(map.toString().replace(reg,'\n'));
	}

	render() {
		return (
			<div className="Message">
				<li class="media tw_back">
					<div class="media-body pl-2">
						<div class="media">
							<div class="media-body">
								<h4 class="media-heading">{this.state.autor} <small class="float-right pr-2 pt-1"><i>{this.state.date}</i></small></h4>
									<p>{this.state.message}</p>
								    <div class="float-left">
								        <input type="button" class="btn btn-outline-success" onClick={((event)=>this.getLikes(this.state.listeLike))} value={this.state.listeLike.length}/>
								    </div>
								    <div class="float-right pr-2 pb-1">
								        <a href=""><button type="button" class="btn btn-outline-success">+</button></a>
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

/*return (
			<div className="Message"> 
				{this.state.message} 
				<div>
					{this.state.listeCom.map(commentaires => {
						return <Commentaire commentaire={commentaires.commentaire}/>;
					})}
			
				</div>
			</div>
		);*/