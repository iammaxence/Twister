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
        <div className="container-fullwidth NavBar">
          <header>
            <nav className="navbar navbar-expand-sm navbar-dark green1 navbar-fixed-top">
              <div className="navbar-collapse collapse w-100 order-1 order-md-0">
                <ul className="navbar-nav mr-auto">
                  <div className="">
                    <input type="image" width="50px" alt="Logo" src={logo} onClick={((event)=>this.principale())}/>
                  </div>
                </ul>
              </div>

              <div className="navbar-collapse collapse w-100 justify-content-center">       
                <form className="form-inline">
                  <input className="form-control mr-sm-2" id="search" type="text" placeholder="Search" required/>
                  <input className="btn white" type="button" value="Search" onClick={((event)=>this.search(document.getElementById("search").value))}/>
                </form>
              </div>

              <div className="navbar-collapse collapse w-100 order-3">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <div className="nav-link">
                      <input className="btn brown1" type="button" value="Profil" onClick={((event)=>this.profil())}/>
                    </div>
                  </li>

                  <li className="nav-item">
                    <div className="nav-link" >  
                      <input className="btn brown1" type="button" value="Deconnexion" onClick={((event)=>this.deconnexion())}/>
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