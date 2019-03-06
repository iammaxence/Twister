package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import services.Comments;

/**
 * Servlet implementation class RemoveCommentServlet
 */
@WebServlet("/RemoveCommentServlet")
public class RemoveCommentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RemoveCommentServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		

		String login=request.getParameter("login");
		String id_message=request.getParameter("id_message");
		String id_comment=request.getParameter("id_comment");

		
		response.setContentType("text/json");
		PrintWriter out=response.getWriter();
		JSONObject o = Comments.removeComment(login, id_message, id_comment);
		out.println(o);
	}


}
