package org.chatapp.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;


    public UserDTO login(final UserDTO userDTO) {
        final User user = userRepository.findById(userDTO.getUsername())
                .orElseGet(() -> createUser(userDTO));

        validatePassword(userDTO, user.getPassword());

        return userMapper.toDTO(user, new UserDTO());
    }


    private void validatePassword(UserDTO userDTO, String password) {
        if(!userDTO.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid password");
        }
    }


    private User createUser(UserDTO userDTO) {
        final User user = User.builder()
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .status(UserStatus.ONLINE)
                .lastLogin(LocalDateTime.now())
                .build();
        return userRepository.save(user);
    }


    public UserDTO connect(UserDTO userDTO) {
        Optional<User> user = userRepository.findById(userDTO.getUsername());
        user.ifPresent(u -> {
            u.setStatus(UserStatus.ONLINE);
            userRepository.save(u);
        });
        return user.map(u -> userMapper.toDTO(u, new UserDTO())).orElse(null);
    }



    public List<UserDTO> getOnlineUsers() {
        return userRepository.findAllByStatus(UserStatus.ONLINE)
                .stream()
                .map(u -> userMapper.toDTO(u, new UserDTO()))
                .toList();
    }



    public UserDTO logout(final String username) {
        Optional<User> user = userRepository.findById(username);
        user.ifPresent(u -> {
            u.setStatus(UserStatus.OFFLINE);
            u.setLastLogin(LocalDateTime.now());
            userRepository.save(u);
        });
        return user.map(u -> userMapper.toDTO(u, new UserDTO())).orElse(null);
    }

}





