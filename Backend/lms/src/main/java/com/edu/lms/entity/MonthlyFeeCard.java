package com.edu.lms.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Entity
@Data
public class MonthlyFeeCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @ManyToOne
    @JoinColumn(name = "stud_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private String year;

    @Column(nullable = false)
    private String month;

    private LocalDate issueDate;

    @Column(nullable = false)
    private boolean issued;

    @ElementCollection
    private List<Integer> attendanceWeeks = new ArrayList<>();

    @PrePersist
    protected void create() {
        if (this.issueDate == null) {
            this.issueDate = LocalDate.now();
        }
    }
}

