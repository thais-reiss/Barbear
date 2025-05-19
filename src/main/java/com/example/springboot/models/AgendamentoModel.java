package com.example.springboot.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

import com.example.springboot.dto.StatusAgendamento;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Agendamento")
public class AgendamentoModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idAgendamento;
    private LocalDate dataAgendamento;
    //private String horarioAgendamento;
    private LocalTime horarioAgendamento;
    private String descricaoAgendamento;

    @Column(name = "status")
    private int statusAgendamento;

    /*@Transient
    private StatusAgendamento status;*/

    @ManyToOne
    @JoinColumn(name = "idCliente", nullable = false)
    private ClienteModel cliente;

    @ManyToOne
    @JoinColumn(name = "idBarbearia", nullable = false)
    private BarbeariaModel barbearia;

    @ManyToOne
    @JoinColumn(name = "idServico", nullable = false)
    private ServicoModel servico;

    // Getters e Setters
    public Long getIdAgendamento() {
        return idAgendamento;
    }

    public void setIdAgendamento(Long idAgendamento) {
        this.idAgendamento = idAgendamento;
    }

    public LocalDate getDataAgendamento() {
        return dataAgendamento;
    }

    public void setDataAgendamento(LocalDate dataAgendamento) {
        this.dataAgendamento = dataAgendamento;
    }

    public LocalTime getHorarioAgendamento() {
        return horarioAgendamento;
    }

    public void setHorarioAgendamento(LocalTime horarioAgendamento) {
        this.horarioAgendamento = horarioAgendamento;
    }

    public String getDescricaoAgendamento() {
        return descricaoAgendamento;
    }

    public void setDescricaoAgendamento(String descricaoAgendamento) {
        this.descricaoAgendamento = descricaoAgendamento;
    }

    public ClienteModel getCliente() {
        return cliente;
    }

    public void setCliente(ClienteModel cliente) {
        this.cliente = cliente;
    }

    public BarbeariaModel getBarbearia() {
        return barbearia;
    }

    public void setBarbearia(BarbeariaModel barbearia) {
        this.barbearia = barbearia;
    }

    public ServicoModel getServico() {
        return servico;
    }

    public void setServico(ServicoModel servico) {
        this.servico = servico;
    }

    public int getStatusAgendamento() {
        return statusAgendamento;
    }

    public void setStatusAgendamento(int statusAgendamento) {
        this.statusAgendamento = statusAgendamento;
    }

    public StatusAgendamento getStatus() {
        return StatusAgendamento.fromCode(this.statusAgendamento);
    }
}

/*Codigo antigo:
 * package com.example.springboot.models;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.example.springboot.dto.StatusAgendamento;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "Agendamento")
public class AgendamentoModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idAgendamento;
    private LocalDate dataAgendamento;
    private String horarioAgendamento;
    private String descricaoAgendamento;

    @Column(name = "status")
    private int statusAgendamento;

    @Transient
    private StatusAgendamento status;

    @ManyToOne
    @JoinColumn(name = "idCliente", nullable = false)
    private ClienteModel cliente;

    @ManyToOne
    @JoinColumn(name = "idBarbearia", nullable = false)
    private BarbeariaModel barbearia;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "agendamento_servico", joinColumns = @JoinColumn(name = "idAgendamento"), inverseJoinColumns = @JoinColumn(name = "idServico"))
    private List<ServicoModel> servicos;

    public Long getIdAgendamento() {
        return idAgendamento;
    }

    public void setIdAgendamento(Long idAgendamento) {
        this.idAgendamento = idAgendamento;
    }

    public LocalDate getDataAgendamento() {
        return dataAgendamento;
    }

    public void setDataAgendamento(LocalDate dataAgendamento) {
        this.dataAgendamento = dataAgendamento;
    }

    public String getHorarioAgendamento() {
        return horarioAgendamento;
    }

    public void setHorarioAgendamento(String horarioAgendamento) {
        this.horarioAgendamento = horarioAgendamento;
    }

    public String getDescricaoAgendamento() {
        return descricaoAgendamento;
    }

    public void setDescricaoAgendamento(String descricaoAgendamento) {
        this.descricaoAgendamento = descricaoAgendamento;
    }

    public ClienteModel getCliente() {
        return cliente;
    }

    public void setCliente(ClienteModel cliente) {
        this.cliente = cliente;
    }

    public BarbeariaModel getBarbearia() {
        return barbearia;
    }

    public void setBarbearia(BarbeariaModel barbearia) {
        this.barbearia = barbearia;
    }

    public List<ServicoModel> getServicos() {
        return servicos;
    }

    public void setServicos(List<ServicoModel> servicos) {
        this.servicos = servicos;
    }
}

 */