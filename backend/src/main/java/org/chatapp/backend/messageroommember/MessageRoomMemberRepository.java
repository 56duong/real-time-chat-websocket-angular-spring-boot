package org.chatapp.backend.messageroommember;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRoomMemberRepository extends JpaRepository<MessageRoomMember, MessageRoomMemberKey> {
}
