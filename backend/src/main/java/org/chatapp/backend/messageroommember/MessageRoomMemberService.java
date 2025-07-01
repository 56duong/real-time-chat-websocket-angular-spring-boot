package org.chatapp.backend.messageroommember;

import lombok.RequiredArgsConstructor;
import org.chatapp.backend.messagecontent.MessageContentDTO;
import org.chatapp.backend.messagecontent.MessageContentMapper;
import org.chatapp.backend.messagecontent.MessageContentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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



    public MessageRoomMemberDTO updateLastSeen(final UUID roomId, final String username) {
        final MessageRoomMember member = messageRoomMemberRepository.findByMessageRoomIdAndUserUsername(roomId, username);
        member.setLastSeen(LocalDateTime.now());
        return messageRoomMemberMapper.toDTO(messageRoomMemberRepository.save(member), new MessageRoomMemberDTO());
    }



    public List<MessageRoomMemberDTO> addMembers(final UUID roomId, final List<MessageRoomMemberDTO> memberDTOS) {
        final List<MessageRoomMember> members = memberDTOS.stream()
                .map(dto -> {
                    dto.setMessageRoomId(roomId);
                    return messageRoomMemberMapper.toEntity(dto, new MessageRoomMember());
                }).toList();

        messageRoomMemberRepository.saveAll(members);

        return members.stream()
                .map(member -> messageRoomMemberMapper.toDTO(member, new MessageRoomMemberDTO()))
                .collect(Collectors.toList());
    }



    public Boolean removeMember(final UUID roomId, final String memberId) {
        final MessageRoomMember messageRoomMember = messageRoomMemberRepository.findByMessageRoomIdAndUserUsername(roomId, memberId);
        messageRoomMemberRepository.delete(messageRoomMember);
        return true;
    }



    public MessageRoomMemberDTO adminAssign(final UUID roomId, final String memberId, final Boolean idAdmin) {
        final MessageRoomMember messageRoomMember = messageRoomMemberRepository.findByMessageRoomIdAndUserUsername(roomId, memberId);
        messageRoomMember.setIsAdmin(idAdmin);
        messageRoomMemberRepository.save(messageRoomMember);
        return messageRoomMemberMapper.toDTO(messageRoomMember, new MessageRoomMemberDTO());
    }

}





