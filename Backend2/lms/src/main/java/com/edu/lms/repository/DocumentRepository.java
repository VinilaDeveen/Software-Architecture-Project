package com.edu.lms.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.edu.lms.entity.Document;

public interface DocumentRepository extends JpaRepository<Document,Long> {
    @Query(value = "SELECT * FROM document WHERE document_url = :url",nativeQuery = true)
    Document findDocumentByURL(@Param("url")String url);
}
