import React, { Component } from 'react';


class Liste_Co extends Component {
   	constructor(props){
   		super(props);

   	}
   	GoProfil(ami){
		this.props.profil(ami);
	}

	render() {
		var temp;
		if(this.props.liste_co === 'empty' || this.props.liste_co === undefined ){
			temp=<label>Personne co</label>;
		}
		else { 

			temp=this.props.liste_co.map(amis => {
					return <li><input type="button" className="btn line-h" onClick={() => this.GoProfil(amis.guy)} value={amis.guy}/></li>;
				});
		}

		return (
			<div>
				<h4><i><b>Liste des connectés:</b></i></h4>
				<ul>
				{temp}
				</ul>
				
			</div>
		);
	}
}
export default Liste_Co;
