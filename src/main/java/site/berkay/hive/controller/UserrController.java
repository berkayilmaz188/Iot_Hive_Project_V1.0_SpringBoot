package site.berkay.hive.controller;

import org.springframework.web.bind.annotation.*;
import site.berkay.hive.document.Userr;
import site.berkay.hive.repository.UserrRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/userrs")
public class UserrController {

    private UserrRepository userrRepository;

    public UserrController(UserrRepository userrRepository) {
        this.userrRepository = userrRepository;
    }
    //GetMapping var olanı getirmeye yarar. Burada kullanıcıları springboot aracılığıyla repository ile getiriyor.
    @GetMapping
    public List<Userr> getAllUsers(){
        return userrRepository.findAll();
    }
    //Postmapping ise birşeyi yazmaya yarıyor. burada kullanıcıyı database e yazdırıp return ile kontrol ediyoruz.
    @PostMapping
    public Userr createUserr(@RequestBody Userr newUserr) {
        return userrRepository.save(newUserr);
    }
//Kullanıcıyı id ile cagiriyoruz.
    @GetMapping("/{userId}")
    public Userr getOneUserr(@PathVariable String userId) {
        //ozel istisna
        return userrRepository.findById(userId).orElse(null);
    }
    //PutMapping var olani degistirmeye yarar.
    @PutMapping("/{userId}")
    public Userr updateOneUserr(@PathVariable String userId, @RequestBody Userr newUserr) {
        Optional<Userr> userr = userrRepository.findById(userId);
        if (userr.isPresent()) { //Userr i bulabildimi bulabildiyse parantez icine girer
            Userr foundUserr = userr.get();
            foundUserr.setUserName(newUserr.getUserName());
            foundUserr.setPassword(newUserr.getPassword());
            userrRepository.save(foundUserr);
            return foundUserr;
        }else
            return null;
    }
    //Silmek icin
    @DeleteMapping("/{userId}")
    public void deleteOneUserr(@PathVariable String userId) {
        userrRepository.deleteById(userId);
    }

}
