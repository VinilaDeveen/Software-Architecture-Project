package com.edu.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.edu.lms.entity.ExamMark;

@Service
public interface ExamMarkService {
    ExamMark createMark(ExamMark examMark);
    List<ExamMark> getAllMark();
    ExamMark getMarkById(Long examMarkId);
    ExamMark updateMark(Long examMarkId, ExamMark examMark);
    void deleteMark(Long examMarkId);
}
