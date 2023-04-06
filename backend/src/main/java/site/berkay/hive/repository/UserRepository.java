package site.berkay.hive.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import site.berkay.hive.document.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}