package com.edu.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.lms.entity.ExamMark;

@Repository
public interface ExamMarkRepo extends JpaRepository<ExamMark, Long>{
}
