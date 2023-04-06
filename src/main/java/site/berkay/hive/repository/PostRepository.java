package site.berkay.hive.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.berkay.hive.document.Post;

import java.util.List;

public interface PostRepository  extends MongoRepository<Post, String> {


    List<Post> findByPostId(String postId);
}
