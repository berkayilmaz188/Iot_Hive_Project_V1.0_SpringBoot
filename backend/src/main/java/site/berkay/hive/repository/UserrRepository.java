package site.berkay.hive.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import site.berkay.hive.document.Userr;

public interface UserrRepository extends MongoRepository<Userr, String> {

}
