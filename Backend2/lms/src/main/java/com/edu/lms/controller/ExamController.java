package com.edu.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.lms.entity.Exam;
import com.edu.lms.exception.ExamNotFoundException;
import com.edu.lms.service.ExamService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("api/v1/exam")
@CrossOrigin(origins = "*")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping("")
    public ResponseEntity<String> createExam(@RequestBody Exam exam) {
        if (exam.getExamTitle() == null || exam.getExamTitle().isEmpty()) {
            throw new IllegalArgumentException("Exam title cannot be null or empty.");
        }

        examService.createExam(exam);
        return ResponseEntity.status(HttpStatus.CREATED).body("Exam created successfully");
    }

    @GetMapping("/{examId}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long examId) {
        Exam exam = examService.getByIdExam(examId);
        if (exam == null) {
            throw new ExamNotFoundException("Exam not found with ID: " + examId);
        }

        return ResponseEntity.status(HttpStatus.OK).body(exam);
    }

    @GetMapping("")
    public ResponseEntity<List<Exam>> getAllExam() {
        List<Exam> exams = examService.getAllExam();
        return ResponseEntity.status(HttpStatus.OK).body(exams);
    }
}

