package org.chatapp.backend.messageroommember;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRoomMemberRepository extends JpaRepository<MessageRoomMember, MessageRoomMemberKey> {
    List<MessageRoomMember> findByMessageRoomId(final UUID messageRoomId);

    MessageRoomMember findByMessageRoomIdAndUserUsername(final UUID roomId, final String username);
}
