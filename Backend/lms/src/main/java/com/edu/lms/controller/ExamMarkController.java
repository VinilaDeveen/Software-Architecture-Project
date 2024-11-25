package com.edu.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.lms.dto.MarkDto;
import com.edu.lms.entity.Exam;
import com.edu.lms.entity.ExamMark;
import com.edu.lms.entity.Student;
import com.edu.lms.exception.ExamNotFoundException;
import com.edu.lms.exception.InvalidExamMarkException;
import com.edu.lms.exception.StudentNotFoundException;
import com.edu.lms.repository.ExamRepo;
import com.edu.lms.repository.StudentRepo;
import com.edu.lms.service.ExamMarkService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("api/v1/examMark")
@CrossOrigin(origins = "*")
public class ExamMarkController {
    @Autowired
    private ExamMarkService examMarkService;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ExamRepo examRepo;

    @PostMapping("")
    public ResponseEntity<String> createExamMark(@RequestBody MarkDto markDto) {
        if (markDto.getMark() == null || markDto.getMark() < 0 || markDto.getMark() > 100) {
            throw new InvalidExamMarkException("Exam mark must be between 0 and 100.");
        }

        Student student = studentRepo.findById(markDto.getId())
                .orElseThrow(() -> new StudentNotFoundException("Student not found with ID: " + markDto.getId()));

        Exam exam = examRepo.findById(markDto.getExamId())
                .orElseThrow(() -> new ExamNotFoundException("Exam not found with ID: " + markDto.getExamId()));

        ExamMark examMark = new ExamMark();
        examMark.setStudent(student);
        examMark.setExam(exam);
        examMark.setMark(markDto.getMark());

        examMarkService.createMark(examMark);
        return ResponseEntity.status(HttpStatus.CREATED).body("Mark added successfully");
    }

    @PutMapping("/{examMarkId}")
    public ResponseEntity<ExamMark> updateMark(@PathVariable Long examMarkId, @RequestBody ExamMark examMark) {
        if (examMark.getMark() < 0 || examMark.getMark() > 100) {
            throw new InvalidExamMarkException("Exam mark must be between 0 and 100.");
        }

        ExamMark updatedMark = examMarkService.updateMark(examMarkId, examMark);
        if (updatedMark == null) {
            throw new ExamNotFoundException("ExamMark not found with ID: " + examMarkId);
        }

        return ResponseEntity.status(HttpStatus.OK).body(updatedMark);
    }

    @DeleteMapping("/{examMarkId}")
    public void deleteMark(@PathVariable Long examMarkId){
        examMarkService.deleteMark(examMarkId);
    }

}
