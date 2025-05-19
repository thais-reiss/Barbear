package com.example.springboot.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AvaliacaoRecordDto(
                @Min(1) @Max(5) int nota,
                String comentario,
                @NotNull Long clienteId,
                @NotNull Long barbeariaId,
                @NotNull Long agendamentoId) {

}
