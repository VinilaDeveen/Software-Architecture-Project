package com.edu.lms.controllerTest;

import com.edu.lms.constant.DocumentConstants;
import com.edu.lms.controller.DocumentController;
import com.edu.lms.entity.Document;
import com.edu.lms.service.DocumentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static java.nio.file.Paths.get;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(value = MockitoExtension.class)
public class DocumentControllerTest {

    @Mock
    private DocumentService documentService;

    @InjectMocks
    private DocumentController documentController;

    private MockMvc mockMvc;

    @BeforeEach
    void setup(){
        mockMvc = MockMvcBuilders.standaloneSetup(documentController).build();
    }

    //CreateDocument()
    @Test
    public void testCreateDocument() throws Exception {
        Document document = getDocument().get(0);
        when(documentService.addDocument(any(Document.class))).thenReturn(DocumentConstants.SuccessfulDocument);
        mockMvc.perform(post("/api/v1/document/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\": \"Sample Title\",\"url\":\"https://www.google.com\",\"description\":\"Sample Description\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string(DocumentConstants.SuccessfulDocument));

        verify(documentService,times(1)).addDocument(any(Document.class));
    }
    //GetAll()
    @Test
    public void testGetAllDocuments() throws Exception{
        List<Document> document = getDocument();
        when(documentService.getDocument()).thenReturn(getDocument());
        mockMvc.perform(get("/api/v1/document/get")
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].title").value("New Document"))
                .andExpect(jsonPath("$[0].url").value("http://localhost.com"));
        verify(documentService,times(1)).getDocument();
    }



    private List<Document> getDocument(){
        Document document = new Document();
        document.setId(1L);
        document.setTitle("New Document");
        document.setDate(LocalDate.now());
        document.setDescription("hello this document is based on ME");
        document.setUrl("http://localhost.com");
        return Collections.singletonList(document);
    }

}
