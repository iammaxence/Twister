package services;

import org.json.JSONObject;

import tools.ReturnJSON;

public class User {
	
	/**
	 * Service permettant la creation d'un utilisateur
	 * @param nom
	 * @param prenom
	 * @param login
	 * @param psswd
	 * @param mail
	 * @return
	 */
	public static JSONObject createUser(String nom, String prenom, String login, String psswd, String mail) {
		
		if((login==null)||(psswd==null)||(login.equals("")||(psswd.equals("")))||(prenom==null)||(nom==null)||(prenom.equals("")||(nom.equals("")||mail.equals("")||mail==null))) {
			return (ReturnJSON.serviceRefused("Error Argument",101));
		}
		if(tools.CheckTools.exist(login))
			return (ReturnJSON.serviceRefused("user already exist",102));
		
		return tools.UserTools.insertUser(nom, prenom, login, psswd, mail);

	}
}
