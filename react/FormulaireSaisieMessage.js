import React, { Component } from 'react';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';
import axios from 'axios';

class FormulaireSaisieMessage extends Component {
	
	send(message){
		if(message===''){
			alert("Need message");
		}
		else{
			const url= new URLSearchParams();
			url.append("key",this.props.Ukey);
			url.append("text",message);
			//alert("http://localhost:8080/Web/auth/login?"+url);
			axios.get("http://localhost:8080/Web/message/addmessage?"+url).then(res=> this.respmessage(res));
		}
	}
	 
	respmessage(resp){
		//console.log(resp.data);
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
			url.append("friends",'');
		}
		else{
      if(this.props.owner==="me"){
        url.append("friends",this.props.user);
      }
			else{
        url.append("friends",this.props.owner);
      }
		}
    alert(this.props.page)
    alert(url);
		axios.get("http://localhost:8080/Web/message/listmessage?"+url).then(res=> this.respliste(res));
	}
	respliste(resp){
		//console.log(resp.data);
		if(resp.data["code"]){
			alert(resp.data["message"]);
		}
		else{
			this.props.refreshMsg(resp.data["messages"]);
		}
	}

	render(){
		return(
			<div className="col-md-8 offset-md-2">
				<br/>
						<div className="form-inline">
							<fieldset className="w-100 ">
								<div className="form-inline ">
									<textarea className="form-control w-85 fwhite" id="twist" rows="4"	placeholder="Let's twist again"></textarea>
									<div className="w-15"><input className="btn green2 float-right" type="submit" value="Twist" onClick={((event)=>{this.send(document.getElementById("twist").value);document.getElementById("twist").value=''})} /></div>
								</div>
							</fieldset>
						</div>
			</div>
		);
	}
}

export default FormulaireSaisieMessage;