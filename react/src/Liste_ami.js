import React, { Component } from 'react';
import logo from './logo.svg';
//import './Liste_msg.css';

class Liste_ami extends Component{
	constructor(props){
		super(props);
		this.state={liste:[{ami:'Guillaume LETHUG'},{ami:'Joris LECON'}]};
	}
	render() {
		return (
			this.state.liste.map(amis => {
				return <Ami ami={amis.ami}/>;
			})
		);
	}
}

class Ami extends Component{
	constructor(props){
		super(props);
		this.state={ami:this.props.ami};
	}

	render() {
		return (
			<div className="Ami"> {this.state.ami} </div>
		);
	}
}

export default Liste_ami;