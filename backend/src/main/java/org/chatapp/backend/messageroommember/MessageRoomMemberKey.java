package org.chatapp.backend.messageroommember;

import lombok.Data;
import org.chatapp.backend.messageroom.MessageRoom;
import org.chatapp.backend.user.User;

import java.io.Serializable;

@Data
public class MessageRoomMemberKey implements Serializable {
    private User user;
    private MessageRoom messageRoom;
}
