import java.util.ArrayList;



public class Tweets {
    private ArrayList<Tweet> tweets;

    public ArrayList<Tweet> getAll() {
        return tweets;
    }

    public Tweets() {
        ArrayList<String> likes = new ArrayList<>();
        likes.add("Alex");
        likes.add("Lexa");
        ArrayList<String> hashtags = new ArrayList<>();
        hashtags.add("cool");
        this.add(new Tweet("1", "MyProject", "Me", "www.chetotam", hashtags, likes));
    }

    public Tweet get(String id) {
        for (Tweet tweet : tweets) {
            if (tweet.getId().equals(id))
                return tweet;
        }
        return null;
    }

    public boolean remove(String id) {
        return tweets.removeIf(tweet -> tweet.getId().equals(id));
    }

    public void removeAll() {
        tweets.clear();
    }

    public boolean validate(Tweet tweet) {
        return tweet.getDescription() != null && tweet.getDescription().length() <= 200;
    }

    public boolean add(Tweet newTweet) {
        if (validate(newTweet)) {
            tweets.add(newTweet);
            return true;
        }
        return false;
    }

    public boolean edit(String id, Tweet tweet) {
        Tweet editTweet = this.get(id);
        if (tweet.getDescription() != null) {
            editTweet.setDescription(tweet.getDescription());
        }
        if (tweet.getPhotoLink() != null) {
            editTweet.setPhotoLink(tweet.getPhotoLink());
        }
        if (tweet.getHashTags() != null) {
            editTweet.setHashTags(tweet.getHashTags());
        }
       if(validate(editTweet))
           return true;
       return false;
    }
}