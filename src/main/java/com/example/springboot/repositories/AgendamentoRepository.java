package com.example.springboot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import com.example.springboot.models.AgendamentoModel;

@Repository
public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {

    @Query("SELECT COUNT(a) FROM AgendamentoModel a WHERE a.barbearia.idBarbearia = :idBarbearia AND MONTH(a.dataAgendamento) = :mes")
    int countAgendamentosByBarbeariaAndMes(@Param("idBarbearia") Long idBarbearia, @Param("mes") int mes);

    List<AgendamentoModel> findByDataAgendamentoBetweenAndBarbearia_IdBarbearia(LocalDate startDate, LocalDate endDate, Long idBarbearia);
}
