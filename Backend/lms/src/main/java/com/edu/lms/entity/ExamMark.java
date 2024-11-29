package com.edu.lms.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;


@Entity
@Data
public class ExamMark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examMarkId;

    @ManyToOne
    @JoinColumn(name = "stud_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private Double mark;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;


}
