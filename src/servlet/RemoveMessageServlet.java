package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import services.Message;

/**
 * Servlet implementation class RemoveMessageServlet
 */
@WebServlet("/RemoveMessageServlet")
public class RemoveMessageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RemoveMessageServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		

		String key=request.getParameter("key");
		String id=request.getParameter("id");

		
		response.setContentType("text/json");
		PrintWriter out=response.getWriter();
		JSONObject o = Message.removeMessage(key, Integer.parseInt(id));
		out.println(o);
	}


}
