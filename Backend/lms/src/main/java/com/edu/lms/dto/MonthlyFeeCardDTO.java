package com.edu.lms.dto;

import java.util.List;

import lombok.Data;

@Data
public class MonthlyFeeCardDTO {
    private Long studentId;
    private String year;
    private String month;
    private boolean issued;
    private List<Integer> attendanceWeeks;
}
