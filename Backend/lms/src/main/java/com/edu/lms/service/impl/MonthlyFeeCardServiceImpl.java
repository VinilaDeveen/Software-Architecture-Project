package com.edu.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.lms.dto.MonthlyFeeCardDTO;
import com.edu.lms.entity.MonthlyFeeCard;
import com.edu.lms.entity.Student;
import com.edu.lms.exception.CardNotFoundException;
import com.edu.lms.exception.StudentNotFoundException;
import com.edu.lms.repository.MonthlyFeeCardRepository;
import com.edu.lms.repository.StudentRepo;
import com.edu.lms.service.MonthlyFeeCardService;


@Service
public class MonthlyFeeCardServiceImpl implements MonthlyFeeCardService {

    @Autowired
    private MonthlyFeeCardRepository monthlyFeeCardRepository;

    @Autowired
    private StudentRepo studentRepo;

    @Override
    public MonthlyFeeCard createMonthlyFeeCard(MonthlyFeeCardDTO dto) {
        Student student = studentRepo.findById(dto.getStudentId())
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        MonthlyFeeCard card = new MonthlyFeeCard();
        card.setStudent(student);
        card.setYear(dto.getYear());
        card.setMonth(dto.getMonth());
        card.setIssued(dto.isIssued());

        return monthlyFeeCardRepository.save(card);
    }

    @Override
    public MonthlyFeeCard updateMonthlyFeeCard(Long cardId, MonthlyFeeCardDTO dto) {
        MonthlyFeeCard card = monthlyFeeCardRepository.findById(cardId)
                .orElseThrow(() -> new CardNotFoundException("Card not found"));
        card.setYear(dto.getYear());
        card.setMonth(dto.getMonth());
        card.setIssued(dto.isIssued());

        return monthlyFeeCardRepository.save(card);
    }

    @Override
    public List<MonthlyFeeCard> getCardsByStudentId(Long studId) {
        return monthlyFeeCardRepository.findByStudentStudId(studId);
    }

    @Override
    public void deleteMonthlyFeeCard(Long cardId) {
        monthlyFeeCardRepository.deleteById(cardId);
    }

    @Override
    public MonthlyFeeCard getCardsById(Long Id) {
        return monthlyFeeCardRepository.findById(Id).orElse(null);
    }

    @Override
    public MonthlyFeeCard updateAttentence(Long cardId, MonthlyFeeCardDTO dto) {
        MonthlyFeeCard card = monthlyFeeCardRepository.findById(cardId)
                .orElseThrow(() -> new CardNotFoundException("Card not found"));
        card.setAttendanceWeeks(dto.getAttendanceWeeks());

        return monthlyFeeCardRepository.save(card);
    }
    
}
