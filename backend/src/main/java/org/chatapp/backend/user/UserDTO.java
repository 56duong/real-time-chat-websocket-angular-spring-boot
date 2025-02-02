package org.chatapp.backend.user;

import lombok.Data;

@Data
public class UserDTO {
    private String username;
    private String password;
    private UserStatus status;
    private String avatarUrl;
}
