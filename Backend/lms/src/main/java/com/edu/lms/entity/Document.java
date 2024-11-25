package com.edu.lms.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Document")

public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, name = "title")
    private String title;
    @Column(unique = true,nullable = false,name = "document_Url")
    private String url;
    @Column(name = "Upload_Date")
    private LocalDate date = LocalDate.now();
    @Column(nullable = false,name = "Description")
    private String description;
}
