package com.example.finanzas.controllers;

import com.example.finanzas.entities.Customer;
import com.example.finanzas.exceptions.ResourceNotFoundException;
import com.example.finanzas.repositories.CustomerRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
@Data
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/customers/email/{email}/password/{password}")
    public ResponseEntity<Customer> userAccount(@PathVariable("email") String email, @PathVariable("password") String psw ){
        Customer customerFound=customerRepository.findByEmailAndPassword(email,psw);
        return new ResponseEntity<Customer>(customerFound, HttpStatus.OK);
    }
    @PostMapping("/customers")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) throws ParseException {
        //SimpleDateFormat sdf= new SimpleDateFormat("dd-MM-yyyy");
        Customer updateCustomer = customerRepository.findByEmail(customer.getEmail());
        if (updateCustomer == null) {
            Customer newCustomer = customerRepository.save(new Customer(customer.getName(), customer.getEmail() , customer.getPassword()));
            return new ResponseEntity<Customer>(newCustomer, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<Customer>(updateCustomer, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable("id") Long id){

        Customer customer=customerRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Not found Owner with id="+id));
        return new ResponseEntity<Customer>(customer,HttpStatus.OK);
    }
}
