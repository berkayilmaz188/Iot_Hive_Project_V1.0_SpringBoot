package site.berkay.hive.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.berkay.hive.document.Like;

public interface LikeRepository extends MongoRepository<Like, String> {

}
