package lithub.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import lithub.utils.DatabaseUtil;
import lithub.models.UserBook;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.sql.*;
import java.util.*;

/**
 * GET /api/dashboard
 *
 * Reads the logged-in user's id from the session, then returns:
 * {
 *   "username"    : "Sarah",
 *   "wishlist"    : [ { userBookId, bookId, title, author, coverUrl, pageCount, addedAt }, ... ],
 *   "readBooks"   : [ { userBookId, bookId, title, author, coverUrl, pageCount, rating, readDate }, ... ],
 *   "totalPages"  : 1708
 * }
 */
@WebServlet("/api/dashboard")
public class DashboardServlet extends HttpServlet {

	private final ObjectMapper mapper = new ObjectMapper();

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");

		// ── Session check ────────────────────────────────────────────────────
		//        HttpSession session = req.getSession(false);
		//        if (session == null || session.getAttribute("userId") == null) {
		//            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		//            resp.getWriter().write("{\"error\":\"Not logged in\"}");
		//            return;
		//        }
		//
		//        int userId = (int) session.getAttribute("userId");
		int userId = 1; //hardcoded for testing

		// ── Query ────────────────────────────────────────────────────────────
		String sql = """
				SELECT
				    ub.id           AS user_book_id,
				    ub.user_id,
				    ub.book_id,
				    ub.status,
				    COALESCE(ub.rating, 0) AS rating,
				    DATE_FORMAT(ub.added_at,  '%%Y-%%m-%%d') AS added_at,
				    DATE_FORMAT(ub.read_date, '%%Y-%%m-%%d') AS read_date,
				    b.title,
				    b.author,
				    b.cover_url,
				    b.page_count,
				    u.username
				FROM user_books ub
				JOIN books      b ON b.id = ub.book_id
				JOIN users      u ON u.id = ub.user_id
				WHERE ub.user_id = ?
				ORDER BY ub.added_at DESC
				""";

		List<UserBook> wishlist  = new ArrayList<>();
		List<UserBook> readBooks = new ArrayList<>();
		String username = "";
		int totalPages  = 0;

		try (Connection conn = DatabaseUtil.getConnection();
				PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setInt(1, userId);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				username = rs.getString("username");

				UserBook ub = new UserBook();
				ub.setUserBookId(rs.getInt("user_book_id"));
				ub.setUserId(rs.getInt("user_id"));
				ub.setBookId(rs.getInt("book_id"));
				ub.setStatus(rs.getString("status"));
				ub.setRating(rs.getInt("rating"));
				ub.setAddedAt(rs.getString("added_at"));
				ub.setReadDate(rs.getString("read_date"));
				ub.setTitle(rs.getString("title"));
				ub.setAuthor(rs.getString("author"));
				ub.setCoverUrl(rs.getString("cover_url"));
				ub.setPageCount(rs.getInt("page_count"));

				if ("wishlist".equals(ub.getStatus())) {
					wishlist.add(ub);
				} else if ("read".equals(ub.getStatus())) {
					readBooks.add(ub);
					totalPages += ub.getPageCount();
				}
			}

		} catch (SQLException e) {
			resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			resp.getWriter().write("{\"error\":\"Database error: " + e.getMessage() + "\"}");
			return;
		}

		// ── Build response map ───────────────────────────────────────────────
		Map<String, Object> response = new LinkedHashMap<>();
		response.put("username",   username);
		response.put("wishlist",   wishlist);
		response.put("readBooks",  readBooks);
		response.put("totalPages", totalPages);

		mapper.writeValue(resp.getWriter(), response);
	}
}
