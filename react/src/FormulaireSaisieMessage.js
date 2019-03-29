import React, { Component } from 'react';


class FormulaireSaisieMessage extends Component {
  constructor(props){
    super(props);
    
  }

 send(){
   //FAIRE SET STATE SUR LA LISTE DES MESSAGES
  }
  
 render(){
  return(
    <div class="m-auto">
      <br/>
        <form>
          <div class="form-inline">
            <fieldset>
              <div class="form-group">
                <textarea class="form-control" id="" rows="4" cols="60" placeholder="Let's twist again"></textarea>
                <input class="btn green2" type="submit" value="Twist" onClick={((event)=>this.send())} />
              </div>
              
            </fieldset>
          </div>
        </form>
    </div>
    );
   }
  
}

export default FormulaireSaisieMessage;