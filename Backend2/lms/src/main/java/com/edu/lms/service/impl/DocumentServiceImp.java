package com.edu.lms.service.impl;

import com.edu.lms.constant.DocumentConstants;
import com.edu.lms.entity.Document;
import com.edu.lms.exception.DocumentDoesNotExistsException;
import com.edu.lms.exception.DocumentWithUrlAlreadyExistsException;
import com.edu.lms.exception.InvalidDocumentException;
import com.edu.lms.repository.DocumentRepository;
import com.edu.lms.service.DocumentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DocumentServiceImp implements DocumentService {
    @Autowired
    private DocumentRepository documentRepository;
    @Override
    public String addDocument(Document document) {
        Document existDocument = documentRepository.findDocumentByURL(document.getUrl());
        if (document.getUrl()==null||document.getDescription()==null || document.getTitle()==null || document.getUrl().equals("")|| document.getDescription().equals("") || document.getTitle().equals("")){
            throw new InvalidDocumentException(DocumentConstants.InvalidDocument);
        }else {
            if (existDocument!=null){
                throw new DocumentWithUrlAlreadyExistsException(DocumentConstants.DocumentAlreadyExists);
            }else {
                documentRepository.save(document);
                return DocumentConstants.SuccessfulDocument;
            }
        }
    }

    @Override
    public List<Document> getDocument() {
        return documentRepository.findAll();
    }

    @Override
    public Document findDocumentById(Long id) {
        Document document = documentRepository.findById(id).orElse(null);
        if (document ==null){
            throw new DocumentDoesNotExistsException(DocumentConstants.DocumentNotExist);
        }else {
            return document;
        }
    }

    @Override
    public String deleteDocument(Long id) {
        Document document = documentRepository.findById(id).orElse(null);
        if (document == null){
            throw new DocumentDoesNotExistsException(DocumentConstants.DocumentNotExist);
        }else{
            documentRepository.deleteById(id);
            return "Document Successfully Got Deleted";
        }
    }

    @Override
    public String updateDocument(Long id,Document document) {
        Document existDocument = documentRepository.findById(id).orElse(null);
        if(existDocument == null){
            throw new DocumentDoesNotExistsException(DocumentConstants.DocumentDoesNotExistsID);
        }else {

                System.out.println(document);
                existDocument.setUrl(document.getUrl());
                existDocument.setId(id);
                existDocument.setTitle(document.getTitle());
                existDocument.setDate(LocalDate.now());
                existDocument.setDescription(document.getDescription());
                documentRepository.save(existDocument);
                return "Document Updated Successfully";

        }
    }
}


