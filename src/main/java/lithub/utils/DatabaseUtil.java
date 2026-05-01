package lithub.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseUtil {
    private static final String URL = "jdbc:mysql://serverless-europe-west4.sysp0000.db2.skysql.com:4000/LitHub_DB?useSSL=true&serverTimezone=UTC";
    private static final String USERNAME = "dbpgf10219808";
    private static final String PASSWORD = "j1glt9E5pp=ASHnPUNV52da";  // ADD YOUR PASSWORD HERE BUT REMEMBER TO REMOVE IT BEFORE PUSHING 
    
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("MySQL JDBC Driver not found. Add mysql-connector-j to /WEB-INF/lib/", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USERNAME, PASSWORD);
    }
    
    public static void main(String[] args) {
        try {
            Connection conn = getConnection();
            System.out.println("Database connected successfully!");
            conn.close();
        } catch (SQLException e) {
            System.out.println("Database connection failed: " + e.getMessage());
        }
    }
}
