package com.wed.app.controller;

import com.wed.app.model.User;
import com.wed.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*") // หรือ "*"
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    // @GetMapping("/getuser")
    // public List<User> getAllUsers() {
    //     return userService.getAllUsers();
    // }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        User user = userService.getUserByEmail(email);

        if (user != null) {
            return ResponseEntity.ok(user);  // ✅ ส่งข้อมูลผู้ใช้กลับไป
        } else {
            return ResponseEntity.status(404).body("❌ User not found");
        }
    }


        
    @PostMapping("/adduser")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }
}