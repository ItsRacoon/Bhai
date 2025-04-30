package com.example.Backend.service;

import com.example.Backend.model.ProfileDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface ProfileService {
    ProfileDetails getProfileByUserId(String userId);
    ProfileDetails updateProfile(String userId, ProfileDetails profileDetails, MultipartFile avatar);
    Optional<ProfileDetails> createDefaultProfile(String userId, String email);
}
