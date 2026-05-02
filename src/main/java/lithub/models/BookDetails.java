package lithub.models;

public class BookDetails {

	private int id;
    private String title;
    private String author;
    private String description;
    private String genre;
    private int page_count;
    private String published_date;
    private String cover_url;
    private double avg_rating;
    private int view_count;
    private int is_trending;
    private String section;
    
    public BookDetails() {
    }
    
    public BookDetails(int id, String title, String author, String description, String genre, 
            int page_count, String published_date, String cover_url, double avg_rating, int view_count, 
            int is_trending, String section) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.description = description;
		this.genre = genre;
		this.page_count = page_count;
		this.published_date = published_date;
		this.cover_url = cover_url;
		this.avg_rating = avg_rating;
		this.view_count = view_count;
		this.is_trending = is_trending;
		this.section = section;
    }
    
    // Setters
    public void setId(int id) {
        this.id = id;
    }
    
    public void setTitle(String title) {
    	this.title = title;
    }
    
    public void setAuthor(String author) {
    	this.author = author;
    }
    
    public void setDescription(String description) {
    	this.description = description;
    }
    
    public void setGenre(String genre) {
    	this.genre = genre;
    }
    
    public void setPage_count(int page_count) {
        this.page_count = page_count;
    }
    
    public void setPublished_date(String published_date) {
        this.published_date = published_date;
    }
    
    public void setCover_url(String cover_url) {
        this.cover_url = cover_url;
    }
    
    public void setAvg_rating(double avg_rating) {
        this.avg_rating = avg_rating;
    }
      
    public void setView_count(int view_count) {
        this.view_count = view_count;
    }
    
    public void setIs_trending(int is_trending) {
        this.is_trending = is_trending;
    }
    
    public void setSection(String section) {
        this.section = section;
    }
    
    // Getters
    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getDescription() {
        return description;
    }

    public String getGenre() {
        return genre;
    }

    public int getPage_count() {
        return page_count;
    }

    public String getPublished_date() {
        return published_date;
    }

    public String getCover_url() {
        return cover_url;
    }

    public double getAvg_rating() {
        return avg_rating;
    }

    public int getView_count() {
        return view_count;
    }

    public int getIs_trending() {
        return is_trending;
    }

    public String getSection() {
        return section;
    }
}