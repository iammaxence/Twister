package test;

import services.Message;

public class testMongoDB {
	public static void main(String[] args) {
		Message a = new Message();
		a.postMessage("XfpqlxUy5eJsSzvw", "Je m'appel tatou");
		a.postMessage("AiXkwR9Eg1V5w9uI", "Bonjour je suis tata");
		a.postMessage("AiXkwR9Eg1V5w9uI", "Moi,tata a faim");
		a.postMessage("I8dZFCw2eTzYY1Po", "Salut, je suis toto");
		a.postMessage("I8dZFCw2eTzYY1Po", "Moi,toto je fais du velo");
		Message.listMessage("I8dZFCw2eTzYY1Po", null,null);
		//Message.removeMessage("I8dZFCw2eTzYY1Po", 1);
	}
	
}