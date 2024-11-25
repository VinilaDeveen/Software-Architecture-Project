package com.edu.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.lms.entity.Exam;
import com.edu.lms.exception.ExamAlreadyExistsException;
import com.edu.lms.exception.ExamNotFoundException;
import com.edu.lms.repository.ExamRepo;
import com.edu.lms.service.ExamService;

@Service
public class ExamServiceImpl implements ExamService {

    @Autowired
    private ExamRepo examRepo;

    @Override
    public Exam createExam(Exam exam) {
        List<Exam> existingExams = examRepo.findAll();
        for (Exam existingExam : existingExams) {
            if (existingExam.getExamTitle().equalsIgnoreCase(exam.getExamTitle())) {
                throw new ExamAlreadyExistsException("Exam with the title '" + exam.getExamTitle() + "' already exists.");
            }
        }
        return examRepo.save(exam);
    }

    @Override
    public List<Exam> getAllExam() {
        return examRepo.findAll();
    }

    @Override
    public Exam getByIdExam(Long examId) {
        return examRepo.findById(examId)
                .orElseThrow(() -> new ExamNotFoundException("Exam not found with ID: " + examId));
    }
}

