package com.example.springboot.models;

import java.io.Serializable;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Avaliacao")
public class AvaliacaoModel implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idAvaliacao;
    private int nota;
    private String comentario;

    @ManyToOne
    @JoinColumn(name = "idBarbearia", nullable = false)
    private BarbeariaModel barbearia;

    @ManyToOne
    @JoinColumn(name = "idCliente", nullable = false)
    private ClienteModel cliente;

    @ManyToOne
    @JoinColumn(name = "agendamento_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AgendamentoModel agendamento;

    public Long getIdAvaliacao() {
        return idAvaliacao;
    }

    public void setIdAvaliacao(Long idAvaliacao) {
        this.idAvaliacao = idAvaliacao;
    }

    public int getNota() {
        return nota;
    }

    public void setNota(int nota) {
        this.nota = nota;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public BarbeariaModel getBarbearia() {
        return barbearia;
    }

    public void setBarbearia(BarbeariaModel barbearia) {
        this.barbearia = barbearia;
    }

    public ClienteModel getCliente() {
        return cliente;
    }

    public void setCliente(ClienteModel cliente) {
        this.cliente = cliente;
    }

    public AgendamentoModel getAgendamento() {
        return agendamento;
    }

    public void setAgendamento(AgendamentoModel agendamento) {
        this.agendamento = agendamento;
    }    
}
