package org.chatapp.backend.messageroommember;

import lombok.RequiredArgsConstructor;
import org.chatapp.backend.messagecontent.MessageContentDTO;
import org.chatapp.backend.messagecontent.MessageContentMapper;
import org.chatapp.backend.messagecontent.MessageContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageRoomMemberService {

    private final MessageRoomMemberRepository messageRoomMemberRepository;
    private final MessageRoomMemberMapper messageRoomMemberMapper;



    public List<MessageRoomMemberDTO> findByMessageRoomId(final UUID messageRoomId) {
        return messageRoomMemberRepository.findByMessageRoomId(messageRoomId)
                .stream()
                .map(m -> messageRoomMemberMapper.toDTO(m, new MessageRoomMemberDTO()))
                .toList();
    }

}





