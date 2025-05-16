package org.chatapp.backend.messageroom;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "${api.prefix}/messagerooms")
public class MessageRoomController {

    private final MessageRoomService messageRoomService;



    @GetMapping("/find-chat-room")
    public ResponseEntity<MessageRoomDTO> findMessageRoomByMembers(@RequestParam final List<String> members) {
        return ResponseEntity.ok(messageRoomService.findMessageRoomByMembers(members));
    }



    @PostMapping("/create-chat-room")
    public ResponseEntity<MessageRoomDTO> create(@RequestParam final List<String> members,
                                                 @RequestParam final String username) {
        return ResponseEntity.ok(messageRoomService.create(members, username));
    }



    @GetMapping("/find-chat-room-at-least-one-content/{username}")
    public ResponseEntity<List<MessageRoomDTO>> findMessageRoomAtLeastOneContent(@PathVariable final String username) {
        return ResponseEntity.ok(messageRoomService.findMessageRoomAtLeastOneContent(username));
    }



    @GetMapping("/{roomId}")
    public ResponseEntity<MessageRoomDTO> findById(@PathVariable final UUID roomId) {
        return ResponseEntity.ok(messageRoomService.findById(roomId));
    }

}
