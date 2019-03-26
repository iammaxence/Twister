class MainPage extends React.Component {
	constructor(props){
		super(props);
		this.state={connected:false,page:"Register"};
    this.getConnected = this.getConnected.bind(this);
    this.setLogout = this.setLogout.bind(this);
	}

  getConnected(){
    this.setState({connected:true,page:"Principale"});
  }
  setLogout(){
    this.setState({connected:false,page:"Login"});
  }
  
	render(){
		return(
			<div className="MainPage">
				<NavigationPannel login={this.getConnected} logout={this.setLogout} connected={this.state.connected}/> 
        
		 	 </div>);
	}
  
}

class NavigationPannel extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="NaviagtionPannel">
        BlablablaNavigationPannel
        <nav>
          {this.props.connected ? <Login login={this.props.login}/> : <Logout logout={this.props.logout}/>}
        </nav>
      </div>);
  }
}

 class Principale extends React.Component {
   constructor(props){
     super(props);
   }
   render(){
     return (<div className="Principale"> {this.setLogout()} </div>);
   }
 }

 class Login extends React.Component {
   constructor(props){
     super(props);
   }
   render(){
     return (<div className="Login">logbla</div>);
   }
 }
class Logout extends React.Component {
   constructor(props){
     super(props);
   }
   render(){
     return (
       <div className="Logout">
         <input type="submit" value="envoyer"/>
       </div>);
   }
 }

class SignIn extends React.Component{
  constructor(props){
     super(props);
   }
   render(){
    return (
      <div className="SignIn">
        Enregistrement
      </div>
    )
   }
  
}

// ========================================

ReactDOM.render(
  <MainPage />,
  document.getElementById('root')
);
