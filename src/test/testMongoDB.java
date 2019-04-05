package test;

import services.Message;

public class testMongoDB {
	public static void main(String[] args) {
		//Message a = new Message();
		//Message.postMessage("I8dZFCw2eTzYY1Po", "Je m'appel toto");
		//a.postMessage("gMkEGTJsoycwKXs9", "Bonjour je suis tata");
		//a.postMessage("gMkEGTJsoycwKXs9", "Moi,tata a faim");
		//a.postMessage("I8dZFCw2eTzYY1Po", "Salut, je suis toto");
		//a.postMessage("I8dZFCw2eTzYY1Po", "Moi,toto je fais du velo");
		Message.listMessage("VaN6l1aPjnnUqnVd", null,null);
		Message.removeMessage("VaN6l1aPjnnUqnVd", "5ca777c39f6a8f47b3f43918");
		Message.listMessage("VaN6l1aPjnnUqnVd", null,null);
	}
	
}