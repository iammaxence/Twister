package tools;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.json.JSONObject;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

//POOLING A TRUE CAD PAS EN LOCAL UTILISE LE DATA SOURCE 
//SEARCH A FAIRE 3 CAS PAGE PRINCIPAL PROFIL OU SEARCH

public class MessageTools {//AJOUTER LA DATE ET LOGIN !!!!!!!!!!
	
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
		
		//test
		coll.insertOne(d);
		System.out.println("HERE");
		Document doc=new Document();
		doc.append("key", key);
		MongoCursor<Document> list=coll.find(doc).iterator();
		while(list.hasNext()) {
			Document o=list.next();
			System.out.println(o);
		}
	}

	public static JSONObject ListAllMessage(String key) {
		try {
			System.out.println("DEBUT");
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
				//System.out.println(rs.getString("log_friend"));
				list_ami.add(rs.getString("log_friend"));
			}
			st.close();
			conn.close();
			
			MongoClient mongo=MongoClients.create(DBStatic.mongodb_host);
			MongoDatabase mDB= mongo.getDatabase(DBStatic.mongodb_db);
			
			MongoCollection <Document> coll = mDB.getCollection("messages");
			//recupere la liste des amis de mongodb
			Document doc=new Document();
			Document d=new Document();
			d.append("$in", list_ami);
			doc.append("log_friend", d);
			//DOC LE PROBLEME 
			Document date_doc=new Document();
			date_doc.put("date", -1);
			
			MongoCursor<Document> list=coll.find(doc).sort(date_doc).iterator();
			while(list.hasNext()) {
				Document o=list.next();
				System.out.println(o);
			}
			return ReturnJSON.serviceAccepted();
			
		}
		catch (SQLException e1) {
			return ReturnJSON.serviceRefused("SQL ERROR", 0);
		} catch (ClassNotFoundException e) {
			return ReturnJSON.serviceRefused("SQL ERROR", 0);
		}
	}

	public static JSONObject ListProfile(String key, String friends) {
		
		return null;
	}

	public static JSONObject ListByQuery(String key, String query) {
		// TODO Auto-generated method stub
		return null;
	}
}
