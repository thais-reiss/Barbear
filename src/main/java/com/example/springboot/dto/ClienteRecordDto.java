package com.example.springboot.dto;

import jakarta.validation.constraints.NotBlank;

public record ClienteRecordDto(
        @NotBlank String nomeCliente,
        @NotBlank String emailCliente,
        @NotBlank String telefoneCliente,
        @NotBlank String senhaCliente) {

}
