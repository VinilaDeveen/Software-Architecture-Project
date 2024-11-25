package com.edu.lms.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studId;

    @Column(nullable = false)
    private String id;

    @Column(nullable = false)
    private String studName;

    @Column(nullable = false)
    private String phoneNo;

}
