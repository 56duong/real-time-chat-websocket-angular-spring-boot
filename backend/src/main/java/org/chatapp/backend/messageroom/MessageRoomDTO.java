package org.chatapp.backend.messageroom;

import lombok.Data;
import org.chatapp.backend.messagecontent.MessageContentDTO;
import org.chatapp.backend.messageroommember.MessageRoomMemberDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class MessageRoomDTO {
    private UUID id;
    private String name;
    private String avatarUrl;
    private Boolean isGroup;
    private LocalDateTime createdDate;
    private String createdById;
    private MessageContentDTO lastMessage;
    private List<MessageRoomMemberDTO> members;
    private Long unseenCount;
}
