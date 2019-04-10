package services;

import org.json.JSONException;
import org.json.JSONObject;

import tools.CheckTools;
import tools.MessageTools;
import tools.ReturnJSON;
import tools.UserTools;

public class Message {
	public Message() {}
	
	
	/**
	 * Service permettant de poster un message
	 * @param key
	 * @param text
	 * @return
	 */
	public static JSONObject postMessage(String key, String text) {
		if(!CheckTools.alreadyConnected(new StringBuilder(UserTools.getLoginUser(key))))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 401);
		
		return tools.MessageTools.postMessage(key, text);
		//return ReturnJSON.serviceAccepted();
	}
	
	/**
	 * Service pour lister les messages
	 * @param key
	 * @param query
	 * @param friends
	 * @return
	 */
	public static JSONObject listMessage(String key, String query ,String friends) {
		if(!CheckTools.alreadyConnected(new StringBuilder(UserTools.getLoginUser(key))))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 701);
		if(!query.isEmpty() && friends.isEmpty())
			try {
				return MessageTools.listByQuery(key,query);
			} catch (JSONException e) {
				return ReturnJSON.serviceRefused("ERROR JSON", 0);
			}
		else if(!friends.isEmpty() && query.isEmpty())
			return MessageTools.listProfile(key,friends);
		else
			return MessageTools.listAllMessage(key);
	}
	
	/**
	 * Service pour enlever un message
	 * @param key
	 * @param id
	 * @return
	 */
	public static JSONObject removeMessage(String key,String id) {
		if(!CheckTools.alreadyConnected(new StringBuilder(UserTools.getLoginUser(key))))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 402);
		
		return MessageTools.removeMessage(id);
	}

	
}
