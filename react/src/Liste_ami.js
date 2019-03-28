import React, { Component } from 'react';
import Ami from './Ami.js';

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


export default Liste_ami;