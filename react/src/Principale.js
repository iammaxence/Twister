import React, { Component } from 'react';
import FormulaireSaisieMessage from './FormulaireSaisieMessage.js';
import NavBar from './NavBar';

class Principale extends Component {
   constructor(props){
     super(props);
   }
  
   render(){
     return (<div className="Principale">
        <NavBar/>
        <FormulaireSaisieMessage log={this.props.log} /> 
       </div>);
   }

 }
 export default Principale;