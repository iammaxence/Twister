package tools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

public class MessageTools {
	
	public static JSONObject postMessage(String key, String text) {
		
		MongoCollection <Document> coll = Database.getMongocollection("messages");
		Document d=new Document();
		d.append("message", text);
		d.append("key", key);
		String login=UserTools.getLoginUser(key);
		d.append("login", login);
		d.append("date",UserTools.getDate());
		d.append("listeLike", null);
		d.append("listeCom", null);
		JSONObject res=new JSONObject();
		try {
			res.append("message", text);
			res.append("login", login);
			res.append("date",UserTools.getDate());
			res.append("listeLike", null);
			res.append("listeCom", null);
		} catch (JSONException e) {
		
			e.printStackTrace();
		}
		
		coll.insertOne(d);
		
		return res;
	}
	
	/*public static void postMessage(String key, String text) {
		MongoClient mongo=MongoClients.create(DBStatic.mongodb_host);
		MongoDatabase mDB= mongo.getDatabase(DBStatic.mongodb_db);
		
		MongoCollection <Document> coll = mDB.getCollection("messages");
		Document d=new Document();
		d.append("message", text);
		d.append("key", key);
		String login=UserTools.getLoginUser(key);
		d.append("login", login);
		d.append("date",UserTools.getDate());
		d.append("id", cpt++);
		
		coll.insertOne(d);
		Document doc=new Document();
		doc.append("key", key);
			MongoCursor<Document> list=coll.find(doc).iterator();
			while(list.hasNext()) {
				Document o=list.next();
				System.out.println(o);
			}
		}*/

	public static JSONObject listAllMessage(String key) {
		try {
						
			
			Connection conn= Database.getMySQLConnection();
			String login=UserTools.getLoginUser(key);//login de l'utilisateur
			
			String query="SELECT * FROM friends WHERE friends.log_user='"+login+"'";
			
			List<String> list_ami= new ArrayList<>(); 
			
			//System.out.println(query);
			Statement st=conn.createStatement();
			ResultSet rs;
			
			rs = st.executeQuery(query);
			while(rs.next()) {
				list_ami.add(rs.getString("log_friend"));
			}
			list_ami.add(login);//ON AJOUTE LUI MEME POUR AFFICHER SES PROPRES MESSAGES
			//System.out.println(list_ami);
			rs.close();
			st.close();
			conn.close();
			
			MongoCollection <Document> coll = Database.getMongocollection("messages");
			//recupere la liste des amis de mongodb
			Document doc=new Document();
			doc.append("login",new Document("$in",list_ami));
			Document date_doc=new Document();
			date_doc.put("date", -1);
			
			MongoCursor<Document> list=coll.find(doc).sort(date_doc).iterator();
			//List<JSONObject> liste_json=new ArrayList<>();
			JSONObject res=new JSONObject();
			while(list.hasNext()) {
				Document o=list.next();
				//System.out.println(o);
				
				JSONObject temp=new JSONObject();
				temp.append("message",o.get("message"));
				temp.append("login", o.getString("login"));
				temp.append("date", o.getString("date"));
				temp.append("listeLike", o.getString("listeLike"));
				temp.append("listeCom", o.getString("listeCom"));
				temp.append("id", o.get("_id"));
				res.append("messages", temp);
			}
			
			
			System.out.println(res);//AFFICHAGE MESSAGE
			return res;
			
		}
		catch (SQLException e1) {
			return ReturnJSON.serviceRefused("SQL ERROR", 110);
		} catch (JSONException e) {
			return ReturnJSON.serviceRefused("JSON ERROR", 120);
		}
	}

	public static JSONObject listProfile(String key, String friends) {
		try {
			
			if(!CheckTools.checkUserConnected(key))
				return ReturnJSON.serviceRefused("Not connected", 0);
			
			MongoCollection <Document> coll = Database.getMongocollection("messages");
			//recupere la liste des amis de mongodb
			Document doc=new Document();
			doc.append("login",friends);
			Document date_doc=new Document();
			date_doc.put("date", -1);
			
			MongoCursor<Document> list=coll.find().sort(date_doc).iterator();
			JSONObject res=new JSONObject();
			//List<String> list_message=new ArrayList<>();
			while(list.hasNext()) {//Parcours tout les messages et ajoute les messages dans une liste
				Document o=list.next();
				//System.out.println(o);
				
				JSONObject temp=new JSONObject();
				temp.append("message",o.get("message"));
				temp.append("login", o.getString("login"));
				temp.append("date", o.getString("date"));
				temp.append("listeLike", o.getString("listeLike"));
				temp.append("listeCom", o.getString("listeCom"));
				res.append("messages", temp);

			}
			res.put("message", res);//ajoute la liste des messages dans le JSON
			return res;
			
		} catch (JSONException e) {
			return ReturnJSON.serviceRefused("SQL ERROR", 110);
		}
	}

	public static JSONObject listByQuery(String key, String query) {
		// TODO Auto-generated method stub
		return null;
	}

	public static JSONObject removeMessage(String id) {
		MongoCollection <Document> coll = Database.getMongocollection("messages");
		
		Document d=new Document();
		d.append("id", id);
		System.out.println(d.toString());
		coll.deleteOne(d);
		return ReturnJSON.serviceAccepted();
		
	}
	
	public static JSONObject addComment(String login,String id_message,String text) {
		MongoCollection <Document> coll = Database.getMongocollection("messages");
		
		Document doc=new Document().append("_id", id_message);
		
		Document comm=new Document();
		comm.append("author", login);
		comm.append("content", text);
		comm.append("date", UserTools.getDate());
			
		Document add=new Document().append("$push", new Document().append("comments", comm));
		coll.updateOne(doc, add);
		return ReturnJSON.serviceAccepted();
	}
	
	public static JSONObject removeComment(String login,String id_message,String id_comment) {
		MongoCollection <Document> coll = Database.getMongocollection("messages");
		
		Document search=new Document();
		search.append("_id",id_message);
		
		Document comm=new Document();
		comm.append("_id",id_comment);
		
		Document query=new Document();
		query.append("$pull", new Document().append("comments", comm));
		coll.updateOne(search,query);
		
		return ReturnJSON.serviceAccepted();
	}
	
	public static JSONObject addLike(String login,String id_message) {
		MongoCollection <Document> coll = Database.getMongocollection("messages");
		
		Document doc=new Document().append("_id", id_message);
		
		Document like=new Document();
		like.append("$push",new Document().append("like", login));
			
		
		coll.updateOne(doc, like);
		return ReturnJSON.serviceAccepted();
	}
	
	public static JSONObject removeLike(String login,String id_message) {
		MongoCollection <Document> coll = Database.getMongocollection("messages");
		
		Document search=new Document();
		search.append("_id",id_message);
		
		Document query=new Document();
		query.append("$pull", new Document().append("like", login));
		coll.updateOne(search,query);
		
		return ReturnJSON.serviceAccepted();
	}
}
