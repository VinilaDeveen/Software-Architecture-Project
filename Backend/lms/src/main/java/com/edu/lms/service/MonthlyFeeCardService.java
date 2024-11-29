package com.edu.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.edu.lms.dto.MonthlyFeeCardDTO;
import com.edu.lms.entity.MonthlyFeeCard;

@Service
public interface MonthlyFeeCardService {
    MonthlyFeeCard createMonthlyFeeCard(MonthlyFeeCardDTO dto);
    MonthlyFeeCard updateMonthlyFeeCard(Long cardId, MonthlyFeeCardDTO dto);
    List<MonthlyFeeCard> getCardsByStudentId(Long studId);
    MonthlyFeeCard getCardsById(Long Id);
    void deleteMonthlyFeeCard(Long cardId);
    MonthlyFeeCard updateAttentence(Long cardId, MonthlyFeeCardDTO dto);
}
