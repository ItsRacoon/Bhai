package com.example.leavemanagement.repository;

import com.example.leavemanagement.model.Leave;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LeaveRepository extends MongoRepository<Leave, String> {
    List<Leave> findByUserId(String userId);
    List<Leave> findByStatus(String status);
} 