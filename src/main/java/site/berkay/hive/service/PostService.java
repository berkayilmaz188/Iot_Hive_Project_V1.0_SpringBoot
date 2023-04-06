package site.berkay.hive.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.berkay.hive.document.Post;
import site.berkay.hive.repository.PostRepository;
import site.berkay.hive.responses.PostResponse;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    private PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts(Optional<String> postId) {
        if (postId.isPresent())
            return postRepository.findByPostId(postId.get());
        return postRepository.findAll();
    }

    public List<PostResponse> getAllDataPost(Optional<String> postId) {
        List<Post> list;
        if(postId.isPresent()) {
            list = postRepository.findByPostId(postId.get());
        }
        list = postRepository.findAll();
        return list.stream().map(p -> new PostResponse(p)).collect(Collectors.toList());
    }


    public Post getOnePostById(String postId) {
        return postRepository.findById(postId).orElse(null);
    }
}
