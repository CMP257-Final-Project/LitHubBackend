package lithub.servlets;


import com.fasterxml.jackson.databind.ObjectMapper;
import lithub.lithubrepository.ClubRepository;
import lithub.models.ClubDetails;

import java.util.List;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/FindClubServlet")
public class FindClubServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private ClubRepository clubRepository;

    @Override
    public void init() throws ServletException {
        super.init();
        clubRepository = new ClubRepository();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // 1. Set response content type and character encoding
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 2. Retrieve the data from your repository
        List<ClubDetails> clubs = clubRepository.getAllClubs();

        // 3. Convert the Java list to JSON using Jackson
        ObjectMapper mapper = new ObjectMapper();

        // 4. Send the JSON string directly to the HTTP response writer
        PrintWriter out = response.getWriter();
        try {
            mapper.writeValue(out, clubs);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        } finally {
            out.flush();
        }
    }
}
