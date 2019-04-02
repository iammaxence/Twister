package tools;


import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import org.json.JSONObject;

public class UserTools {

	/**
	 * créer un user dans la BD
	 * @param nom
	 * @param prenom
	 * @param login
	 * @param psswd
	 * @param mail
	 * @return
	 */
	public static JSONObject insertUser(String nom, String prenom, String login, String psswd, String mail) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			String query="INSERT INTO user VALUES ('"+login+"','"+psswd+"','"+prenom+"','"+nom+"','"+mail+"')";
			//System.out.println(query);
			Statement st=conn.createStatement();
			int rs=st.executeUpdate(query);
			st.close();
			conn.close();
			if(rs==0)
				return tools.ReturnJSON.serviceRefused("Failed creating user",103);
			return tools.ReturnJSON.serviceAccepted();
		}
		catch (SQLException s) {
			return tools.ReturnJSON.serviceRefused("Failed creating user DB",110);
		}
		catch (ClassNotFoundException c ) {
			return tools.ReturnJSON.serviceRefused("Failed creating user Class",120);
		}
	}
	
	/**
	 * Permet de se connecter
	 * @param key
	 * @return
	 */
	public static boolean connected(String key) {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			
			String query="SELECT * FROM session WHERE session.key_user='"+key+"'";
			//System.out.println(query);
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			if(rs.next()) { //si user existe dans la base de données session => il est déjà connecté
				//if(rs.getString("key_user")!=null) //Si la clée n'est pas null, user déjà connecté
				return true;
			}
			
			st.close();
			conn.close();
			return false;
		}
		catch (SQLException s) {
			//System.out.println("herE"); // a enlever après test
			System.out.println(tools.ReturnJSON.serviceRefused("SQL ERROR", 210));
			return false;
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("Class not found", 220));
			return false;
		}
	}

	/**
	 * Ajoute un ami
	 * @param key
	 * @param logFriend
	 */
	public static void AddFriend(String key, String logFriend) {

		try {		
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			String loginUser=tools.UserTools.getLoginUser(key);
			
	
			
			//Date courante
			
			String date =getDate(); 
			
			//Requete
			
			String query="INSERT INTO friends VALUES ('"+loginUser+"','"+logFriend+"','"+date+"')";
			//System.out.println(query);
			Statement st=conn.createStatement();
			st.executeUpdate(query);

			st.close();
			conn.close();
			
		}
		catch (SQLException s) {
			//System.out.println("ADDFRIENDERROR"); // a enlever après test
			System.out.println(tools.ReturnJSON.serviceRefused("SQL ERROR", 510));
			
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("Class not found", 520));
		
		}
	}
	/**
	 * Supprime un ami
	 * @param key
	 * @param logFriend
	 */
	public static void RemoveFriend(String key, String logFriend) {

		try {
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			String loginUser=tools.UserTools.getLoginUser(key);
			
			//Requete
			
			String query="DELETE FROM friends WHERE friends.log_user='"+loginUser+"' AND friends.log_friend='"+logFriend+"'";
			//System.out.println(query);
			Statement st=conn.createStatement();
			st.executeUpdate(query);

			st.close();
			conn.close();
			
		}
		catch (SQLException s) {
			//System.out.println("ADDFRIENDERROR"); // a enlever après test
			System.out.println(tools.ReturnJSON.serviceRefused("SQL ERROR", 610));
			
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("Class not found", 620));
		
		}
	}
	
	/**
	 * Retourne la date actuelle
	 * @return
	 */
	public static String getDate() {
		Calendar call=Calendar.getInstance();
		SimpleDateFormat sdf=new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
		String date =sdf.format(call.getTime()); 
		return date;
	}
	
	/**
	 * Get le login d'un user en fonction de sa key
	 * @param key
	 * @return
	 */
	public static String getLoginUser(String key) {//A OPTIMISER
		try {
			
			String res="";
			
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			String query="SELECT * FROM session WHERE session.key_user='"+key+"'";
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			if(rs.next()) { //Probleme si plusieurs login mais login unique normalement
				res=rs.getString("login");
			}
			
			st.close();
			conn.close();
			return res;
		}
		catch (SQLException s) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme existance base de donnee", 101));
			return "";
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme class not found", 102));
			return "";
		}
		catch (IllegalAccessException i ) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme illegal access", 106));
			return "";
		} catch (InstantiationException e) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme instantiation exception", 107));
			return "";
		}
		
	}
	
}
	
