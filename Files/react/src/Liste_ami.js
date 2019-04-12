import React, { Component } from 'react';

class Liste_ami extends Component{
	/*constructor(props){
		super(props);
		//this.state={liste:[{ami:'Remi Susceptible'},{ami:'Joris LECON'}]};
	}*/
	GoProfil(ami){
		this.props.profil(ami);
	}

	render() {
		var temp;
		//alert(this.props.liste_ami === 'empty');
		if(this.props.liste_ami === 'empty' || this.props.liste_ami === undefined ){
			temp=<label>Pas d'amis</label>;
		}
		else { 
			temp=this.props.liste_ami.map(amis => {
					return <li><input type="button" className="btn line-h" onClick={() => this.GoProfil(amis.friend)} value={amis.friend}/></li>;
			});
		}

		return (
			<div>
				<h4><i><b>Liste des amis:</b></i></h4>
				<ul>
				{temp}
				</ul>
			</div>
		);
	}
}


export default Liste_ami;