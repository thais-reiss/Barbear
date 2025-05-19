package com.example.springboot.dto;

import java.time.LocalTime;
import java.util.List;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;

public record BarbeariaRecordDto(
        @NotBlank String cnpj,
        @NotBlank String emailBarbearia,
        @NotBlank String telefoneBarbearia,
        @NotBlank String senhaBarbearia,
        @NotBlank String nomeBarbearia,
        @NotBlank String cep,
        @NotBlank String rua,
        @NotBlank String bairro,
        List<LocalTime> horario,
        Set<ServicoRecordDto> servicos) {

}
