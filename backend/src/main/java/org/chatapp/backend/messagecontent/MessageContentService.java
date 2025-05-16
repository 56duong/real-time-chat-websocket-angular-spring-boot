package org.chatapp.backend.messagecontent;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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



    public List<MessageContentDTO> getMessagesByRoomId(final UUID roomId) {
        return messageContentRepository.findByMessageRoomIdOrderByDateSent(roomId)
                .stream()
                .map(m -> messageContentMapper.toDTO(m, new MessageContentDTO()))
                .toList();
    }



    public MessageContentDTO save(final MessageContentDTO messageContentDTO) {
        final MessageContent messageContent = messageContentRepository.save(messageContentMapper.toEntity(messageContentDTO, new MessageContent()));
        return messageContentMapper.toDTO(messageContent, new MessageContentDTO());
    }



    public Long countUnseenMessage(final UUID roomId, final String username) {
        return messageContentRepository.countUnseenMessage(roomId, username);
    }

}





