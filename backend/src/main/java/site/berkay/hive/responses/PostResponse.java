package site.berkay.hive.responses;

import lombok.Data;
import site.berkay.hive.document.Post;
import site.berkay.hive.document.User;

@Data
public class PostResponse {


    String id;
    String postId;
    String username;
    String title;
    String text;

    public PostResponse(Post entity) {
        this.postId = entity.getPostId();
        this.title = entity.getTitle();
        this.text = entity.getText();
    }

}
