package com.example.springboot.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AgendamentoRecordDto(
                //@NotNull LocalDate dataAgendamento,
                @NotNull String dataAgendamento,
                @NotBlank String horarioAgendamento,
                String descricaoAgendamento,
                @NotNull Long idCliente,
                @NotNull Long idBarbearia,
                @NotNull Long idServico,
                Integer statusAgendamento) {
}
/*Codigo antigo:
 * public record AgendamentoRecordDto(
                @NotNull LocalDate dataAgendamento,
                @NotBlank String horarioAgendamento,
                String descricaoAgendamento,
                @NotNull Long idCliente,
                @NotNull Long idBarbearia,
                List<ServicoRecordDto> servicos) {
}
 */