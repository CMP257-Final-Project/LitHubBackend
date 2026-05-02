package lithub.lithubrepository;


import lithub.utils.DatabaseUtil;
import lithub.models.BookDetails;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BookRepository {
    
    public List<BookDetails> getAllBooks() {
        List<BookDetails> books = new ArrayList<>();
        
        String sql = "SELECT id, title, cover_url, section, genre, published_date, avg_rating FROM books";

        try (Connection conn = DatabaseUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                BookDetails book = new BookDetails();
                book.setId(rs.getInt("id"));
                book.setTitle(rs.getString("title"));
                book.setCover_url(rs.getString("cover_url"));
                book.setSection(rs.getString("section"));
      
                // Add the properties needed for the JavaScript filters
                book.setGenre(rs.getString("genre"));
                book.setPublished_date(rs.getString("published_date"));
                book.setAvg_rating(rs.getDouble("avg_rating"));
                
                books.add(book);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return books;
    }
        public BookDetails getBookById(int id) {
            BookDetails book = null;

            String sql = "SELECT * FROM books WHERE id = ?";

            try (Connection conn = DatabaseUtil.getConnection();
                 PreparedStatement stmt = conn.prepareStatement(sql)) {

                stmt.setInt(1, id);
                ResultSet rs = stmt.executeQuery();

                if (rs.next()) {
                    book = new BookDetails();
                    book.setId(rs.getInt("id"));
                    book.setTitle(rs.getString("title"));
                    book.setCover_url(rs.getString("cover_url"));
                    book.setSection(rs.getString("section"));
                    book.setGenre(rs.getString("genre"));
                    book.setPublished_date(rs.getString("published_date"));
                    book.setAvg_rating(rs.getDouble("avg_rating"));

//                    // optional fields if you have them
//                    book.setAuthor(rs.getString("author"));
//                    book.setPages(rs.getInt("pages"));
//                    book.setSummary(rs.getString("summary"));
                }

            } catch (SQLException e) {
                e.printStackTrace();
            }

            return book;
        }
    }