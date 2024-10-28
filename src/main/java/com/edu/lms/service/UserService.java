package com.edu.lms.service;

import org.springframework.stereotype.Service;

import com.edu.lms.entity.User;

@Service
public interface UserService {
    User createUser (User user);
}
