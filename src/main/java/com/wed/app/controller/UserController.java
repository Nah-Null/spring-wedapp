package com.wed.app.controller;

import com.wed.app.model.User;
import com.wed.app.service.UserService;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "http://localhost:8000") // หรือ "*"
@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    // @GetMapping("/getuser")
    // public List<User> getAllUsers() {
    //     return userService.getAllUsers();
    // }

    @GetMapping("/getByEmail")
    public ResponseEntity<?> getUserByEmail(@RequestParam("email") String email) {
        Optional<User> user = userService.getUserByEmail(email);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());  // ✅ ส่งข้อมูลผู้ใช้กลับไป
        } else {
            return ResponseEntity.status(404).body("❌ User not found");
        }
    }

    @GetMapping("/getByName")
    public ResponseEntity<?> getUserByName(@RequestParam("name") String name) {
        Optional<User> user = userService.getUserByName(name);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());  // ✅ ส่งข้อมูลผู้ใช้กลับไป
        } else {
            return ResponseEntity.status(404).body("❌ User not found");
        }
    }

        
    @PostMapping("/adduser")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        Optional<User> existingUserByEmail = userService.getUserByEmail(user.getEmail());
        Optional<User> existingUserByName = userService.getUserByName(user.getName());

        if (existingUserByEmail.isPresent() || existingUserByName.isPresent()) {
            return ResponseEntity.status(409).body("❌ Email หรือชื่อผู้ใช้นี้มีผู้ใช้งานแล้ว");
        }

        User newUser = userService.addUser(user);
        return ResponseEntity.ok(newUser);
    }
}