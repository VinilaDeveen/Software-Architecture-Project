package com.edu.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.edu.lms.entity.User;

@Service
public interface UserService {
    User createUser (User user);
    List<User> getAllUsers();
    User getByIdCustomer(Long id);
    User updateUser(Long id, User user);
    void deleteCustomer(Long id);
}
