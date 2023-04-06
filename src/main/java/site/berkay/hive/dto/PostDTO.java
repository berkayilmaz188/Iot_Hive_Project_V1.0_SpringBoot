package site.berkay.hive.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import site.berkay.hive.document.Post;
import site.berkay.hive.document.User;
import site.berkay.hive.dto.TokenDTO;
import lombok.Builder;
@Getter
@Setter
@Builder
@Data
public class PostDTO {


    private String postId;
    private String title;
    private String text;

    public static PostDTO from(Post post) {
        return builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .text(post.getText())
                .build();

    }

}
