import React, { Component } from 'react';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';

class FormulaireSaisieMessage extends Component {
  constructor(props){
    super(props);
    
  }

 send(){
   //FAIRE SET STATE SUR LA LISTE DES MESSAGES
  }
  
 render(){
  return(
    <div className="col-md-4 offset-md-4">
      <br/>
          <div className="form-inline">
            <fieldset className="w-100">
              <div className="form-inline">
                <textarea className="form-control w-85" id="twist" rows="4"  placeholder="Let's twist again" required></textarea>
                <div className="w-15"><input className="btn green2 float-right" type="submit" value="Twist" onClick={((event)=>this.send(document.getElementById("twist").value))} /></div>
              </div>
            </fieldset>
          </div>
    </div>
    );
   }
  
}

export default FormulaireSaisieMessage;