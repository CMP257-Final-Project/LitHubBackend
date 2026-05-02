package lithub.models;

public class ClubDetails {

	private int id;
    private String name;
    private String tagline;
    private String description;
    private String coverUrl;
    private int currentBookId;
    private int memberCount;
    
    public ClubDetails() {
    	
    }
    
    public ClubDetails(int id, String name, String tagline, String description, String coverUrl, 
                int currentBookId, int memberCount) {
        this.id = id;
        this.name = name;
        this.tagline = tagline;
        this.description = description;
        this.coverUrl = coverUrl;
        this.currentBookId = currentBookId;
        this.memberCount = memberCount;
    }
    
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCoverUrl() { return coverUrl; }
    public void setCoverUrl(String coverUrl) { this.coverUrl = coverUrl; }

    public int getCurrentBookId() { return currentBookId; }
    public void setCurrentBookId(int currentBookId) { this.currentBookId = currentBookId; }

    public int getMemberCount() { return memberCount; }
    public void setMemberCount(int memberCount) { this.memberCount = memberCount; }

   
   
    
}
