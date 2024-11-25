package com.edu.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.lms.entity.Exam;

@Repository
public interface ExamRepo extends JpaRepository<Exam, Long>{
    
}
