package org.chatapp.backend.messagecontent;

import lombok.RequiredArgsConstructor;
import org.chatapp.backend.messageroom.MessageRoomService;
import org.chatapp.backend.messageroommember.MessageRoomMemberDTO;
import org.chatapp.backend.messageroommember.MessageRoomMemberService;
import org.chatapp.backend.user.UserDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "${api.prefix}/messagecontents")
public class MessageContentController {

    private final MessageContentService messageContentService;
    private final MessageRoomMemberService messageRoomMemberService;
    private final SimpMessagingTemplate simpMessagingTemplate;



    @GetMapping("/{roomId}")
    public ResponseEntity<List<MessageContentDTO>> getMessagesByRoomId(@PathVariable final UUID roomId) {
        return ResponseEntity.ok(messageContentService.getMessagesByRoomId(roomId));
    }



    @MessageMapping("/send-message")
    public void sendMessage(@RequestBody MessageContentDTO messageContentDTO) {
        final MessageContentDTO saved = messageContentService.save(messageContentDTO);
        final List<MessageRoomMemberDTO> members = messageRoomMemberService.findByMessageRoomId(messageContentDTO.getMessageRoomId());
        members.forEach(member -> {
            simpMessagingTemplate.convertAndSendToUser(
                    member.getUsername(),
                    "/queue/messages",
                    saved
            );
        });
    }

}
