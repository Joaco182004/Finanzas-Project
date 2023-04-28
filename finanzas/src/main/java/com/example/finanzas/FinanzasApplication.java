package com.example.finanzas;

import com.example.finanzas.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FinanzasApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinanzasApplication.class, args);
	}
	@Bean
	public CommandLineRunner mappingDemo(
			CustomerRepository customerRepository
	){
		return args -> {

		};
	}
}
