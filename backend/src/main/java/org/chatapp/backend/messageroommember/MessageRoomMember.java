package org.chatapp.backend.messageroommember;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.chatapp.backend.messageroom.MessageRoom;
import org.chatapp.backend.user.User;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "message_room_member")
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(MessageRoomMemberKey.class)
@Builder
public class MessageRoomMember {
    @Id
    @ManyToOne
    @JoinColumn(name = "message_room_id")
    private MessageRoom messageRoom;

    @Id
    @ManyToOne
    @JoinColumn(name = "username")
    private User user;

    private Boolean isAdmin;

    private LocalDateTime lastSeen;
}
