package com.example.Backend.repository;

import com.example.Backend.model.ProfileDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends MongoRepository<ProfileDetails, String> {
    Optional<ProfileDetails> findByUserId(String userId);
}
