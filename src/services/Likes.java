package services;

import org.json.JSONObject;

import tools.CheckTools;
import tools.ReturnJSON;

public class Likes {
	public Likes() {}
	
	public static JSONObject addLike(String login,String id_message) {
		if(!CheckTools.alreadyConnected(new StringBuilder(login)))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 401);
		
		tools.MessageTools.addLike(login, id_message);
		return ReturnJSON.serviceAccepted();
	}
	
	public static JSONObject removeLike(String login,String id_message) {
		if(!CheckTools.alreadyConnected(new StringBuilder(login)))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 401);
		
		tools.MessageTools.removeLike(login, id_message);
		return ReturnJSON.serviceAccepted();
	}
}
