package org.chatapp.backend.messageroom;

import lombok.RequiredArgsConstructor;
import org.chatapp.backend.messagecontent.MessageContent;
import org.chatapp.backend.messagecontent.MessageContentDTO;
import org.chatapp.backend.messagecontent.MessageContentService;
import org.chatapp.backend.messageroommember.MessageRoomMember;
import org.chatapp.backend.messageroommember.MessageRoomMemberDTO;
import org.chatapp.backend.messageroommember.MessageRoomMemberService;
import org.chatapp.backend.user.User;
import org.chatapp.backend.user.UserDTO;
import org.chatapp.backend.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageRoomService {

    private final MessageRoomRepository messageRoomRepository;
    private final MessageRoomMapper messageRoomMapper;
    private final UserRepository userRepository;
    private final MessageContentService messageContentService;
    private final MessageRoomMemberService messageRoomMemberService;



    public MessageRoomDTO findMessageRoomByMembers(final List<String> members) {
        return messageRoomRepository.findMessageRoomByMembers(members, members.size())
                .map(m -> messageRoomMapper.toDTO(m, new MessageRoomDTO()))
                .orElse(null);
    }



    @Transactional
    public MessageRoomDTO create(final List<String> members, String username) {
        final User user = userRepository.findById(username).orElseThrow();

        MessageRoom messageRoom = MessageRoom.builder()
                                    .isGroup(members.size() > 2)
                                    .createdBy(user)
                                    .members(new ArrayList<>())
                                    .build();

        final List<User> users = userRepository.findAllByUsernameIn(members);

        users.forEach(u -> {
            final MessageRoomMember messageRoomMember = MessageRoomMember.builder()
                                                        .messageRoom(messageRoom)
                                                        .user(u)
                                                        .isAdmin(u.getUsername().equals(username))
                                                        .lastSeen(LocalDateTime.now())
                                                        .build();
            messageRoom.getMembers().add(messageRoomMember);
        });

        //temp
        MessageContent messageContent = MessageContent.builder()
                .content("Hi")
                .dateSent(LocalDateTime.now())
                .messageRoom(messageRoom)
                .user(user)
                .build();

        if(messageRoom.getMessageContents() == null) {
            messageRoom.setMessageContents(new ArrayList<>());
        }
        messageRoom.getMessageContents().add(messageContent);

        MessageRoom saved = messageRoomRepository.save(messageRoom);

        return messageRoomMapper.toDTO(saved, new MessageRoomDTO());
    }



    public List<MessageRoomDTO> findMessageRoomAtLeastOneContent(final String username) {
        return messageRoomRepository.findMessageRoomAtLeastOneContent(username)
                .stream()
                .map(m -> {
                    final MessageRoomDTO roomDTO = messageRoomMapper.toDTO(m, new MessageRoomDTO());
                    final MessageContentDTO lastMessage = messageContentService.getLastMessage(roomDTO.getId());
                    roomDTO.setLastMessage(lastMessage);
                    final List<MessageRoomMemberDTO> members = messageRoomMemberService.findByMessageRoomId(roomDTO.getId());
                    roomDTO.setMembers(members);
                    return roomDTO;
                })
                .toList();
    }

}





