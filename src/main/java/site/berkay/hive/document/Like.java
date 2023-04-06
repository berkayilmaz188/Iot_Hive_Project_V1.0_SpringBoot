package site.berkay.hive.document;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Like {
    @Id
    String id;
    String postId;
    String userId;
}
