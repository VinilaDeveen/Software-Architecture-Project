package com.edu.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.lms.entity.ExamMark;
import com.edu.lms.exception.ExamNotFoundException;
import com.edu.lms.exception.InvalidExamMarkException;
import com.edu.lms.repository.ExamMarkRepo;
import com.edu.lms.service.ExamMarkService;

@Service
public class ExamMarkServiceImpl implements ExamMarkService {

    @Autowired
    private ExamMarkRepo examMarkRepo;

    @Override
    public ExamMark createMark(ExamMark examMark) {
        if (examMark.getMark() == null || examMark.getMark() < 0 || examMark.getMark() > 100) {
            throw new InvalidExamMarkException("Exam mark must be between 0 and 100.");
        }
        return examMarkRepo.save(examMark);
    }

    @Override
    public List<ExamMark> getAllMark() {
        return examMarkRepo.findAll();
    }

    @Override
    public ExamMark getMarkById(Long examMarkId) {
        return examMarkRepo.findById(examMarkId)
                .orElseThrow(() -> new ExamNotFoundException("Exam mark not found with ID: " + examMarkId));
    }

    @Override
    public ExamMark updateMark(Long examMarkId, ExamMark examMark) {
        if (examMark.getMark() < 0 || examMark.getMark() > 100) {
            throw new InvalidExamMarkException("Exam mark must be between 0 and 100.");
        }

        ExamMark existingMark = examMarkRepo.findById(examMarkId)
                .orElseThrow(() -> new ExamNotFoundException("Exam mark not found with ID: " + examMarkId));

        existingMark.setMark(examMark.getMark());
        return examMarkRepo.save(existingMark);
    }

    @Override
    public void deleteMark(Long examMarkId) {
        if (!examMarkRepo.existsById(examMarkId)) {
            throw new ExamNotFoundException("Exam mark not found with ID: " + examMarkId);
        }
        examMarkRepo.deleteById(examMarkId);
    }
}

