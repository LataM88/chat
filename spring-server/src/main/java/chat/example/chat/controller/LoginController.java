package chat.example.chat.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import chat.example.chat.dto.LoginDto;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @PostMapping
    public ResponseEntity<String> loginUser(@RequestBody LoginDto userDto) {
        try {
            // Weryfikacja użytkownika
            FirebaseAuth auth = FirebaseAuth.getInstance();
            auth.getUserByEmail(userDto.getEmail()); // Sprawdzenie, czy użytkownik istnieje

            // Tu możesz użyć innej metody do obsługi tokenów JWT
            return ResponseEntity.ok("Login successful");
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Invalid email or password");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error");
        }
    }
}
