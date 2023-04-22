package com.example.finanzas.controllers;

import com.example.finanzas.entities.Customer;
import com.example.finanzas.entities.FinancialRun;
import com.example.finanzas.exceptions.ResourceNotFoundException;
import com.example.finanzas.repositories.CustomerRepository;
import com.example.finanzas.repositories.FinancialRunRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
@Data
public class FinancialRunController {
    @Autowired
    private FinancialRunRepository financialRunRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @PostMapping("/financialRun/customer/{id}")
    public ResponseEntity<FinancialRun> createFinancialRun(@RequestBody FinancialRun run,@PathVariable("id") Long id) throws ParseException {
        Customer customerFound = customerRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Not found customer with id="+id));
        FinancialRun newRun = financialRunRepository.save(new FinancialRun(run.getTypeMoney(), run.getPriceProperty() , run.getFirstFee(),run.getAmountFinance(),run.getNameRate(),run.getTimeRate(),run.getRate(),run.getFrequencyPay(),run.getConvertRate(),run.getNameConvertRate(),run.getNumberYear(),run.getNumberPeriods(),customerFound));
        return new ResponseEntity<FinancialRun>(newRun, HttpStatus.CREATED);
    }
    @GetMapping("/financialRun/customer/{id}")
    public ResponseEntity<List<FinancialRun>> getListFinancialRun(@PathVariable("id") Long id){
        List<FinancialRun> runs = financialRunRepository.findAll();
        List<FinancialRun> filteredRuns= new ArrayList<FinancialRun>();
        Customer customerFound = customerRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Not found customer with id="+id));
        for(FinancialRun r : runs){
            if(r.getCustomer()==customerFound){
                filteredRuns.add(r);
            }
        }
        return new ResponseEntity<List<FinancialRun>>(filteredRuns, HttpStatus.OK);
    }
    @GetMapping("/financialRun/{id}")
    public ResponseEntity<FinancialRun> getFinancialRun(@PathVariable("id") Long id){
        FinancialRun run = financialRunRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Not found customer with id="+id));
        return new ResponseEntity<FinancialRun>(run, HttpStatus.OK);
    }
}
