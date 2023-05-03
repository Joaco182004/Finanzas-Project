package com.example.finanzas.repositories;

import com.example.finanzas.entities.Customer;
import com.example.finanzas.entities.FinancialRun;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinancialRunRepository extends JpaRepository<FinancialRun,Long> {

}
