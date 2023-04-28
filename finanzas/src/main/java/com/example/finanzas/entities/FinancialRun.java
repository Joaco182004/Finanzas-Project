package com.example.finanzas.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@Table(name="runs")
@NoArgsConstructor
public class FinancialRun {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String typeMoney;
    private Double priceProperty;
    private Double firstFee;
    private Double amountFinance;
    private String nameRate;
    private String timeRate;
    private Double rate;
    private String frequencyPay;
    private Double convertRate;
    private String nameConvertRate;
    private Double numberYear;
    private Double numberPeriods;
    private Date dateSave;
    @ManyToOne(fetch= FetchType.LAZY)
    @JsonIgnoreProperties( {"hibernateLazyInitializer", "handler"})
    private Customer customer;
    public FinancialRun(String typeMoney, Double priceProperty, Double firstFee, Double amountFinance, String nameRate, String timeRate, Double rate, String frequencyPay, Double convertRate,String nameConvertRate, Double numberYear, Double numberPeriods,Customer customer) {

        this.typeMoney = typeMoney;
        this.priceProperty = priceProperty;
        this.firstFee = firstFee;
        this.amountFinance = amountFinance;
        this.nameRate = nameRate;
        this.timeRate = timeRate;
        this.rate = rate;
        this.frequencyPay = frequencyPay;
        this.convertRate = convertRate;
        this.nameConvertRate=nameConvertRate;
        this.numberYear = numberYear;
        this.numberPeriods = numberPeriods;
        this.dateSave=new Date();
        this.customer=customer;
    }



}
