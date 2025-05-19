package com.example.springboot.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.dto.ClienteRecordDto;
import com.example.springboot.models.ClienteModel;
import com.example.springboot.repositories.ClienteRepository;

import jakarta.validation.Valid;

@RestController
public class ClienteController {

    @Autowired
    ClienteRepository clienteRepository;

    @PostMapping("/cliente")
    public ResponseEntity<ClienteModel> saveProduct(@RequestBody @Valid ClienteRecordDto clienteRecordDto) {
        var clienteModel = new ClienteModel();
        BeanUtils.copyProperties(clienteRecordDto, clienteModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteRepository.save(clienteModel));
    }

    @GetMapping("/cliente")
    public ResponseEntity<List<ClienteModel>> getAllClientes() {
        return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.findAll());
    }

    @GetMapping("/cliente/{idCliente}")
    public ResponseEntity<Object> getOneCliente(@PathVariable(value = "idCliente") Long idCliente) {
        Optional<ClienteModel> cliente0 = clienteRepository.findById(idCliente);
        if (cliente0.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(cliente0.get());
    }

    @PutMapping("/cliente/{idCliente}")
    public ResponseEntity<Object> updateCliente(@PathVariable(value = "idCliente") Long idCliente,
            @RequestBody @Valid ClienteRecordDto clienteRecordDto) {
        Optional<ClienteModel> cliente0 = clienteRepository.findById(idCliente);
        if (cliente0.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }
        var clienteModel = cliente0.get();
        BeanUtils.copyProperties(clienteRecordDto, clienteModel);
        return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.save(clienteModel));
    }

    @DeleteMapping("/cliente/{idCliente}")
    public ResponseEntity<Object> deleteCliente(@PathVariable(value = "idCliente") Long idCliente) {
        Optional<ClienteModel> cliente0 = clienteRepository.findById(idCliente);
        if (cliente0.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }
        clienteRepository.delete(cliente0.get());
        return ResponseEntity.status(HttpStatus.OK).body("Cliente deletado com sucesso!");
    }
}
