package com.example.springboot.models;

import java.io.Serializable;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Barbearia")
public class BarbeariaModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idBarbearia;
    @Column(unique = true)
    private String cnpj;
    @Column(unique = true)
    private String emailBarbearia;
    private String telefoneBarbearia;
    private String senhaBarbearia;
    private String nomeBarbearia;
    private String enderecoBarbearia;

    @OneToMany(mappedBy = "barbearia", cascade = CascadeType.ALL)
    private Set<ServicoModel> servicos;// private List<ServicoModel> servicos;

    /*@OneToMany(mappedBy = "barbearia", cascade = CascadeType.ALL)
    private Set<AgendamentoModel> agendamentos;*/

    @ElementCollection
    @CollectionTable(name = "disponibilidade_servico", joinColumns = @JoinColumn(name = "barbearia_id"))
    @Column(name = "horario")
    @JsonFormat(pattern = "HH:mm")
    List<LocalTime> horario;

    public List<LocalTime> getHorario() {
        return horario;
    }

    public void setHorario(List<LocalTime> horario) {
        this.horario = horario;
    }

    public Long getidBarbearia() {
        return idBarbearia;
    }

    public void setidBarbearia(Long idBarbearia) {
        this.idBarbearia = idBarbearia;
    }
    

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getEmailBarbearia() {
        return emailBarbearia;
    }

    public void setEmailBarbearia(String emailBarbearia) {
        this.emailBarbearia = emailBarbearia;
    }

    public String getTelefoneBarbearia() {
        return telefoneBarbearia;
    }

    public void setTelefoneBarbearia(String telefoneBarbearia) {
        this.telefoneBarbearia = telefoneBarbearia;
    }

    public String getSenhaBarbearia() {
        return senhaBarbearia;
    }

    public void setSenhaBarbearia(String senhaBarbearia) {
        this.senhaBarbearia = senhaBarbearia;
    }

    public String getNomeBarbearia() {
        return nomeBarbearia;
    }

    public void setNomeBarbearia(String nomeBarbearia) {
        this.nomeBarbearia = nomeBarbearia;
    }

    public void setEnderecoBarbearia(String cep, String rua, String bairro) {
        this.enderecoBarbearia = String.format("CEP: %s, Rua: %s, Bairro: %s", cep, rua, bairro);
    }

    public String getEnderecoBarbearia() {
        return enderecoBarbearia;
    }
}

/*Codigo antigo:
 * @Entity
@Table(name = "Barbearia")
public class BarbeariaModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idBarbearia;
    private String cnpj;
    private String emailBarbearia;
    private String telefoneBarbearia;
    private String senhaBarbearia;
    private String nomeBarbearia;
    private String enderecoBarbearia;

    @OneToMany(mappedBy = "barbearia", cascade = CascadeType.ALL)
    private Set<ServicoModel> servicos;

    @OneToMany(mappedBy = "barbearia", cascade = CascadeType.ALL)
    private Set<AgendamentoModel> agendamentos;

    @ElementCollection
    @CollectionTable(name = "disponibilidade_servico", joinColumns = @JoinColumn(name = "barbearia_id"))
    @Column(name = "horario")
    @JsonFormat(pattern = "HH:mm")
    List<LocalTime> horario;

    public List<LocalTime> getHorario() {
        return horario;
    }

    public void setHorario(List<LocalTime> horario) {
        this.horario = horario;
    }

    public Long getidBarbearia() {
        return idBarbearia;
    }

    public void setidBarbearia(Long idBarbearia) {
        this.idBarbearia = idBarbearia;
    }
    

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getEmailBarbearia() {
        return emailBarbearia;
    }

    public void setEmailBarbearia(String emailBarbearia) {
        this.emailBarbearia = emailBarbearia;
    }

    public String getTelefoneBarbearia() {
        return telefoneBarbearia;
    }

    public void setTelefoneBarbearia(String telefoneBarbearia) {
        this.telefoneBarbearia = telefoneBarbearia;
    }

    public String getSenhaBarbearia() {
        return senhaBarbearia;
    }

    public void setSenhaBarbearia(String senhaBarbearia) {
        this.senhaBarbearia = senhaBarbearia;
    }

    public String getNomeBarbearia() {
        return nomeBarbearia;
    }

    public void setNomeBarbearia(String nomeBarbearia) {
        this.nomeBarbearia = nomeBarbearia;
    }

    public void setEnderecoBarbearia(String cep, String rua, String bairro) {
        this.enderecoBarbearia = String.format("CEP: %s, Rua: %s, Bairro: %s", cep, rua, bairro);
    }

    public String getEnderecoBarbearia() {
        return enderecoBarbearia;
    }
}

 */