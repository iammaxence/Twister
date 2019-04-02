package services;

import org.json.JSONObject;

import tools.CheckTools;
import tools.MessageTools;
import tools.ReturnJSON;

public class Message {
	public Message() {}
	
	
	/**
	 * Service permettant de poster un message
	 * @param key
	 * @param text
	 * @return
	 */
	public static JSONObject postMessage(String key, String text) {
		if(!CheckTools.checkUserConnected(key))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 401);
		
		tools.MessageTools.postMessage(key, text);
		return ReturnJSON.serviceAccepted();
	}
	
	/**
	 * Service pour lister les messages
	 * @param key
	 * @param query
	 * @param friends
	 * @return
	 */
	public static JSONObject listMessage(String key, String query ,String friends) {
		if(!CheckTools.checkUserConnected(key))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 701);
		if(query!=null && friends==null)
			return MessageTools.listByQuery(key,query);
		if(friends!=null && query==null)
			return MessageTools.listProfile(key,friends);
		return MessageTools.listAllMessage(key);
	}
	
	/**
	 * Service pour enlever un message
	 * @param key
	 * @param id
	 * @return
	 */
	public static JSONObject removeMessage(String key,int id) {
		if(!CheckTools.checkUserConnected(key))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 402);
		
		return MessageTools.removeMessage(id);
	}

	
}
