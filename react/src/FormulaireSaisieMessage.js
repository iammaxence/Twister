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
    <div class="col-md-4 offset-md-4">
      <br/>
          <div class="form-inline">
            <fieldset class="w-100">
              <div class="form-inline">
                <textarea class="form-control w-85" id="twist" rows="4"  placeholder="Let's twist again" required></textarea>
                <input class="btn green2" type="submit" value="Twist" onClick={((event)=>this.send(document.getElementById("twist").value))} />
              </div>
            </fieldset>
          </div>
    </div>
    );
   }
  
}

export default FormulaireSaisieMessage;