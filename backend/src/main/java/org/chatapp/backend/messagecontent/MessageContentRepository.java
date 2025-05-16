package org.chatapp.backend.messagecontent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageContentRepository extends JpaRepository<MessageContent, UUID> {
    Optional<MessageContent> findTopByMessageRoomIdOrderByDateSentDesc(final UUID messageRoomId);
    List<MessageContent> findByMessageRoomIdOrderByDateSent(final UUID messageRoomId);

    @Query("""
        SELECT COUNT(*)
        FROM MessageContent messageContent
        JOIN MessageRoomMember messageRoomMember
            ON messageContent.messageRoom = messageRoomMember.messageRoom
        WHERE messageRoomMember.user.username = :username
            AND messageContent.messageRoom.id = :roomId
            AND messageContent.user.username <> :username
            AND messageContent.dateSent > messageRoomMember.lastSeen
    """)
    Long countUnseenMessage(final UUID roomId, final String username);
}
