package com.example.springboot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.springboot.models.AvaliacaoModel;

@Repository
public interface AvaliacaoRepository extends JpaRepository<AvaliacaoModel, Long> {
    @Query("SELECT COUNT(a) FROM AvaliacaoModel a WHERE a.barbearia.idBarbearia = :idBarbearia")
    long countAvaliacoesByBarbearia(@Param("idBarbearia") Long idBarbearia);

    @Query("SELECT COUNT(a) FROM AvaliacaoModel a WHERE a.barbearia.idBarbearia = :idBarbearia AND a.nota >= 3")
    long countAvaliacoesPositivasByBarbearia(@Param("idBarbearia") Long idBarbearia);
}

