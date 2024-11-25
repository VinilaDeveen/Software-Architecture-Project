package com.edu.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.edu.lms.entity.User;
import com.edu.lms.exception.UserAlreadyExistsException;
import com.edu.lms.exception.UserNotFoundException;
import com.edu.lms.repository.UserRepo;
import com.edu.lms.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(User user) {
        if (userRepo.findByUsername(user.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("Username already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User getByIdCustomer(Long id) {
        return userRepo.findById(id).orElseThrow(() -> 
            new UserNotFoundException("User with ID " + id + " not found"));
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = userRepo.findById(id).orElseThrow(() -> 
            new UserNotFoundException("User with ID " + id + " not found"));

        existingUser.setName(user.getName());
        existingUser.setContactNo(user.getContactNo());
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepo.save(existingUser);
    }

    @Override
    public void deleteCustomer(Long id) {
        if (!userRepo.existsById(id)) {
            throw new UserNotFoundException("User with ID " + id + " not found");
        }
        userRepo.deleteById(id);
    }
}

