package com.example.leavemanagement.service;

import com.example.leavemanagement.model.Leave;
import com.example.leavemanagement.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class LeaveService {
    @Autowired
    private LeaveRepository leaveRepository;
    
    public Leave applyLeave(Leave leave) {
        leave.setStatus("PENDING");
        leave.setCreatedAt(LocalDate.now());
        leave.setUpdatedAt(LocalDate.now());
        return leaveRepository.save(leave);
    }
    
    public Leave updateLeaveStatus(String leaveId, String status, String approvedBy) {
        Leave leave = leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
                
        leave.setStatus(status);
        leave.setApprovedBy(approvedBy);
        leave.setUpdatedAt(LocalDate.now());
        return leaveRepository.save(leave);
    }
    
    public List<Leave> getUserLeaves(String userId) {
        return leaveRepository.findByUserId(userId);
    }
    
    public List<Leave> getPendingLeaves() {
        return leaveRepository.findByStatus("PENDING");
    }
    
    public Leave getLeaveById(String leaveId) {
        return leaveRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));
    }
} 