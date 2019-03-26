import React, { Component } from 'react';


class FormulaireSaisieMessage extends Component {
  constructor(props){
    super(props);
    
  }

 send(){
   this.props.log();//FAIRE SET STATE SUR LA LISTE DES MESSAGES
  }
  
 render(){
     var tab;
     if(true)//liste message non vide
       tab="Voici les messages";
     return (<div className="FormulaireSaisieMessage"> <br/>
         <label htmlFor="SaisieMessage">Twist : </label>
              <input type="text" id="SaisieMessage" />
              <input type="submit" value="twister" onClick={((event)=>this.send())} />
         <p>{tab}</p>
            </div>);
   }
  
}

export default FormulaireSaisieMessage;