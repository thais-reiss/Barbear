package com.example.springboot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springboot.models.ServicoModel;

@Repository
public interface ServicoRepository extends JpaRepository<ServicoModel, Long>{
    
}
