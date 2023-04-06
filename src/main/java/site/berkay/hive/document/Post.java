package site.berkay.hive.document;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import site.berkay.hive.dto.TokenDTO;

@Document
@NoArgsConstructor
@RequiredArgsConstructor
@Data
public class Post {

    @Id
    String postId;

    @NonNull
    String title;


    @NonNull
    String text;


}
