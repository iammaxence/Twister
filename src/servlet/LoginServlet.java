package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import services.Auth;

/**
 * Servlet implementation class AuthServlet
 */
@WebServlet("/AuthServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();

    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		

		String login=request.getParameter("login"); 
		String password=request.getParameter("password");
		
		JSONObject j= Auth.connexion(login, password);
		response.setContentType("test/json");
		PrintWriter out=response.getWriter(); //Affiche la réponse?
		out.println(j);
		
	}

	
	
}
