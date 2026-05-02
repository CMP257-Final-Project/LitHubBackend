package lithub.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import lithub.utils.DatabaseUtil;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.sql.*;
import java.util.*;

/**
 * GET /api/user-clubs
 * Returns the clubs the logged-in user has joined.
 */
@WebServlet("/api/user-clubs")
public class UserClubsServlet extends HttpServlet {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // ── Session check ─────────────────────────────────────────────────
        // HttpSession session = req.getSession(false);
        // if (session == null || session.getAttribute("userId") == null) {
        //     resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        //     resp.getWriter().write("[]");
        //     return;
        // }
        // int userId = (int) session.getAttribute("userId");
        int userId = 1; // hardcoded for testing

        String sql = """
                SELECT
                    c.id           AS club_id,
                    c.name,
                    c.tagline,
                    c.description,
                    c.cover_url,
                    c.member_count,
                    b.title        AS current_book_title
                FROM   club_members cm
                JOIN   clubs        c  ON c.id = cm.club_id
                LEFT JOIN books     b  ON b.id = c.current_book_id
                WHERE  cm.user_id = ?
                ORDER BY cm.id DESC
                """;

        List<Map<String, Object>> clubs = new ArrayList<>();

        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Map<String, Object> club = new LinkedHashMap<>();
                club.put("clubId",           rs.getInt("club_id"));
                club.put("name",             rs.getString("name"));
                club.put("tagline",          rs.getString("tagline"));
                club.put("description",      rs.getString("description"));
                club.put("coverUrl",         rs.getString("cover_url"));
                club.put("memberCount",      rs.getInt("member_count"));
                club.put("currentBookTitle", rs.getString("current_book_title"));
                clubs.add(club);
            }

        } catch (SQLException e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
            return;
        }

        mapper.writeValue(resp.getWriter(), clubs);
    }
}