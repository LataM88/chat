package chat.example.chat.controller;

import chat.example.chat.dto.FirebaseUserDto;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public ResponseEntity<List<FirebaseUserDto>> getAllUsers() {
        try {
            List<FirebaseUserDto> userDtos = new ArrayList<>();
            FirebaseAuth auth = FirebaseAuth.getInstance();
            for (UserRecord user : auth.listUsers(null).iterateAll()) {
                userDtos.add(new FirebaseUserDto(user.getUid(), user.getDisplayName(), user.getEmail()));
            }
            return ResponseEntity.ok(userDtos);
        } catch (FirebaseAuthException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
