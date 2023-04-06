package site.berkay.hive.document;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    String id;
    String postId;
    String userId;

    User user;

    @NonNull
    String text;
}
