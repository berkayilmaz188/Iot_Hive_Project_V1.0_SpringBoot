package site.berkay.hive.dto;


import lombok.Builder;
import lombok.Data;
import site.berkay.hive.document.User;

@Builder
@Data
public class UserDTO {
    private String id;
    private String username;

    public static UserDTO from(User user) {
        return builder()
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }
}