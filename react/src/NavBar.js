import React, { Component } from 'react';
import logo from './html-css/images/Twister.png';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';
import Logout from './Logout.js';

class NavBar extends Component{
  constructor(props){
    super(props);
  }
  search(requete){
    alert(requete);
  }
  profil(){

  }
  deconnexion(){
    this.props.logout();
  }

  principal(){

  }
  
  render(){
    //A L'ATTENTION DE MAXENCE LA DIV 110 ET LE WIDTH PERMET DAVOIR LA BONNE TAILLE DU LOGO
      return(
        <div class="container-fullwidth" className="NavBar">
          <header>
            <nav class="navbar navbar-expand-sm navbar-dark green1 navbar-fixed-top">
              <div class="navbar-collapse collapse w-100 order-1 order-md-0">
                <ul class="navbar-nav mr-auto">
                  <div class="110">
                    <input type="image" width="110px" src={logo} onClick={((event)=>this.principal())}/>
                  </div>
                </ul>
              </div>

              <div class="navbar-collapse collapse w-100 justify-content-center">       
                <form class="form-inline" action="">
                  <input class="form-control mr-sm-2" id="search" type="text" placeholder="Search"/>
                  <input class="btn white" type="button" value="Search" onClick={((event)=>this.search(document.getElementById("search").value))}/>
                </form>
              </div>

              <div class="navbar-collapse collapse w-100 order-3">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <div class="nav-link">
                      <input class="btn brown1" type="button" value="Profil" onClick={((event)=>this.profil())}/>
                    </div>
                  </li>

                  <li class="nav-item">
                    <div class="nav-link" >  
                      <input class="btn brown1" type="button" value="Deconnexion" onClick={((event)=>this.deconnexion())}/>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </div>
      );
            
   }
}

export default NavBar;