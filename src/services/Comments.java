package services;

import org.json.JSONObject;

import tools.CheckTools;
import tools.MessageTools;
import tools.ReturnJSON;

public class Comments {
	public Comments() {}
	
	
	/**
	 * Service permettant de poster un commentaire
	 * @param key
	 * @param text
	 * @return
	 */
	public static JSONObject postComment(String login,String id_message,String text) {
		if(!CheckTools.alreadyConnected(new StringBuilder(login)))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 401);
		
		tools.MessageTools.addComment(login, id_message, text);
		return ReturnJSON.serviceAccepted();
	}
	
	/**
	 * Service pour retirer un commentaire
	 * @param login
	 * @param id_message
	 * @param id_comment
	 * @return
	 */
	public static JSONObject removeComment(String login,String id_message,String id_comment) {
		if(!CheckTools.alreadyConnected(new StringBuilder(login)))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 401);
		
		return MessageTools.removeComment(login, id_message, id_comment);
	}

	
}
