package lithub.lithubrepository;

import lithub.models.ClubDetails;
import lithub.utils.DatabaseUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ClubRepository {
	
	public List<ClubDetails> getAllClubs() {
        List<ClubDetails> clubs = new ArrayList<>();
        String query = "SELECT * FROM clubs";
        
        try (Connection conn = DatabaseUtil.getConnection();
                PreparedStatement stmt = conn.prepareStatement(query);
                ResultSet rs = stmt.executeQuery()) {

               while (rs.next()) {
            	   ClubDetails club = new ClubDetails(
                       rs.getInt("id"),
                       rs.getString("name"),
                       rs.getString("tagline"),
                       rs.getString("description"),
                       rs.getString("cover_url"),
                       rs.getInt("current_book_id"),
                       rs.getInt("member_count")
                   );
                   
                   clubs.add(club);
               }
           } catch (SQLException e) {
               e.printStackTrace();
           }
           
           return clubs;
       }

}
