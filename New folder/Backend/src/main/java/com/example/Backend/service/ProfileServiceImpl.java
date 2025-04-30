package com.example.Backend.service;

import com.example.Backend.model.ProfileDetails;
import com.example.Backend.model.User;
import com.example.Backend.repository.ProfileRepository;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Value("${app.upload.dir:${user.home}/uploads}")
    private String uploadDir;

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProfileServiceImpl(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ProfileDetails getProfileByUserId(String userId) {
        Optional<ProfileDetails> profileOpt = profileRepository.findByUserId(userId);

        if (profileOpt.isPresent()) {
            return profileOpt.get();
        } else {
            // If no profile exists, check if user exists
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                // Create a default profile using available user data
                return createDefaultProfile(userId, user.getEmail())
                        .orElseThrow(() -> new RuntimeException("Failed to create default profile"));
            } else {
                throw new IllegalArgumentException("User not found");
            }
        }
    }

    @Override
    public ProfileDetails updateProfile(String userId, ProfileDetails profileDetails, MultipartFile avatar) {
        // Verify user exists
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Get existing profile or create new one
        ProfileDetails existingProfile = profileRepository.findByUserId(userId)
                .orElse(new ProfileDetails());

        // Set the userId
        existingProfile.setUserId(userId);

        // Update profile fields if provided
        if (profileDetails.getName() != null) existingProfile.setName(profileDetails.getName());
        if (profileDetails.getEmail() != null) existingProfile.setEmail(profileDetails.getEmail());
        if (profileDetails.getPhone() != null) existingProfile.setPhone(profileDetails.getPhone());
        if (profileDetails.getDepartment() != null) existingProfile.setDepartment(profileDetails.getDepartment());
        if (profileDetails.getPosition() != null) existingProfile.setPosition(profileDetails.getPosition());
        if (profileDetails.getAddress() != null) existingProfile.setAddress(profileDetails.getAddress());
        if (profileDetails.getBio() != null) existingProfile.setBio(profileDetails.getBio());

        // Handle avatar upload
        if (avatar != null && !avatar.isEmpty()) {
            String avatarUrl = saveAvatar(avatar, userId);
            existingProfile.setAvatar(avatarUrl);
        }

        // Save and return updated profile
        return profileRepository.save(existingProfile);
    }

    @Override
    public Optional<ProfileDetails> createDefaultProfile(String userId, String email) {
        // Get user information
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Create a basic profile with available information
        ProfileDetails profile = new ProfileDetails();
        profile.setUserId(userId);
        profile.setEmail(email);
        profile.setName(user.getFirstName() + " " + user.getLastName());
        profile.setPosition(user.getPosition());

        // Save the profile
        return Optional.of(profileRepository.save(profile));
    }

    private String saveAvatar(MultipartFile file, String userId) {
        try {
            // Create upload directory if it doesn't exist
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Generate unique filename
            String fileExtension = getFileExtension(file.getOriginalFilename());
            String fileName = userId + "_" + UUID.randomUUID().toString() + fileExtension;

            // Save file
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());

            // Return the URL to access the file
            return "/api/files/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save avatar", e);
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null) {
            return "";
        }
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex == -1) ? "" : filename.substring(dotIndex);
    }
}