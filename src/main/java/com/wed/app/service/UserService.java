package com.wed.app.service;

import com.wed.app.model.User;
import com.wed.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
        }

        // ค้นหาผู้ใช้โดยอีเมล
        public User getUserByEmail(String email) {
            return userRepository.findByEmail(email).orElse(null);
        }
    
        public User addUser(User user) {
        System.out.println("User added successfully");
        return userRepository.save(user);
    }

    
}