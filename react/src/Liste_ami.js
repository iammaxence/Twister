import React, { Component } from 'react';

class Liste_ami extends Component{
	constructor(props){
		super(props);
		this.state={liste:[{ami:'Remi Susceptible'},{ami:'Joris LECON'}]};
	}
	GoProfil(ami){
		this.props.profil(ami);
	}

	render() {
		return (
			<div>
				<h4><i>Liste des amis:</i></h4>
				{this.state.liste.map(amis => {
					return <input type="button" className="btn line-h" onClick={() => this.GoProfil(amis.ami)} value={amis.ami}/>;
				})}
			</div>
		);
	}
}


export default Liste_ami;