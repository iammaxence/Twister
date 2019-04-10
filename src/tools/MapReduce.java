package tools;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.DBCollection;
import com.mongodb.MapReduceCommand;
import com.mongodb.client.MapReduceIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

public class MapReduce {
	public static void mapreduce() {
		//Database.MongoOpen();
		MongoCollection<Document> conn=Database.getMongocollection("messages");
		
		String m =" function(){ "
			    +"var text = this.message;" 
			    +"var id = this._id;" 
			    +"var words = text.match(/\\w+/g);" 
			    +"var tf = {};"
			    +"for (var i=0; i<words.length; i++){" 
			    	+"if (tf[words[i]] == null){" 
		            	+"tf[words[i]] = 1;" 
		        	+"}" 
		        	+"else{" 
		            	+"tf[words[i]] += 1;" 
		            +"}"  
			    +"}"
			    +"for (w in tf){"
			        +"var ret = {};"
			        +"ret[id] = tf[w];"
			        +"emit(w, ret);"
			    +"}"
			+"}";
			
		String r = "function(key, val){"
		   +"var ret = {};"
		   +"for (var i=0; i<val.length; i++){"
		        +"for (var d in val[i]){"
		            +"ret[d] = val[i][d] * Math.log(N/val.length);"
		        +"}"
		    +"}"
		    +"return ret;" 
		+"}";
	
		String f = "function(k, v){"
		    +"var df = Object.keys(v).length;"
		    +"for (d in v){"
		        +"v[d] = v[d] * Math.log(N/df);"
		    +"}"
		    +"return v;"
		+"}";
		
//		String out;
//		MapReduceCommand cmd=new MapReduceCommand((DBCollection) conn, m, r, out, MapReduceCommand.OutputType.REPLACE, null);
		
		
//		cmd.setFinalize(f);
		Document d=new Document();
		d.append("N", conn.count());
//		cmd.setScope(d);
//		conn.mapReduce(cmd);
		
		MapReduceIterable<Document> iterable=conn.mapReduce(m, r);
		iterable.collectionName("index");
		
		iterable.finalizeFunction(f);
		iterable.scope(d);
		iterable.toCollection();
		/*MongoCursor<Document> cursor=iterable.iterator();
		while(cursor.hasNext()) {
			System.out.println(cursor.next());
		}*/
	}
	
	public static ArrayList<Document> getMessageByQuery(MongoCollection<Document> index,MongoCollection<Document> docs, String query){
		String[] q=query.split(" ");
		HashSet<String> w=new HashSet<String>();
		for(String s:q) {
			if(!w.contains(s)) {
				w.add(s);
			}
		}
		HashMap<String,Double>scores=new HashMap<String,Double>();
		
		for(String s:w) {
			Document obj=new Document();
			obj.put("_id", s);
			MongoCursor<Document> cursor = index.find(obj).iterator();
	        if (cursor.hasNext()){
	        	Document res = cursor.next();
	            //System.out.println(res);

	            //ArrayList<DBObject> documents = (ArrayList<DBObject>) res.get("value");
	            HashMap<String, Double> documents =new HashMap<String, Double>();
	            Map<? extends String, ? extends Double> d=(Map<? extends String, ? extends Double>) res.get("value");
	            documents.putAll(d);
	            //System.out.println(documents);
	            
	            Set<String> keys = documents.keySet();
	            
	            for (String k: keys){
	            	double val = Double.valueOf(documents.get(k));
	            	Double s1 = scores.get(k);
	            	s1 = (s1 == null)?val:(s1+val);
	                scores.put(k, s1);
	            }
//	            System.out.println(scores);
	        }
			/*MongoCursor<Document> cursor=index.find(obj).iterator();
			while(cursor.hasNext()) {
				Document res=cursor.next();
				//System.out.println(res.get("value"));
				ArrayList<Document> docc=(ArrayList<Document>) res.get("value");
				for(Document d:docc) {
					String id=d.getString("id");
					double val=Double.valueOf(d.getString("w"));
					Double ss=scores.get(id);
					ss=(ss==null ? val :(ss+val));
					scores.put(id, ss);
				}*/
			/*ArrayList<Document> cursor=index.find(obj).into(new ArrayList<Document>());
			for(Document d:cursor) {
				//System.out.println(d);
				//String id=d.getString("_id");
				Document values=(Document) d.get("value");
				System.out.println(values);
				
				values.forEach((Block<Document>) document -> {
				    System.out.println(document);
					            
	            for (String k: keys){
	            	double val = Double.valueOf(documents.get(k));
	            	Double s1 = scores.get(k);
	            	s1 = (s1 == null)?val:(s1+val);
	                scores.put(k, s1);
	                System.out.println(scores);
	            }
			}*/
	            
				
				//System.out.println(docc);
				/*try {
					MongoCursor<Document> doc=(MongoCursor<Document>)res.get("value");
					while(doc.hasNext()) {
						System.out.println("CURSOR"+doc.next());
					}
				}catch(java.lang.ClassCastException e) {
					Document doc=(Document) res.get("value");
					System.out.println("DOC"+doc);
				}*/
				
				
			
		}

		List<Map.Entry<String, Double>> entries = new ArrayList<Map.Entry<String, Double>>(scores.entrySet());
		java.util.Collections.sort(entries, new Comparator<Map.Entry<String, Double>>(){
	        public int compare(Map.Entry<String,Double> a, Map.Entry<String,Double> b){ 
	        	return b.getValue().compareTo(a.getValue());
	        }
	    });
	    //System.out.println(entries);
	    // récupère les messages
	    
	    ArrayList<Document> ret = new ArrayList<Document>();
	    for (Map.Entry<String, Double> entry: entries){
	    	Document obj = new Document();
	    	String s=entry.getKey();	
	    	char[] id=new char[24];
	    	s.getChars(10, 34, id, 0);
	    	//System.out.println(String.valueOf(id));
	        obj.put("_id", new ObjectId(String.valueOf(id)));
	        //System.out.println(obj);
	        MongoCursor<Document> cursor = docs.find(obj).iterator();
	        while (cursor.hasNext()){
	        	Document res = cursor.next();
	        	//System.out.println(res);
	            ret.add((Document) res);
	        }
	    }
	    //System.out.println(ret);
	    return ret;
		
	}
	
	
	
}
