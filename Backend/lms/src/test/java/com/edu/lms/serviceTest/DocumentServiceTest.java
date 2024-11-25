package com.edu.lms.serviceTest;

import com.edu.lms.constant.DocumentConstants;
import com.edu.lms.entity.Document;
import com.edu.lms.exception.DocumentDoesNotExistsException;
import com.edu.lms.exception.DocumentWithUrlAlreadyExistsException;
import com.edu.lms.exception.InvalidDocumentException;
import com.edu.lms.repository.DocumentRepository;
import com.edu.lms.service.impl.DocumentServiceImp;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(value = MockitoExtension.class)
@TestInstance(value = TestInstance.Lifecycle.PER_CLASS)
public class DocumentServiceTest {

    private Document alreadyExistingDocument = getDocument().get(0);

    @Mock
    private DocumentRepository documentRepository;

    @InjectMocks
    private DocumentServiceImp documentService;

    @BeforeAll
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetDocument(){
        List<Document> documents = getDocument();
        when(documentRepository.findAll()).thenReturn(documents);
        assertAll("testGetDocument",()->assertEquals("New Document",documentService.getDocument().get(0).getTitle()),
                ()->assertEquals(LocalDate.now(),documentService.getDocument().get(0).getDate()),
                ()->assertEquals("hello this document is based on ME",documentService.getDocument().get(0).getDescription()),
                ()->assertEquals("http://localhost.com",documentService.getDocument().get(0).getUrl()));
    }

    // AddDocument() Invalid Add Document with null values
    @Test
    void testAddDocumentWithNullValues(){
        Document nullIncludedDocument = new Document(null,"","",LocalDate.now(),"");

        InvalidDocumentException exception = assertThrows(
                InvalidDocumentException.class,
                ()->documentService.addDocument(nullIncludedDocument)
        );
        assertEquals(DocumentConstants.InvalidDocument,exception.getMessage());
    }

    //AddDocument() - Document Already Exists
    @Test
    void testAddDocumentWithAlreadyExists(){
        Document newDocument = getDocument().get(0);
        Document alreadyExistingDocument = getDocument().get(0);

        // When the document repository is called for findDocumentByURL with "http://localhost.com" -> then return already Existing Document
        when(documentRepository.findDocumentByURL(newDocument.getUrl())).thenReturn(alreadyExistingDocument);
        DocumentWithUrlAlreadyExistsException exception = assertThrows(
                DocumentWithUrlAlreadyExistsException.class,
                ()->documentService.addDocument(newDocument)
        );
        assertEquals(DocumentConstants.DocumentAlreadyExists,exception.getMessage());
    }

    @Test
    //AddDocument() Valid Successful
    void testAddDocumentWithAllCorrect(){
        List<Document> newDocument = getDocument();

        // Mock documentService with newDocument when it look for available documents
        when(documentRepository.findAll()).thenReturn(newDocument);
        assertEquals(documentService.getDocument(),newDocument);
    }



    @Test
    //DeleteDocument() - valid successful
    void testDeleteDocumentSuccessful(){
        Document alreadyExistingDocument = getDocument().get(0) ;
        when(documentRepository.findById(1L)).thenReturn(Optional.of(alreadyExistingDocument));
        assertEquals("Document Successfully Got Deleted",documentService.deleteDocument(1L));
    }

    @Test
    //DeleteDocument() - invalid successful
    void testDeleteDocumentFailed(){
        when(documentRepository.findById(1L)).thenReturn(Optional.empty());
        DocumentDoesNotExistsException exception = assertThrows(DocumentDoesNotExistsException.class,
                ()->documentService.deleteDocument(1L)
        );
        assertEquals(DocumentConstants.DocumentNotExist,exception.getMessage());
    }
    @Test

    // UpdateDocument() - Document Does not exists
    void testUpdateDocumentInvalidNotExist(){

        Document currentDocument = getDocument().get(0);
        Document updateDocument = getDocument().get(0);

        // Mock there is no any existing document with same ID
        when(documentRepository.findById(currentDocument.getId())).thenReturn(Optional.empty());
        DocumentDoesNotExistsException exception = assertThrows(
                DocumentDoesNotExistsException.class,
                ()->documentService.updateDocument(1L,updateDocument)
        );
        assertEquals(DocumentConstants.DocumentDoesNotExistsID,exception.getMessage());
    }



    @Test
    //UpdateDocument - Document Successfully Updated
    public void testUpdateDocumentValidUpdate(){
        Document currentDocument = getDocument().get(0);
        Document updateDocument = getDocument().get(0);
        updateDocument.setDescription("Updated Description");
        updateDocument.setTitle("Updated Document");
        updateDocument.setUrl("http://localhost:8080");
        Document updatedDocument = new Document(1L,"Updated Document","http://localhost:8080",LocalDate.now(),"Updated Description");

        // Mock FindByID and FindByURL and Proceed SuccessFull Update
        when(documentRepository.findById(currentDocument.getId())).thenReturn(Optional.of(currentDocument));
        when(documentRepository.save(updateDocument)).thenReturn(updatedDocument);
        assertEquals("Document Updated Successfully",documentService.updateDocument(1L,updatedDocument));
    }
    private List <Document> getDocument(){
        Document document = new Document();
        document.setId(1L);
        document.setTitle("New Document");
        document.setDate(LocalDate.now());
        document.setDescription("hello this document is based on ME");
        document.setUrl("http://localhost.com");
        return Collections.singletonList(document);
    }
}
