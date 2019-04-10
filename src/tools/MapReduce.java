package tools;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

import org.bson.Document;

import com.mongodb.DBCollection;
import com.mongodb.MapReduceCommand;
import com.mongodb.client.MapReduceIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

public class MapReduce {
	public static void mapreduce() {
		Database.MongoOpen();
		MongoCollection<Document> conn=Database.getMongocollection("messages");
		
		/*String m="function m() {"
				+ "var text=this.content;"
				+ "var words=text.match(/\\w+ /g);"
				+ "var tf={};"
				+ "for(var i=0;i<words.length;i++){"
					+ "if(tf[words[i]]==null){"
						+ "tf[words[i]=1;"
					+ "}else{"
						+ "tf[words[i]]=tf[words[i]]+1;}"
						+ "for(w in tf){"
						+ "var ret={};"
						+ "ret[id]=tf[w];"
						+ "emit(w,ret);}"
					+ "}"
				+ "}";
		
		String r="function r(key,values) {"
				+ "return();}";
		
		String f="function f(k,v) {"
				+ "var df=Object.keys(v).length;"
				+ "for(d in v){"
					+ "v[d]=v[d]*Math.log(N/df);"
				+ "}"
				+ "return v;";*/
		
		String m =" function(){ "+
			    "var text = this.message;" +
			    "var id = this._id;" +
			    "var words = text.match(/\\w+/g);" +
			    "var tf = {};"+
			    "for (var i=0; i<words.length; i++){" +
			    	"if (tf[words[i]] == null){" +
		            	"tf[words[i]] = 1;" +
		        	"}" +
		        	"else{" +
		            	"tf[words[i]] += 1;" +
		            "}" + 
			    "}"+
			    "for (w in tf){"+
			        "var ret = {};"+
			        "ret[id] = tf[w];"+
			        "emit(w, ret);"+
			    "}"+
			"}";
			
			String r = "function(key, val){"+
			   " var ret = {};"+
			"for (var i=0; i<val.length; i++){"+
			        "for (var d in val[i]){"+
			            "ret[d] = val[i][d] * Math.log(N/val.length);"+
			        "}"+
			    "}"+
			    "return ret;" +
			"}";
		
			String f = "function(k, v){"+
			    "var df = Object.keys(v).length;"+
			    "for (d in v){"+
			        "v[d] = v[d] * Math.log(N/df);"+
			    "}"+
			    "return v;"+
			"}";
		
		String out;
//		MapReduceCommand cmd=new MapReduceCommand((DBCollection) conn, m, r, out, MapReduceCommand.OutputType.REPLACE, null);
		
		
//		cmd.setFinalize(f);
		Document d=new Document();
		d.append("N", conn.count());
//		cmd.setScope(d);
//		conn.mapReduce(cmd);
		
		MapReduceIterable iterable=conn.mapReduce(m, r);
		iterable.finalizeFunction(f);
		iterable.scope(d);
		MongoCursor cursor=iterable.iterator();
		while(cursor.hasNext()) {
			System.out.println(cursor.next());
		}
		
	}
	
	public ArrayList<Document> getMessageByQuery(DBCollection index,DBCollection docs, String query){
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
			obj.put("word", s);
			MongoCursor<Document> cursor=index.find(obj).iterator();
			try {
				if(cursor.hasNext()) {
					Document res=cursor.next();
					ArrayList<Document> docs=(ArrayList<Document>)res.get("docs");
					for(Document d:docs) {
						String id=d.getString("id");
						double val=Double.valueOf(d.getString("w"));
						Double sc=scores.get(id);
						sc=(sc==null ? val :(sc+val));
						scores.put(id, s);
						
					}
				}
			}
		}
	}
	
	
}
