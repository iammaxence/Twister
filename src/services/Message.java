package services;


import org.json.JSONObject;

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
		if(!tools.UserTools.connected(key))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 401);
		
		tools.MessageTools.postMessage(key, text);
		return ReturnJSON.serviceAccepted();
	}
	
	public static JSONObject listMessage(String key, String query ,String friends) {
		if(!tools.UserTools.connected(key))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 701);
		if(query!=null && friends==null)
			return MessageTools.ListByQuery(key,query);
		if(friends!=null && query==null)
			return MessageTools.ListProfile(key,friends);
		return MessageTools.ListAllMessage(key);
	}
	
	public static JSONObject removeMessage(String key,int id) {
		if(!tools.UserTools.connected(key))
			return ReturnJSON.serviceRefused("USER DISCONNECTED", 401);
		
		return MessageTools.RemoveMessage(key,id);
	}

	
}
