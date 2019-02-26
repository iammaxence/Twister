package tools;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class AuthTools {
	
	
	/**
	 * Nouvelle connection 
	 * @param log
	 * @return
	 */
	public static StringBuilder insertNvlleSession(StringBuilder log) {
		try {
			
			
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			
			if(tools.CheckTools.alreadyConnected(log)) //Si déjà connecter, je fais rien
				return new StringBuilder();
			
			StringBuilder alea=new StringBuilder().append(generate(16)); //génère une clée aleatoire
			
			String query="INSERT INTO session VALUES('"+log.toString()+"','"+alea.toString()+"')"; //attribue une clé a l'utilisateur qui souhaite se connecter
			//System.out.println(query);
			
			Statement st=conn.createStatement();
			st.executeUpdate(query);
			st.close();
			conn.close();
			return alea;
		}
		catch (SQLException s) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme existance base de donnee", 101));
			return new StringBuilder();
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("probleme class not found", 102));
			return new StringBuilder();
		}
		
	}
	/**
	 * Genere une clé aleatoire
	 * @param length
	 * @return
	 */
	private static String generate(int length)
	{
		    String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		    String pass = "";
		    for(int x=0;x<length;x++)
		    {
		       int i = (int)Math.floor(Math.random() * 62);
		       pass += chars.charAt(i);
		    }
		    return pass;
	}
	
	/**
	 * permet a un user de se deconnecter
	 * @param key
	 */
	public static void deconnexion(String key) { 
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String url="jdbc:mysql://localhost/Brunet_Lin";
			Connection conn= DriverManager.getConnection(url,"root","root");
			
			String query="DELETE FROM session WHERE session.key_user='"+key+"'"; //supprime la cle d'un user
			//System.out.println(query);
			
			Statement st=conn.createStatement();
			st.executeUpdate(query);
			st.close();
			conn.close();
		}
		catch (SQLException s) {
			System.out.println(tools.ReturnJSON.serviceRefused("SQL ERROR", 310));
		}
		catch (ClassNotFoundException c ) {
			System.out.println(tools.ReturnJSON.serviceRefused("Class not found", 320));
		}
		
	}
	
	
}
