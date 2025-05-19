package com.example.springboot.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springboot.dto.ServicoRecordDto;
import com.example.springboot.models.BarbeariaModel;
import com.example.springboot.models.ServicoModel;
import com.example.springboot.repositories.BarbeariaRepository;
import com.example.springboot.repositories.ServicoRepository;

import jakarta.validation.Valid;

@RestController
public class ServicoController {

    @Autowired
    ServicoRepository servicoRepository;

    @Autowired
    BarbeariaRepository barbeariaRepository;

    @PostMapping("/servico")
    public ResponseEntity<Object> saveServico(@RequestBody @Valid ServicoRecordDto servicoRecordDto) {
        var servicoModel = new ServicoModel();
        BeanUtils.copyProperties(servicoRecordDto, servicoModel);

        Optional<BarbeariaModel> barbeariaOptional = barbeariaRepository.findById(servicoRecordDto.idBarbearia());
        if (barbeariaOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Barbearia não encontrada.");
        }

        servicoModel.setBarbearia(barbeariaOptional.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(servicoRepository.save(servicoModel));
    }

    @GetMapping("/servico")
    public ResponseEntity<List<ServicoModel>> getAllServicos() {
        return ResponseEntity.status(HttpStatus.OK).body(servicoRepository.findAll());
    }

    @GetMapping("/servico/{idServico}")
    public ResponseEntity<Object> getOneServico(@PathVariable(value = "idServico") Long idServico) {
        Optional<ServicoModel> servico = servicoRepository.findById(idServico);
        if (servico.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Serviço não encontrado.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(servico.get());
    }

    @PutMapping("/servico/{idServico}")
    public ResponseEntity<Object> updateServico(@PathVariable(value = "idServico") Long idServico,
            @RequestBody @Valid ServicoRecordDto servicoRecordDto) {
        Optional<ServicoModel> servico = servicoRepository.findById(idServico);
        if (servico.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Serviço não encontrado.");
        }
        var servicoModel = servico.get();
        BeanUtils.copyProperties(servicoRecordDto, servicoModel);
        return ResponseEntity.status(HttpStatus.OK).body(servicoRepository.save(servicoModel));
    }

    @DeleteMapping("/servico/{idServico}")
    public ResponseEntity<Object> deleteServico(@PathVariable(value = "idServico") Long idServico) {
        Optional<ServicoModel> servico = servicoRepository.findById(idServico);
        if (servico.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Serviço não encontrado.");
        }
        servicoRepository.delete(servico.get());
        return ResponseEntity.status(HttpStatus.OK).body("Serviço deletado com sucesso!");
    }
}
