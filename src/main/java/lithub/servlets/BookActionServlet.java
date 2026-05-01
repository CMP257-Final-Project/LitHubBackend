package lithub.servlets;


import com.fasterxml.jackson.databind.ObjectMapper;
import lithub.utils.DatabaseUtil;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.sql.*;
import java.util.Map;

/**
 * POST /api/book-action
 *
 * Expects JSON body:
 *   { "action": "markRead",        "userBookId": 3 }
 *   { "action": "removeWishlist",  "userBookId": 3 }
 *   { "action": "removeRead",      "userBookId": 3 }
 *   { "action": "rate",            "userBookId": 3, "rating": 4 }
 *
 * Returns:
 *   { "success": true }   or   { "success": false, "error": "..." }
 */
@WebServlet("/api/book-action")
public class BookActionServlet extends HttpServlet {

	private final ObjectMapper mapper = new ObjectMapper();

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");

		// ── Session check ────────────────────────────────────────────────────
		//        HttpSession session = req.getSession(false);
		//        if (session == null || session.getAttribute("userId") == null) {
		//            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		//            resp.getWriter().write("{\"success\":false,\"error\":\"Not logged in\"}");
		//            return;
		//        }
		//
		//        int userId = (int) session.getAttribute("userId");
		int userId = 1; // hardcoded for testing

		// ── Parse request body ───────────────────────────────────────────────
		@SuppressWarnings("unchecked")
		Map<String, Object> body = mapper.readValue(req.getReader(), Map.class);

		String action     = (String) body.get("action");
		int    userBookId = (Integer) body.get("userBookId");

		if (action == null) {
			resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			resp.getWriter().write("{\"success\":false,\"error\":\"Missing action\"}");
			return;
		}

		try (Connection conn = DatabaseUtil.getConnection()) {

			switch (action) {

			// ── Move wishlist → read ─────────────────────────────────────
			case "markRead" -> {
				String sql = """
						UPDATE user_books
						SET    status    = 'read',
						       read_date = CURDATE(),
						       rating    = 0
						WHERE  id = ? AND user_id = ? AND status = 'wishlist'
						""";
				try (PreparedStatement ps = conn.prepareStatement(sql)) {
					ps.setInt(1, userBookId);
					ps.setInt(2, userId);
					int rows = ps.executeUpdate();
					if (rows == 0) throw new SQLException("Record not found or already read");
				}
			}

			// ── Delete from wishlist ─────────────────────────────────────
			case "removeWishlist" -> {
				String sql = """
						DELETE FROM user_books
						WHERE  id = ? AND user_id = ? AND status = 'wishlist'
						""";
				try (PreparedStatement ps = conn.prepareStatement(sql)) {
					ps.setInt(1, userBookId);
					ps.setInt(2, userId);
					int rows = ps.executeUpdate();
					if (rows == 0) throw new SQLException("Record not found");
				}
			}

			// ── Delete from read list ────────────────────────────────────
			case "removeRead" -> {
				String sql = """
						DELETE FROM user_books
						WHERE  id = ? AND user_id = ? AND status = 'read'
						""";
				try (PreparedStatement ps = conn.prepareStatement(sql)) {
					ps.setInt(1, userBookId);
					ps.setInt(2, userId);
					int rows = ps.executeUpdate();
					if (rows == 0) throw new SQLException("Record not found");
				}
				// Update pages_read in users table
				updatePagesRead(conn, userId);
			}

			// ── Rate a read book ─────────────────────────────────────────
			case "rate" -> {
				Object ratingObj = body.get("rating");
				if (ratingObj == null) throw new IllegalArgumentException("Missing rating value");
				int rating = (Integer) ratingObj;
				if (rating < 1 || rating > 5) throw new IllegalArgumentException("Rating must be 1-5");

				// DB stores rating as INT; your schema image shows values 7,8,10 (out of 10)
				// The JS uses 1-5 stars, so we store as-is (1-5).
				String sql = """
						UPDATE user_books
						SET    rating = ?
						WHERE  id = ? AND user_id = ? AND status = 'read'
						""";
				try (PreparedStatement ps = conn.prepareStatement(sql)) {
					ps.setInt(1, rating);
					ps.setInt(2, userBookId);
					ps.setInt(3, userId);
					int rows = ps.executeUpdate();
					if (rows == 0) throw new SQLException("Record not found");
				}
			}

			default -> {
				resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				resp.getWriter().write("{\"success\":false,\"error\":\"Unknown action: " + action + "\"}");
				return;
			}
			}

			resp.getWriter().write("{\"success\":true}");

		} catch (IllegalArgumentException e) {
			resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			resp.getWriter().write("{\"success\":false,\"error\":\"" + e.getMessage() + "\"}");
		} catch (SQLException e) {
			resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			resp.getWriter().write("{\"success\":false,\"error\":\"Database error: " + e.getMessage() + "\"}");
		}
	}

	/**
	 * Recalculates and updates users.pages_read after a book is removed.
	 */
	private void updatePagesRead(Connection conn, int userId) throws SQLException {
		String sql = """
				UPDATE users u
				SET    u.pages_read = (
				    SELECT COALESCE(SUM(b.page_count), 0)
				    FROM   user_books ub
				    JOIN   books      b ON b.id = ub.book_id
				    WHERE  ub.user_id = ? AND ub.status = 'read'
				)
				WHERE u.id = ?
				""";
		try (PreparedStatement ps = conn.prepareStatement(sql)) {
			ps.setInt(1, userId);
			ps.setInt(2, userId);
			ps.executeUpdate();
		}
	}
}
