import React, { Component } from 'react';


class FormulaireSaisieMessage extends Component {
  constructor(props){
    super(props);
    
  }

 send(){
   this.props.login();//FAIRE SET STATE SUR LA LISTE DES MESSAGES
  }
  
 render(){
  return(
    <div class="m-auto">
      <br/>
        <form>
          <div class="form-inline">
            <fieldset>
              <textarea class="form-control" id="" rows="4" cols="60" placeholder="Let's twist again"></textarea>
              <input class="btn green2" type="submit" value="Twist" onClick={((event)=>this.send())} />
            </fieldset>
          </div>
        </form>
    </div>
    );
   }
  
}

export default FormulaireSaisieMessage;