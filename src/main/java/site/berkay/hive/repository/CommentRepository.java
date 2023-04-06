package site.berkay.hive.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.berkay.hive.document.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {

}
