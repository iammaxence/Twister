package services;

import org.json.JSONException;
import org.json.JSONObject;
import tools.*;
public class Auth {

	
	public Auth() {
	
	}
	/**
	 * Service permettant la connection
	 * @param login
	 * @param psswd
	 * @return
	 */
	public static JSONObject connexion(String login,String psswd) {
		if(!tools.CheckTools.exist(login)) {
			return ReturnJSON.serviceRefused("User not found",201);
		}
		
		if(!tools.CheckTools.checkPasswd(login,psswd)) {
			return ReturnJSON.serviceRefused("Error Password",202);
		}
		
		//A MODIFIER
		//StringBuilder log= tools.Login.getLoginUser(login);
		StringBuilder key=new StringBuilder().append(tools.AuthTools.insertNvlleSession(new StringBuilder(login))); //Optenir clé (qui expire)connexion
		
		if(key.length()==0) { //Si déjà connecter==longueur de la clée vide
			return ReturnJSON.serviceRefused("Already Connected", 203);
		}
		else { //Sinon la connexion est réussite
			JSONObject js= new JSONObject();
			try {
				js.put("Login", login);
				js.put("Key", key);
			} catch (JSONException e) {
				return ReturnJSON.serviceRefused("JSON Error", 204);
			}
			return js;
		}
	}
	
	/**
	 * Service permettant la deconnection
	 * @param key
	 * @return
	 */
	public static JSONObject deconnexion(String key) {
		if(!tools.UserTools.connected(key))
			return ReturnJSON.serviceRefused("User already disconnected", 601);
		tools.AuthTools.deconnexion(key);
		return ReturnJSON.serviceAccepted();	
	}
}
