package tools;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CheckTools {
	
	/**
	 * Check si un user est deja connecté avec sa clé
	 * @param key
	 * @return
	 */
	public static boolean checkUserConnected(String key) {
		try {
			
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			
			String query="SELECT * FROM session WHERE session.key_user='"+key+"'";
			//System.out.println(query);
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			if(Integer.parseInt(rs.getString("root"))==1)
				return true;
			
			if(rs.next()) { 
				if(!checkKeyValidity(rs.getString("date_connexion"),key)) {//Test la validite de la cle (A VERIFIER)
					AuthTools.deconnexion(key);
					return false;
				}
				
				String update="UPDATE session SET date_connexion='"+UserTools.getDate()+"' WHERE key_user='"+key+"'";
				st.executeUpdate(update);
				return true;
			}
			
			st.close();
			conn.close();
			return false;
		}
		catch (SQLException s) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme existance base de donnee", 110));
			return false;
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme class not found", 120));
			return false;
		}
		
	}
	
	public static boolean checkKeyValidity(String date,String key) {
		String d_current=UserTools.getDate();//Date courrante
		Date current = null;
		Date key_date = null;
		try {
			current = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(d_current);
			key_date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		long seconds = (current.getTime() - key_date.getTime())/3600000;
		
		System.out.println(seconds);
		if(seconds >= 0) {
			AuthTools.deconnexion(key);
			return false;
		}
			
		return true;
	}


	/**
	 * Check si le password est le bon
	 * @param login
	 * @param psswd
	 * @return
	 */
	public static boolean checkPasswd(String login, String psswd) {
		try {
			
			boolean res=false;
		
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			String query="SELECT * FROM user WHERE user.login='"+login+"' AND user.password='"+psswd+"'";
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			if(rs!=null) { 
				res=true;
			}
			
			st.close();
			conn.close();
			return res;
		}
		catch (SQLException s) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme existance base de donnee", 101));
			return false;
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme class not found", 102));
			return false;
		}
		catch (IllegalAccessException i ) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme illegal access", 106));
			return false;
		} catch (InstantiationException e) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme instantiation exception", 107));
			return false;
		}
	}
	
	/**
	 * Check si le user existe dans la BD
	 * @param login
	 * @return
	 */
	public static boolean exist(String login) {
		try {
			Boolean res=false;
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			String query="SELECT * FROM user as u WHERE u.login='"+login+"'";
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			if(rs.next()) {
				res=true;
			}
			st.close();
			conn.close();
			return res;
		}
		catch (SQLException s) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme existance base de donnee", 101));
			return false;
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme class not found", 102));
			return false;
		}
		catch (IllegalAccessException i ) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme illegal access", 106));
			return false;
		} catch (InstantiationException e) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme instantiation exception", 107));
			return false;
		}
		
	}
	
	/**
	 * Check si le user est deja connecté avec le login
	 * @param log
	 * @return
	 */
	public static boolean alreadyConnected(StringBuilder log) { //Verifie si user déjà connecté avec login
		try {
			
			
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			
			String query="SELECT * FROM session WHERE session.login='"+log.toString()+"'";
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
			System.out.println("herE"); // a enlever après test
			System.out.println(tools.ReturnJSON.serviceRefused("probleme existance base de donnee", 101));
			return false;
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme class not found", 102));
			return false;
		}
		
	}

	
	/**
	 * Check si deux users sont deja ami
	 * @param key
	 * @param logFriend
	 * @return
	 */
	public static boolean isFriend(String key, String logFriend) {
		try {
			
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			String loginUser=tools.UserTools.getLoginUser(key);
			
			//Requete
			
			String query="SELECT * FROM friends WHERE friends.log_user='"+loginUser+"' AND friends.log_friend='"+logFriend+"'";
			//System.out.println(query);
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			if(rs.next()) { 
				return true;
			}

			st.close();
			conn.close();
			return false;
			
		}
		catch (SQLException s) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme existance base de donnee", 101));
			return false;
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme class not found", 102));
			return false;
		}
	}
	
	
	
	
}
