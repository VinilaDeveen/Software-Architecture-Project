package com.edu.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.lms.entity.Student;


@Repository
public interface StudentRepo extends JpaRepository<Student, Long>{
    Optional<Student> findById(String id);
}
