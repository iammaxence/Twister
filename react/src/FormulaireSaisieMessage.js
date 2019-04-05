import React, { Component } from 'react';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';
import axios from 'axios';

class FormulaireSaisieMessage extends Component {
  

  send(message){
     const url= new URLSearchParams();
     url.append("key",this.props.Ukey);
     url.append("text",message);
     //alert("http://localhost:8080/Web/auth/login?"+url);
     axios.get("http://localhost:8080/Web/message/addmessage?"+url).then(res=> this.respmessage(res));
     
  }


   
  respmessage(resp){
    console.log(resp.data);
    if(resp.data["code"]){
      alert(resp.data["message"]);
    }
    else{
      this.props.addMsg(resp.data);
    }
  }

  
  render(){
   return(
    <div className="col-md-4 offset-md-4">
      <br/>
          <div className="form-inline">
            <fieldset className="w-100">
              <div className="form-inline">
                <textarea className="form-control w-85" id="twist" rows="4"  placeholder="Let's twist again"></textarea>
                <div className="w-15"><input className="btn green2 float-right" type="submit" value="Twist" onClick={((event)=>this.send(document.getElementById("twist").value))} /></div>
              </div>
            </fieldset>
          </div>
    </div>
    );
  }
  
}

export default FormulaireSaisieMessage;