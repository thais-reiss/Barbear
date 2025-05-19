package com.example.springboot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springboot.models.BarbeariaModel;

@Repository
public interface BarbeariaRepository extends JpaRepository<BarbeariaModel, Long>{
    
}
