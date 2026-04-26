package lithub.models;

public class User {
    private int userId;
    private String username;
    private String email;
    private String fullName;
    private String memberSince;
    
    public User() {}
    
    public User(int userId, String username, String email, String fullName, String memberSince) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.memberSince = memberSince;
    }
    
    // Getters
    public int getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public String getMemberSince() { return memberSince; }
    
    // Setters
    public void setUserId(int userId) { this.userId = userId; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setMemberSince(String memberSince) { this.memberSince = memberSince; }
}