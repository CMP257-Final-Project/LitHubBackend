package lithub.servlets;

import lithub.lithubrepository.BookRepository;
import lithub.models.BookDetails;
import com.fasterxml.jackson.databind.ObjectMapper; // Uses the Jackson library you installed!

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;


@WebServlet("/FindBookServlet")
public class FindBookServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//Setting the response type to JSON so the frontend knows what it is receiving
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        BookRepository repo = new BookRepository();
        List<BookDetails> bookList = repo.getAllBooks();
       
        // 3. Convert the Java object (list of books) to a JSON string using Jackson
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = mapper.writeValueAsString(bookList);

        // 4. Send the JSON string back to the frontend
        PrintWriter out = response.getWriter();
        out.print(jsonString);
        out.flush();
    
		
		// next we have to modify our js code to talk to this servlet
	}

}
