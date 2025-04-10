package org.chatapp.backend.messageroom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MessageRoomRepository extends JpaRepository<MessageRoom, UUID> {

    @Query("""
        SELECT messageRoom
        FROM MessageRoom messageRoom
        JOIN MessageRoomMember messageRoomMember
            ON messageRoomMember.messageRoom = messageRoom
        GROUP BY messageRoom.id
        HAVING COUNT(CASE WHEN messageRoomMember.user.username IN :members THEN 1 END) = :size
               AND COUNT(*) = :size
    """)
    Optional<MessageRoom> findMessageRoomByMembers(final List<String> members, final int size);



    @Query("""
        SELECT messageRoom
        FROM MessageRoom messageRoom
        JOIN MessageRoomMember messageRoomMember
            ON messageRoomMember.messageRoom = messageRoom
        JOIN MessageContent messageContent
            ON messageContent.messageRoom = messageRoom
        WHERE messageRoomMember.user.username = :username
        GROUP BY messageRoom.id
        HAVING COUNT(messageContent) > 0
        ORDER BY MAX(messageContent.dateSent) DESC
    """)
    List<MessageRoom> findMessageRoomAtLeastOneContent(final String username);

}





