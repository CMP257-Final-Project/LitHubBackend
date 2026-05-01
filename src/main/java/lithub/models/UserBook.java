package lithub.models;

public class UserBook {

    // from user_books table
    private int    userBookId;
    private int    userId;
    private int    bookId;
    private String status;	// wishlist or already read
    private int    rating;      
    private String addedAt;
    private String readDate;

    // from books table (joined)
    private String title;
    private String author;
    private String coverUrl;
    private int    pageCount;

    public UserBook() {}

    public int getUserBookId(){ return userBookId; }
    public void setUserBookId(int v){ this.userBookId = v; }

    public int getUserId(){ return userId; }
    public void setUserId(int v){ this.userId = v; }

    public int getBookId(){ return bookId; }
    public void setBookId(int v){ this.bookId = v; }

    public String getStatus(){ return status; }
    public void setStatus(String v){ this.status = v; }

    public int getRating(){ return rating; }
    public void setRating(int v){ this.rating = v; }

    public String getAddedAt(){ return addedAt; }
    public void setAddedAt(String v){ this.addedAt = v; }

    public String getReadDate(){ return readDate; }
    public void setReadDate(String v){ this.readDate = v; }

    public String getTitle(){ return title; }
    public void setTitle(String v){ this.title = v; }

    public String getAuthor(){ return author; }
    public void setAuthor(String v){ this.author = v; }

    public String getCoverUrl(){ return coverUrl; }
    public void setCoverUrl(String v){ this.coverUrl = v; }

    public int getPageCount(){ return pageCount; }
    public void setPageCount(int v){ this.pageCount = v; }
}
