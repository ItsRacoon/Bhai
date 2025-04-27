package com.example.leavemanagement.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Data
@Document(collection = "leaves")
public class Leave {
    @Id
    private String id;
    private String userId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String type;
    private String reason;
    private String status; // PENDING, APPROVED, REJECTED
    private String approvedBy;
    private LocalDate createdAt;
    private LocalDate updatedAt;
} 