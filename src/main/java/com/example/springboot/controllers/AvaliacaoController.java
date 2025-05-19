package com.example.springboot.controllers;

import com.example.springboot.dto.AvaliacaoRecordDto;
import com.example.springboot.models.AgendamentoModel;
import com.example.springboot.models.AvaliacaoModel;
import com.example.springboot.models.ClienteModel;
import com.example.springboot.models.BarbeariaModel;
import com.example.springboot.repositories.AgendamentoRepository;
import com.example.springboot.repositories.AvaliacaoRepository;
import com.example.springboot.repositories.ClienteRepository;
import com.example.springboot.repositories.BarbeariaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private BarbeariaRepository barbeariaRepository;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @PostMapping
    public ResponseEntity<Object> criarAvaliacao(@RequestBody @Valid AvaliacaoRecordDto avaliacaoDto) {
        Optional<ClienteModel> cliente = clienteRepository.findById(avaliacaoDto.clienteId());
        Optional<BarbeariaModel> barbearia = barbeariaRepository.findById(avaliacaoDto.barbeariaId());
        Optional<AgendamentoModel> agendamento = agendamentoRepository.findById(avaliacaoDto.agendamentoId());

        if (cliente.isEmpty() || barbearia.isEmpty() || agendamento.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Cliente, Barbearia ou Agendamento não encontrados.");
        }    

        AvaliacaoModel avaliacao = new AvaliacaoModel();
        avaliacao.setNota(avaliacaoDto.nota());
        avaliacao.setComentario(avaliacaoDto.comentario());
        avaliacao.setCliente(cliente.get());
        avaliacao.setBarbearia(barbearia.get());
        avaliacao.setAgendamento(agendamento.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(avaliacaoRepository.save(avaliacao));
    }

    @GetMapping
    public ResponseEntity<List<AvaliacaoModel>> getAllAvaliacoes() {
        return ResponseEntity.status(HttpStatus.OK).body(avaliacaoRepository.findAll());
    }

    @GetMapping("avaliacao/{id}")
    public ResponseEntity<Object> getAvaliacaoById(@PathVariable Long id) {
        Optional<AvaliacaoModel> avaliacao = avaliacaoRepository.findById(id);
        if (avaliacao.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Avaliação não encontrada.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(avaliacao.get());
    }
}
