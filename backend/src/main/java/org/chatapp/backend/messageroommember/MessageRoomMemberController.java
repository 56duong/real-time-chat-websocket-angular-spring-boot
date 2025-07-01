package org.chatapp.backend.messageroommember;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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



    @PostMapping("/add-members/{roomId}")
    public ResponseEntity<List<MessageRoomMemberDTO>> addMembers(@PathVariable final UUID roomId,
                                                           @RequestBody final List<MessageRoomMemberDTO> memberDTOS) {
        return ResponseEntity.ok(messageRoomMemberService.addMembers(roomId, memberDTOS));
    }



    @DeleteMapping("/remove-member/{roomId}/{memberId}")
    public ResponseEntity<Boolean> removeMember(@PathVariable final UUID roomId,
                                                             @PathVariable final String memberId) {
        return ResponseEntity.ok(messageRoomMemberService.removeMember(roomId, memberId));
    }



    @PostMapping("/make-admin/{roomId}/{memberId}")
    public ResponseEntity<MessageRoomMemberDTO> makeAdmin(@PathVariable final UUID roomId,
                                                          @PathVariable final String memberId) {
        return ResponseEntity.ok(messageRoomMemberService.adminAssign(roomId, memberId, true));
    }



    @PostMapping("/remove-admin/{roomId}/{memberId}")
    public ResponseEntity<MessageRoomMemberDTO> removeAdmin(@PathVariable final UUID roomId,
                                                          @PathVariable final String memberId) {
        return ResponseEntity.ok(messageRoomMemberService.adminAssign(roomId, memberId, false));
    }

}
