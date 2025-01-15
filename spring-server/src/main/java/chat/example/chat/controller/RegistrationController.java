package chat.example.chat.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import chat.example.chat.dto.UserDto; //


@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(userDto.getEmail())
                .setPassword(userDto.getPassword())
                .setDisplayName(userDto.getName());

        try {
            UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
            return ResponseEntity.ok("User registered successfully with ID: " + userRecord.getUid());
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("User already exist");
        }
    }
}
