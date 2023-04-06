package site.berkay.hive.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.berkay.hive.document.Post;
import site.berkay.hive.dto.PostDTO;
import site.berkay.hive.repository.PostRepository;
import site.berkay.hive.responses.PostResponse;
import site.berkay.hive.service.PostService;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/post")
public class PostController {

    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }
    @Autowired
    PostRepository postRepository;

    @PostMapping("/create")
    public Post create(@RequestBody PostDTO postDTO) {
        Post post = new Post(postDTO.getTitle(), postDTO.getText());
        return postRepository.save(post);

    }
// Butun hepsini getirme ancak yapamadım daha sonra bakacagim.
    @GetMapping
    public List<Post> getAllPosts(@RequestParam Optional<String> postId) {
        return postService.getAllPosts(postId);

    }

    @GetMapping("/alldata")
    public List<PostResponse> getAllDataPost(@RequestParam Optional<String> postId) {
        return postService.getAllDataPost(postId);
    }



    @GetMapping("/{postId}")
    public ResponseEntity post(@PathVariable String postId) {
        return ResponseEntity.ok(PostDTO.from(postRepository.findById(postId).orElseThrow()));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity deletePost(@PathVariable String postId) {
        postRepository.deleteById(postId);
        return ResponseEntity.ok(MessageFormat.format("Post {0} silindi..", postId));
    }



}
