package com.edu.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.edu.lms.entity.Exam;

@Service
public interface ExamService {
    Exam createExam (Exam exam);
    List<Exam> getAllExam ();
    Exam getByIdExam (Long examId);
} 
