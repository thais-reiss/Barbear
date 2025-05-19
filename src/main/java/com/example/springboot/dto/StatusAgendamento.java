package com.example.springboot.dto;

public enum StatusAgendamento {
    CONFIRMADO(2),
    PENDENTE(1),
    CANCELADO(0);

    private final int code;

    StatusAgendamento(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static StatusAgendamento fromCode(int code) {
        for (StatusAgendamento status : StatusAgendamento.values()) {
            if (status.code == code) {
                return status;
            }   
        }
        throw new IllegalArgumentException("Código inválido para StatusAgendamento: " + code);
    }
}
