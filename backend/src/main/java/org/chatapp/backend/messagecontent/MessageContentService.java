package org.chatapp.backend.messagecontent;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MessageContentService {

    private final MessageContentRepository messageContentRepository;
    private final MessageContentMapper messageContentMapper;



    public MessageContentDTO getLastMessage(final UUID messageRoomId) {
        return messageContentRepository.findTopByMessageRoomIdOrderByDateSentDesc(messageRoomId)
                .map(m -> messageContentMapper.toDTO(m, new MessageContentDTO()))
                .orElse(null);
    }

}





