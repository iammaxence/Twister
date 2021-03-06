package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import services.Friends;

/**
 * Servlet implementation class AddFriendsServlet
 */
@WebServlet("/AddFriendsServlet")
public class AddFriendsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddFriendsServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	
		String key=request.getParameter("key");
		String logFriend=request.getParameter("login_friend");
		
		response.setContentType("text/json");
		PrintWriter out=response.getWriter();
		JSONObject o = Friends.addFriend(key, logFriend);
		out.println(o);
	}
	

}
