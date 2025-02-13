package com.wed.app.service;

import com.wed.app.model.User;
import com.wed.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
// import java.util.jar.Attributes.Name;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
        }

        // ค้นหาผู้ใช้โดยอีเมล
        public Optional<User> getUserByEmail(String email) {
            return userRepository.findByEmail(email);
        }

        // ค้นหาผู้ใช้โดยชื่อผู็ใช้
        public Optional<User> getUserByName(String name) {
            return userRepository.findByName(name);
        }
    
        public User addUser(User user) {
        System.out.println("User added successfully");
        return userRepository.save(user);
    }

    
}