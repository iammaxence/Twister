import React, { Component } from 'react';
import logo from './html-css/images/Logo_White.png';
import './html-css/css/bootstrap.min.css';
import './html-css/css/style.css';

class NavBar extends Component{
  constructor(props){
    super(props);
  }
  search(requete){
    alert(requete);
  }
  profil(){
    this.props.profil("me");
  }
  deconnexion(){
    this.props.logout();
  }

  principale(){
    this.props.principale();
  }
  
  render(){
      return(
        <div class="container-fullwidth" className="NavBar">
          <header>
            <nav class="navbar navbar-expand-sm navbar-dark green1 navbar-fixed-top">
              <div class="navbar-collapse collapse w-100 order-1 order-md-0">
                <ul class="navbar-nav mr-auto">
                  <div class="">
                    <input type="image" width="50px" alt="Logo" src={logo} onClick={((event)=>this.principale())}/>
                  </div>
                </ul>
              </div>

              <div class="navbar-collapse collapse w-100 justify-content-center">       
                <form class="form-inline">
                  <input class="form-control mr-sm-2" id="search" type="text" placeholder="Search" required/>
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