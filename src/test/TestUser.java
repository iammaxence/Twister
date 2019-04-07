package test;
import services.*;
import tools.CheckTools;

public class TestUser {
	
	public static void main(String[] args) {
		//User.createUser("tati","tatou" , "tatou", "mdp", "mail2@gmail.com");
		//User.listCo("bO72aQFRLHOhffIR");
		System.out.println(CheckTools.checkPasswd("tata", "mdp"));
	}
}
