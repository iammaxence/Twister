package services;

import org.json.JSONObject;

import tools.CheckTools;
import tools.ReturnJSON;

public class Friends {
	
	
	/**
	 * Service permettant d'ajouter un ami
	 * @param key
	 * @param logFriend
	 * @return
	 */
	public static JSONObject addFriend(String key,String logFriend) { 
		
		if(!CheckTools.checkUserConnected(key)) 
			return ReturnJSON.serviceRefused("User Disconnected", 501);
		
		if(!CheckTools.exist(logFriend)) 
			return ReturnJSON.serviceRefused("Friend not exist", 502);

		if(CheckTools.isFriend(key, logFriend)) 
			return ReturnJSON.serviceRefused("Already friends", 503);
		
			
		//System.out.println("JE SUIS ARRIVER");
		tools.UserTools.AddFriend(key,logFriend);
			
		return ReturnJSON.serviceAccepted();
		
	}
	
	/**
	 * Service permettant de supprimer un ami
	 * @param key
	 * @param logFriend
	 * @return
	 */
	public static JSONObject removeFriend(String key,String logFriend) { 
		
		if(!CheckTools.checkUserConnected(key)) {
			return ReturnJSON.serviceRefused("User Disconnected", 601);
		}
		
		if(!CheckTools.exist(logFriend)) {
			return ReturnJSON.serviceRefused("Friend not exist", 602);
		}
		
		if(!CheckTools.isFriend(key,logFriend)) {
			return ReturnJSON.serviceRefused("NOT Friend", 603);
		}
		System.out.println("JE SUIS ARRIVER");
		tools.UserTools.RemoveFriend(key,logFriend);
			
		return ReturnJSON.serviceAccepted();
		
	}
}
