package com.example.finanzas.repositories;

import com.example.finanzas.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Customer findByEmailAndPassword(String email, String password);
    Customer findByEmail(String email);
}
