package com.edu.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.edu.lms.entity.Student;

@Service
public interface StudentService {
    Student createStudent(Student student);
    List<Student> getAllStudents();
    Student getByIdStudent(Long id);
    Student updateStudent(Long id, Student student);
    void deleteStudent(Long id);
}
