package site.berkay.hive.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;
import site.berkay.hive.document.User;
import site.berkay.hive.dto.SignupDTO;
import site.berkay.hive.dto.UserDTO;
import site.berkay.hive.repository.UserRepository;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserDetailsManager userDetailsManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/{id}")
    @PreAuthorize("#user.id == #id")
    public ResponseEntity user(@AuthenticationPrincipal User user, @PathVariable String id) {
        return ResponseEntity.ok(UserDTO.from(userRepository.findById(id).orElseThrow()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("#user.id == #id")
    public ResponseEntity deleteOneUser(@AuthenticationPrincipal User user, @PathVariable String id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok("Delete Complated");
    }

    @PutMapping("/{id}")
    @PreAuthorize("#user.id == #id")
    public ResponseEntity updateOneUser(@AuthenticationPrincipal User user,@PathVariable String id, @RequestBody SignupDTO signupDTO) {
         Optional<User> user1 = userRepository.findById(id);
        if(user1.isPresent()) {
            User foundUser = user1.get();
            foundUser.setUsername(signupDTO.getUsername());
            foundUser.setPassword(signupDTO.getPassword());
            userDetailsManager.updateUser(foundUser);
            Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(foundUser, signupDTO.getPassword(), Collections.EMPTY_LIST);
            return ResponseEntity.ok("Update Success");
        }else
            return null;

    }
}