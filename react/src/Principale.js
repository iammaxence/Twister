import React, { Component } from 'react';
import FormulaireSaisieMessage from './FormulaireSaisieMessage.js';
import NavBar from './NavBar';
import Liste_msg from './Liste_msg';
import Liste_ami from './Liste_ami';

class Principale extends Component {
   constructor(props){
     super(props);
   }
  
   render(){
     return (
     	<div className="Principale">
     		<NavBar logout={this.props.logout}/>

     		<div class="row">
				<div class="column left green0">
					<Liste_ami liste_ami={this.props.liste_ami}/>
				</div>

			<div class="column right">
				<div class="row">
					<FormulaireSaisieMessage login={this.props.login} /> 

					<div class="container-fluid">
						<br/>
					</div>

					<Liste_msg/>
					
				</div>
			</div>
		</div>
	        
	        
	        
       </div>);
   }

 }
 export default Principale;

 /*<div class="container"> 
						<div class="m-auto">
							<ul class="list-unstyled">
							  <li class="media tw_back">
							    <div class="media-body pl-2">
								    <div class="media">
								        <div class="media-body">
								          <h4 class="media-heading">Joris Lecon <small><i>Posted on February 19, 2019</i></small></h4>
								          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								          <div class="float-left">
								          	<a href=""><button type="button" class="btn btn-outline-success">10</button></a>
								          </div>
								          <div class="float-right pr-2 pb-1">
								          	<a href=""><button type="button" class="btn btn-outline-success">+</button></a>
								          </div>
								        </div>
								    </div>
								</div>
							  </li>
							  <p></p>
							</ul>
						</div>
					</div>*/