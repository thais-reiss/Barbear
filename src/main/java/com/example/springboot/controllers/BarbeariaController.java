package com.example.springboot.controllers;

import java.util.List;

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

import com.example.springboot.dto.BarbeariaRecordDto;
import com.example.springboot.models.BarbeariaModel;
import com.example.springboot.repositories.BarbeariaRepository;

import jakarta.validation.Valid;

@RestController
public class BarbeariaController {

    @Autowired
    BarbeariaRepository barbeariaRepository;

    @PostMapping("/barbearia")
    public ResponseEntity<BarbeariaModel> saveProduct(@RequestBody @Valid BarbeariaRecordDto barbeariaRecordDto) {
        var barbeariaModel = new BarbeariaModel();
        BeanUtils.copyProperties(barbeariaRecordDto, barbeariaModel);
        barbeariaModel.setEnderecoBarbearia(
                barbeariaRecordDto.cep(),
                barbeariaRecordDto.rua(),
                barbeariaRecordDto.bairro());
        barbeariaModel.setHorario(barbeariaRecordDto.horario());
        return ResponseEntity.status(HttpStatus.CREATED).body(barbeariaRepository.save(barbeariaModel));
    }

    @GetMapping("/barbearia")
    public ResponseEntity<List<BarbeariaModel>> getAllBarbearias() {
        List<BarbeariaModel> barbearias = barbeariaRepository.findAll();
        //System.out.println("Registros encontrados: " + barbearias.size());
        return ResponseEntity.status(HttpStatus.OK).body(barbearias);
    }

    @GetMapping("/barbearia/{idBarbearia}")
    public ResponseEntity<Object> getOneBarbearia(@PathVariable Long idBarbearia) {
        return barbeariaRepository.findById(idBarbearia)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Barbearia não encontrada."));
    }
    
    @PutMapping("/barbearia/{idBarbearia}")
    public ResponseEntity<Object> updateBarbearia(@PathVariable Long idBarbearia,
            @RequestBody @Valid BarbeariaRecordDto barbeariaRecordDto) {
        return barbeariaRepository.findById(idBarbearia)
                .<ResponseEntity<Object>>map(barbearia -> {
                    barbearia.setCnpj(barbeariaRecordDto.cnpj());
                    barbearia.setEmailBarbearia(barbeariaRecordDto.emailBarbearia());
                    barbearia.setTelefoneBarbearia(barbeariaRecordDto.telefoneBarbearia());
                    barbearia.setSenhaBarbearia(barbeariaRecordDto.senhaBarbearia());
                    barbearia.setNomeBarbearia(barbeariaRecordDto.nomeBarbearia());
                    barbearia.setEnderecoBarbearia(barbeariaRecordDto.cep(), barbeariaRecordDto.rua(), barbeariaRecordDto.bairro());
                    barbearia.setHorario(barbeariaRecordDto.horario());
                    return ResponseEntity.ok(barbeariaRepository.save(barbearia));
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Barbearia não encontrada."));
    }
    
    @DeleteMapping("/barbearia/{idBarbearia}")
    public ResponseEntity<Object> deleteBarbearia(@PathVariable Long idBarbearia) {
        return barbeariaRepository.findById(idBarbearia)
                .<ResponseEntity<Object>>map(barbearia -> {
                    barbeariaRepository.delete(barbearia);
                    return ResponseEntity.ok("Barbearia deletada com sucesso!");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Barbearia não encontrada."));
    }
    
    
}
