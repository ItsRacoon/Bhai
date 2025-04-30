package com.example.Backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "profiles")
public class ProfileDetails {
    private String userId;
    private String name;
    private String email;
    private String phone;
    private String department;
    private String position;
    private String address;
    private String bio;
    private String avatar;
}
