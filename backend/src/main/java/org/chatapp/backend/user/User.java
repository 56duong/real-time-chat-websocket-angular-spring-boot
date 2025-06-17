package org.chatapp.backend.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.chatapp.backend.messagecontent.MessageContent;
import org.chatapp.backend.messageroom.MessageRoom;
import org.chatapp.backend.messageroommember.MessageRoomMember;
import org.chatapp.backend.utils.FileUtils;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    private LocalDateTime lastLogin = LocalDateTime.now();

    private String avatarUrl;

    @OneToMany(mappedBy = "createdBy")
    private List<MessageRoom> messageRooms;

    @OneToMany(mappedBy = "user")
    private List<MessageRoomMember> messageRoomMembers;

    @OneToMany(mappedBy = "user")
    private List<MessageContent> messageContents;

    public String getAvatarUrl() {
        if(avatarUrl == null) return null;
        return FileUtils.getAvatarUrl(avatarUrl);
    }

    public String getAvatarShortUrl() {
        return avatarUrl;
    }

}
