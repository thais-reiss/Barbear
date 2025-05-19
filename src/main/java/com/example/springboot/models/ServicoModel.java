package com.example.springboot.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Servico")
public class ServicoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idServico;
    private String nomeServico;
    private String descricaoServico;
    private String tipoServico;
    private double precoServico;
    private String imagemServico;

    @ManyToOne
    @JoinColumn(name = "idBarbearia", nullable = false)
    private BarbeariaModel barbearia;


    
    public Long getIdServico() {
        return idServico;
    }

    public void setIdServico(Long idServico) {
        this.idServico = idServico;
    }

    public String getNomeServico() {
        return nomeServico;
    }

    public void setNomeServico(String nomeServico) {
        this.nomeServico = nomeServico;
    }

    public String getDescricaoServico() {
        return descricaoServico;
    }

    public void setDescricaoServico(String descricaoServico) {
        this.descricaoServico = descricaoServico;
    }

    public String getTipoServico() {
        return tipoServico;
    }

    public void setTipoServico(String tipoServico) {
        this.tipoServico = tipoServico;
    }

    public double getPrecoServico() {
        return precoServico;
    }

    public void setPrecoServico(double precoServico) {
        this.precoServico = precoServico;
    }

    public BarbeariaModel getBarbearia() {
        return barbearia;
    }

    public void setBarbearia(BarbeariaModel barbearia) {
        this.barbearia = barbearia;
    }

    public String getImagemServico() {
        return imagemServico;
    }

    public void setImagemServico(String imagemServico) {
        this.imagemServico = imagemServico;
    }
}
