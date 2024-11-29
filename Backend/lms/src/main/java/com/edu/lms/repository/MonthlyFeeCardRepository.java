package com.edu.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edu.lms.entity.MonthlyFeeCard;

@Repository
public interface MonthlyFeeCardRepository extends JpaRepository<MonthlyFeeCard, Long> {
    List<MonthlyFeeCard> findByStudentStudId(Long studId); // Use the primary key of the Student entity
}
