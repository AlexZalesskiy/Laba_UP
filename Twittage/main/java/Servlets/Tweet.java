package Servlets;
import java.util.ArrayList;
import java.util.Date;


public class Tweet {
    private String id;
    private String description;
    private Date createdAt;
    private String author;
    private String photoLink;
    private ArrayList<String> hashTags;
    private ArrayList<String> likes;

    public Tweet() {
        this.id="";
        this.description = "";
        this.author = "";
        this.photoLink = "";
        this.createdAt=new Date();
        this.hashTags = new ArrayList<>();
        this.likes = new ArrayList<>();
    }

    public Tweet(String id, String description, String author,Date createdAt, String photoLink, ArrayList<String> hashTags, ArrayList<String> likes) {
        this.id = id;
        this.description = description;
        this.createdAt = new Date();
        this.author = author;
        this.photoLink = photoLink;
        this.hashTags = new ArrayList<>(hashTags);
        this.likes = new ArrayList<>(likes);
    }




    public void setId(String id) { this.id = id; }
    public String getId() { return id; }
    public void setDescription(String description) { this.description = description; }
    public String getDescription() { return description; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
    public Date getCreatedAt() { return createdAt; }
    public void setAuthor(String author) { this.author = author; }
    public String getAuthor() { return author; }
    public void setPhotoLink(String photoLink) { this.photoLink = photoLink; }
    public String getPhotoLink() { return photoLink; }
    public void setHashTags(ArrayList<String> hashTags) { this.hashTags = hashTags; }
    public ArrayList<String> getHashTags() { return hashTags; }
    public void setLikes(ArrayList<String> likes) { this.likes = likes; }
    public ArrayList<String> getLikes() { return likes; }
}