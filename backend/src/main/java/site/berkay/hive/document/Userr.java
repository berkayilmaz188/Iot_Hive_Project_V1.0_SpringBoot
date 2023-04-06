package site.berkay.hive.document;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@NoArgsConstructor
@RequiredArgsConstructor
@Data
public class Userr {

    @Id
    String id;

    @NonNull
    String userName;
    @NonNull
    String password;
}
