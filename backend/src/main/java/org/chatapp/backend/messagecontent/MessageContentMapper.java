package org.chatapp.backend.messagecontent;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.chatapp.backend.messageroom.MessageRoom;
import org.chatapp.backend.messageroom.MessageRoomRepository;
import org.chatapp.backend.user.User;
import org.chatapp.backend.user.UserRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageContentMapper {

    private final MessageRoomRepository messageRoomRepository;
    private final UserRepository userRepository;


    public MessageContentDTO toDTO(final MessageContent messageContent, final MessageContentDTO messageContentDTO) {
        messageContentDTO.setId(messageContent.getId());
        messageContentDTO.setContent(messageContent.getContent());
        messageContentDTO.setDateSent(messageContent.getDateSent());
        messageContentDTO.setMessageType(messageContent.getMessageType());
        messageContentDTO.setMessageRoomId(messageContent.getMessageRoom().getId());
        messageContentDTO.setSender(messageContent.getUser().getUsername());
        messageContentDTO.setAvatarUrl(messageContent.getUser().getAvatarUrl());
        return messageContentDTO;
    }


    public MessageContent toEntity(final MessageContentDTO messageContentDTO, final MessageContent messageContent) {
        messageContent.setId(messageContentDTO.getId());
        messageContent.setContent(messageContentDTO.getContent());
        messageContent.setDateSent(messageContentDTO.getDateSent());
        messageContent.setMessageType(messageContentDTO.getMessageType());
        final MessageRoom messageRoom = messageContentDTO.getMessageRoomId() == null ? null : messageRoomRepository.findById(messageContentDTO.getMessageRoomId())
                .orElseThrow(() -> new EntityNotFoundException("Message room not found"));
        messageContent.setMessageRoom(messageRoom);
        final User user = messageContentDTO.getSender() == null ? null : userRepository.findById(messageContentDTO.getSender())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        messageContent.setUser(user);
        return messageContent;
    }

}
