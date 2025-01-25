package chat.example.chat.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import chat.example.chat.dto.LoginDto;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginDto userDto) {
        Map<String, Object> response = new HashMap<>();
        try {
            FirebaseAuth auth = FirebaseAuth.getInstance();
            var userRecord = auth.getUserByEmail(userDto.getEmail());

            response.put("message", "Login successful");
            response.put("userId", userRecord.getUid());
            return ResponseEntity.ok(response);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(400).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Internal server error");
            return ResponseEntity.status(500).body(response);
        }
    }
}