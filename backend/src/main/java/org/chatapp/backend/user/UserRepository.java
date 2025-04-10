package org.chatapp.backend.user;

import org.chatapp.backend.messageroommember.MessageRoomMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    List<User> findAllByStatus(UserStatus status);
    List<User> findAllByUsernameContainingIgnoreCase(String username);
    List<User> findAllByUsernameIn(List<String> usernames);
}
