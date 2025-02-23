package org.chatapp.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "${api.prefix}/users")
public class UserController {

    private final UserService userService;


    @PostMapping
    public ResponseEntity<UserDTO> login(@RequestBody final UserDTO userDTO) {
        return ResponseEntity.ok(userService.login(userDTO));
    }

}
