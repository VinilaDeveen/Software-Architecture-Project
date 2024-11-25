package com.edu.lms.service;

import org.springframework.stereotype.Service;

import com.edu.lms.entity.Document;

import java.util.List;

@Service
public interface DocumentService {
    public String addDocument(Document document); // Test Done
    public List<Document> getDocument(); // Test Done
    public Document findDocumentById(Long id);
    public String deleteDocument(Long id); // Test Done
    public String updateDocument(Long id,Document document); // Test Done
}
