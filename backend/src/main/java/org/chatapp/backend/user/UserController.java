package org.chatapp.backend.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "${api.prefix}/users")
public class UserController {

    private final UserService userService;


    @PostMapping
    public ResponseEntity<UserDTO> login(@RequestBody final UserDTO userDTO) {
        return ResponseEntity.ok(userService.login(userDTO));
    }


    @MessageMapping("/user/connect") // Receives message from clients sending to /app/user/connect
    @SendTo("/topic/active") // Send the response to all clients subscribe to /topic/active
    public UserDTO connect(@RequestBody UserDTO userDTO) {
        return userService.connect(userDTO);
    }



    @MessageMapping("/user/disconnect") // Receives message from clients sending to /app/user/disconnect
    @SendTo("/topic/active") // Send the response to all clients subscribe to /topic/active
    public UserDTO disconnect(@RequestBody UserDTO userDTO) {
        return userService.logout(userDTO.getUsername());
    }


    @GetMapping("/online")
    public ResponseEntity<List<UserDTO>> getOnlineUsers() {
        return ResponseEntity.ok(userService.getOnlineUsers());
    }



    @GetMapping("/search/{username}")
    public ResponseEntity<List<UserDTO>> searchUsersByUsername(@PathVariable final String username) {
        return ResponseEntity.ok(userService.searchUsersByUsername(username));
    }



    @PostMapping("/avatar")
    public ResponseEntity<UserDTO> uploadAvatar(@RequestParam final MultipartFile file,
                                                @RequestParam final String username) {
        return ResponseEntity.ok(userService.uploadAvatar(file, username));
    }



    @Value("${github.token}")
    private String githubToken;

    @PostMapping("/update-avatar-url")
    public ResponseEntity<?> updateAvatarUrl(@RequestParam final MultipartFile file,
                                                   @RequestParam final String username) {
        // 1. convert file to base64
        try {
            String base64 = Base64.getEncoder().encodeToString(file.getBytes());

            // 2. upload url
            String repo = "real-time-chat-websocket-angular-spring-boot";
            String owner = "56duong";
            String newFileName = UUID.randomUUID() + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            String path = "storage/avatar/" + newFileName;
            // 3. upload
            String githubApiUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/" + "/contents/" + path;
            String jsonBody = "{\"message\": \"Upload avatar\", \"content\": \"" + base64 + "\"}";
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + githubToken);
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(githubApiUrl, HttpMethod.PUT, entity, String.class);
            // 4. update database
            String downloadUrl = new ObjectMapper()
                    .readTree(response.getBody())
                    .path("content")
                    .path("download_url")
                    .asText();
            return ResponseEntity.ok(userService.updateAvatarUrl(downloadUrl, username));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
        }
    }

}
