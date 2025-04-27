package com.example.leavemanagement.controller;

import com.example.leavemanagement.model.Leave;
import com.example.leavemanagement.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaveController {
    @Autowired
    private LeaveService leaveService;
    
    @PostMapping
    public ResponseEntity<?> applyLeave(@RequestBody Leave leave) {
        try {
            Leave savedLeave = leaveService.applyLeave(leave);
            return ResponseEntity.ok(savedLeave);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{leaveId}/status")
    public ResponseEntity<?> updateLeaveStatus(
            @PathVariable String leaveId,
            @RequestParam String status,
            @RequestParam String approvedBy) {
        try {
            Leave updatedLeave = leaveService.updateLeaveStatus(leaveId, status, approvedBy);
            return ResponseEntity.ok(updatedLeave);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserLeaves(@PathVariable String userId) {
        try {
            List<Leave> leaves = leaveService.getUserLeaves(userId);
            return ResponseEntity.ok(leaves);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/pending")
    public ResponseEntity<?> getPendingLeaves() {
        try {
            List<Leave> leaves = leaveService.getPendingLeaves();
            return ResponseEntity.ok(leaves);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/{leaveId}")
    public ResponseEntity<?> getLeaveById(@PathVariable String leaveId) {
        try {
            Leave leave = leaveService.getLeaveById(leaveId);
            return ResponseEntity.ok(leave);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 