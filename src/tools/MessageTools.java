package tools;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;




public class MessageTools {
	//private static int cpt=0;
	
	public static void postMessage(String key, String text) {
		MongoClient mongo=MongoClients.create(DBStatic.mongodb_host);
		MongoDatabase mDB= mongo.getDatabase(DBStatic.mongodb_db);
		
		MongoCollection <Document> coll = mDB.getCollection("messages");
		Document d=new Document();
		d.append("message", text);
		d.append("key", key);
		String login=UserTools.getLoginUser(key);
		d.append("login", login);
		d.append("date",UserTools.getDate());
		
		coll.insertOne(d);
		/*
		Document doc=new Document();
		doc.append("key", key);
		MongoCursor<Document> list=coll.find(doc).iterator();
		while(list.hasNext()) {
			Document o=list.next();
			//System.out.println(o);
		}*/
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
						
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
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
			
			st.close();
			conn.close();
			
			MongoClient mongo=MongoClients.create(DBStatic.mongodb_host);
			MongoDatabase mDB= mongo.getDatabase(DBStatic.mongodb_db);
			
			MongoCollection <Document> coll = mDB.getCollection("messages");
			//recupere la liste des amis de mongodb
			Document doc=new Document();
			doc.append("login",new Document("$in",list_ami));
			Document date_doc=new Document();
			date_doc.put("date", -1);
			
			MongoCursor<Document> list=coll.find(doc).sort(date_doc).iterator();
			List<JSONObject> liste_json=new ArrayList<>();
			while(list.hasNext()) {
				Document o=list.next();
				//System.out.println(o);
				JSONObject temp=new JSONObject().put(o.getString("login"),o.get("message"));
				
				liste_json.add(temp);
			}
			
			JSONObject res=new JSONObject().put("message", liste_json);
			System.out.println(res);//AFFICHAGE MESSAGE
			return res;
			
		}
		catch (SQLException e1) {
			return ReturnJSON.serviceRefused("SQL ERROR", 710);
		} catch (ClassNotFoundException e) {
			return ReturnJSON.serviceRefused("Class not found", 720);
		} catch (JSONException e) {
			return ReturnJSON.serviceRefused("JSON Exception", 730);
		}
	}

	public static JSONObject listProfile(String key, String friends) {
		try {
			
			if(!CheckTools.checkUserConnected(key))
				return ReturnJSON.serviceRefused("Not connected", 0);
			
			MongoClient mongo=MongoClients.create(DBStatic.mongodb_host);
			MongoDatabase mDB= mongo.getDatabase(DBStatic.mongodb_db);
			
			MongoCollection <Document> coll = mDB.getCollection("messages");
			//recupere la liste des amis de mongodb
			Document doc=new Document();
			doc.append("login",friends);
			Document date_doc=new Document();
			date_doc.put("date", -1);
			
			MongoCursor<Document> list=coll.find().sort(date_doc).iterator();
			JSONObject res=new JSONObject();
			List<String> list_message=new ArrayList<>();
			while(list.hasNext()) {//Parcours tout les messages et ajoute les messages dans une liste
				Document o=list.next();
				System.out.println(o);
				list_message.add((String)o.get("message"));
				res.put("auteur", o.get("login"));

			}
			res.put("message", list_message);//ajoute la liste des messages dans le JSON
			return res;
			
		} catch (JSONException e) {
			return ReturnJSON.serviceRefused("SQL ERROR", 0);
		}
	}

	public static JSONObject listByQuery(String key, String query) {
		// TODO Auto-generated method stub
		return null;
	}

	public static JSONObject removeMessage(int id) {
		MongoClient mongo=MongoClients.create(DBStatic.mongodb_host);
		MongoDatabase mDB= mongo.getDatabase(DBStatic.mongodb_db);
		
		MongoCollection <Document> coll = mDB.getCollection("messages");
		
		Document d=new Document();
		d.append("_id", id);

		coll.deleteOne(d);
		return ReturnJSON.serviceAccepted();
		
	}
	
	public static JSONObject addComment(String login,String id_message,String text) {
		MongoClient mongo=MongoClients.create(DBStatic.mongodb_host);
		MongoDatabase mDB= mongo.getDatabase(DBStatic.mongodb_db);
		MongoCollection <Document> coll = mDB.getCollection("messages");
		
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
		MongoClient mongo=MongoClients.create(DBStatic.mongodb_host);
		MongoDatabase mDB= mongo.getDatabase(DBStatic.mongodb_db);
		MongoCollection <Document> coll = mDB.getCollection("messages");
		
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
		MongoClient mongo=MongoClients.create(DBStatic.mongodb_host);
		MongoDatabase mDB= mongo.getDatabase(DBStatic.mongodb_db);
		MongoCollection <Document> coll = mDB.getCollection("messages");
		
		Document doc=new Document().append("_id", id_message);
		
		Document like=new Document();
		like.append("$push",new Document().append("like", login));
			
		
		coll.updateOne(doc, like);
		return ReturnJSON.serviceAccepted();
	}
	
	public static JSONObject removeLike(String login,String id_message) {
		MongoClient mongo=MongoClients.create(DBStatic.mongodb_host);
		MongoDatabase mDB= mongo.getDatabase(DBStatic.mongodb_db);
		MongoCollection <Document> coll = mDB.getCollection("messages");
		
		Document search=new Document();
		search.append("_id",id_message);
		
		Document query=new Document();
		query.append("$pull", new Document().append("like", login));
		coll.updateOne(search,query);
		
		return ReturnJSON.serviceAccepted();
	}
}
