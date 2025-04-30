package com.example.Backend.controller;

import com.example.Backend.config.JwtTokenUtil;
import com.example.Backend.model.ProfileDetails;
import com.example.Backend.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService profileService;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public ProfileController(ProfileService profileService, JwtTokenUtil jwtTokenUtil) {
        this.profileService = profileService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extract token from Authorization header
            String token = authHeader.substring(7); // Remove "Bearer " prefix

            // Get user ID from token
            String userId = jwtTokenUtil.getUserIdFromToken(token);

            // Get profile data
            ProfileDetails profile = profileService.getProfileByUserId(userId);

            return ResponseEntity.ok(profile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching profile: " + e.getMessage());
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "position", required = false) String position,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "bio", required = false) String bio,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {

        try {
            // Extract token from Authorization header
            String token = authHeader.substring(7); // Remove "Bearer " prefix

            // Get user ID from token
            String userId = jwtTokenUtil.getUserIdFromToken(token);

            // Create profile object from form data
            ProfileDetails profileDetails = new ProfileDetails();
            profileDetails.setName(name);
            profileDetails.setEmail(email);
            profileDetails.setPhone(phone);
            profileDetails.setDepartment(department);
            profileDetails.setPosition(position);
            profileDetails.setAddress(address);
            profileDetails.setBio(bio);

            // Update profile
            ProfileDetails updatedProfile = profileService.updateProfile(userId, profileDetails, avatar);

            return ResponseEntity.ok(updatedProfile);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile: " + e.getMessage());
        }
    }
}