package com.example.springboot.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ServicoRecordDto(
    @NotBlank String nomeServico,
    String descricaoServico,
    @NotBlank String tipoServico,
    @NotNull double precoServico,
    @NotNull Long idBarbearia,
    String imagemServico) {
}

