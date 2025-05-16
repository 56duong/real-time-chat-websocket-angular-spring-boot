package org.chatapp.backend.messageroommember;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "${api.prefix}/messageroommember")
public class MessageRoomMemberController {

    private final MessageRoomMemberService messageRoomMemberService;



    @PostMapping("/update-last-seen/{roomId}/{username}")
    public ResponseEntity<MessageRoomMemberDTO> updateLastSeen(@PathVariable final UUID roomId,
                                                               @PathVariable final String username) {
        return ResponseEntity.ok(messageRoomMemberService.updateLastSeen(roomId, username));
    }

}
