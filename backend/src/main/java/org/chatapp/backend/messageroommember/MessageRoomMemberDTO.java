package org.chatapp.backend.messageroommember;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class MessageRoomMemberDTO {
    private UUID messageRoomId;
    private String username;
    private String avatarUrl;
    private Boolean isAdmin;
    private LocalDateTime lastSeen;
    private LocalDateTime lastLogin;
}
