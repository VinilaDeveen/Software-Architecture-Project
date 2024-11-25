package com.edu.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.lms.entity.Student;
import com.edu.lms.exception.StudentAlreadyExistsException;
import com.edu.lms.exception.StudentNotFoundException;
import com.edu.lms.repository.StudentRepo;
import com.edu.lms.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    private StudentRepo studentRepo;

    @Override
    public Student createStudent(Student student) {
        if (studentRepo.findById(student.getId()).isPresent()) {
            throw new StudentAlreadyExistsException("Student with ID " + student.getId() + " already exists!");
        }
        return studentRepo.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    @Override
    public Student getByIdStudent(Long id) {
        return studentRepo.findById(id).orElseThrow(() -> 
            new StudentNotFoundException("Student with ID " + id + " not found"));
    }

    @Override
    public Student updateStudent(Long id, Student student) {
        Student existingStudent = studentRepo.findById(id).orElseThrow(() -> 
            new StudentNotFoundException("Student with ID " + id + " not found"));

        existingStudent.setStudName(student.getStudName());
        existingStudent.setPhoneNo(student.getPhoneNo());

        return studentRepo.save(existingStudent);
    }

    @Override
    public void deleteStudent(Long id) {
        if (!studentRepo.existsById(id)) {
            throw new StudentNotFoundException("Student with ID " + id + " not found");
        }
        studentRepo.deleteById(id);
    }
}
