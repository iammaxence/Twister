import React, { Component } from 'react';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';
import del from './html-css/images/garbage.png';

class Commentaire extends Component{
	constructor(props){
		super(props);
		this.state={commentaire:this.props.commentaire,autor:this.props.autor,date:this.props.date,showed:true};
	}
	componentWillReceiveProps(nextProps){
		this.setState({commentaire:nextProps.commentaire,autor:nextProps.autor,date:nextProps.date,showed:true});
	}

	render() {
		//Conversion date
		var split=this.state.date.split(' ');
		var jour=split[0].split('-');
		var heure=split[1].split(':',2);
		var annee=jour[0].split('');
		var date=jour[2]+"/"+jour[1]+"/"+annee[2]+annee[3]+" "+heure[0]+":"+heure[1];
		
		var deleteB;
		//console.log(this.props.commentaire)

		if(this.props.user===this.state.autor){
			deleteB=<div className="float-right pr-2 pt-1"><input type="image" width="20px" src={del} alt="delete" onClick={(e)=>{this.props.deleteCom(this.props.id_msg,this.state.date);this.setState({showed:false})}} /></div>
		}
		else{
			deleteB='';
		}

		if(this.state.showed){
			return (
				<div className="Commentaire example-collapse-text pt-1">
					<li className="media tw_back">
						<div className="media-body pl-2">
							<div className="media">
								<div className="media-body">
									<h4 className="media-heading fs-1">{this.state.autor} <small className="float-right pr-2 pt-1"><i>{date}</i></small></h4>
									<h4><div className="float-right">{deleteB}</div></h4>
									<p className="fs-1">{this.state.commentaire}</p>
								</div>
							</div>
						</div>
					</li>	
				</div>
			);
		}
		else{
			return(<div></div>);
		}
	}
}

export default Commentaire;