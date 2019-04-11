package test;

import services.Comments;
import services.Likes;
import services.Message;
import tools.MapReduce;

public class testMongoDB {
	public static void main(String[] args) {
		//Message a = new Message();
		//Message.postMessage("Dyw8rjyCSwB0zOpB", "deux pierre paul jean");
		//a.postMessage("gMkEGTJsoycwKXs9", "Bonjour je suis tata");
		//a.postMessage("gMkEGTJsoycwKXs9", "Moi,tata a faim");
		//a.postMessage("I8dZFCw2eTzYY1Po", "Salut, je suis toto");
		//a.postMessage("I8dZFCw2eTzYY1Po", "Moi,toto je fais du velo");
		//Message.listMessage("VaN6l1aPjnnUqnVd", null,null);
		//Message.removeMessage("jaUFTSethWAOmFaj", "5cac980891418f5cc1e32b3f");
		//Likes.addLike("joris lecon", "5ca906120e66e036a43efcf9");
		//Comments.postComment("tata", "5cac9c0cfbb7b87094911d02", "COMMENTAIRE");
		//Comments.removeComment("tata", "5cac9c0cfbb7b87094911d02", "2019-04-09 15:20:29");
		//Message.listMessage("Dyw8rjyCSwB0zOpB", "" , "");
		//MapReduce.mapreduce();
		System.out.println(Message.listMessage("z6S5ydfC5xeqBYhQ", "deux", "")); 
	}
	
}