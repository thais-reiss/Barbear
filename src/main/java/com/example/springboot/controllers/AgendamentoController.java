package com.example.springboot.controllers;

import com.example.springboot.dto.AgendamentoRecordDto;
import com.example.springboot.dto.StatusAgendamento;
import com.example.springboot.models.AgendamentoModel;
import com.example.springboot.models.BarbeariaModel;
import com.example.springboot.models.ClienteModel;
import com.example.springboot.models.ServicoModel;
import com.example.springboot.repositories.AgendamentoRepository;
import com.example.springboot.repositories.BarbeariaRepository;
import com.example.springboot.repositories.ClienteRepository;
import com.example.springboot.repositories.ServicoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private BarbeariaRepository barbeariaRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @PostMapping
    public ResponseEntity<Object> saveAgendamento(@RequestBody @Valid AgendamentoRecordDto agendamentoRecordDto) {
        var agendamentoModel = new AgendamentoModel();

        Optional<ClienteModel> clienteOptional = clienteRepository.findById(agendamentoRecordDto.idCliente());
        if (clienteOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        Optional<ServicoModel> servicoOptional = servicoRepository.findById(agendamentoRecordDto.idServico());
        if (servicoOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Serviço não encontrado.");
        }

        Optional<BarbeariaModel> barbeariaOptional = barbeariaRepository.findById(agendamentoRecordDto.idBarbearia());
        if (barbeariaOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Barbearia não encontrada.");
        }

        agendamentoModel.setDataAgendamento(LocalDate.parse(agendamentoRecordDto.dataAgendamento()));
        agendamentoModel.setHorarioAgendamento(LocalTime.parse(agendamentoRecordDto.horarioAgendamento()));
        agendamentoModel.setDescricaoAgendamento(agendamentoRecordDto.descricaoAgendamento());
        agendamentoModel.setCliente(clienteOptional.get());
        agendamentoModel.setServico(servicoOptional.get());
        agendamentoModel.setBarbearia(barbeariaOptional.get());
        agendamentoModel.setStatusAgendamento(StatusAgendamento.PENDENTE.getCode());

        return ResponseEntity.status(HttpStatus.CREATED).body(agendamentoRepository.save(agendamentoModel));
    }

    /*
     * Codigo antigo:
     * 
     * @PostMapping
     * public ResponseEntity<Object> saveAgendamento(@RequestBody @Valid
     * AgendamentoRecordDto agendamentoRecordDto) {
     * var agendamentoModel = new AgendamentoModel();
     * BeanUtils.copyProperties(agendamentoRecordDto, agendamentoModel);
     * 
     * Optional<ClienteModel> clienteOptional =
     * clienteRepository.findById(agendamentoRecordDto.idCliente());
     * if (clienteOptional.isEmpty()) {
     * return
     * ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
     * }
     * 
     * Optional<BarbeariaModel> barbeariaOptional =
     * barbeariaRepository.findById(agendamentoRecordDto.idBarbearia());
     * if (barbeariaOptional.isEmpty()) {
     * return
     * ResponseEntity.status(HttpStatus.NOT_FOUND).body("Barbearia não encontrada."
     * );
     * }
     * 
     * agendamentoModel.setCliente(clienteOptional.get());
     * agendamentoModel.setBarbearia(barbeariaOptional.get());
     * 
     * return
     * ResponseEntity.status(HttpStatus.CREATED).body(agendamentoRepository.save(
     * agendamentoModel));
     * }
     */

    @GetMapping
    public ResponseEntity<List<AgendamentoModel>> getAllAgendamentos() {
        return ResponseEntity.status(HttpStatus.OK).body(agendamentoRepository.findAll());
    }

    @GetMapping("/{idAgendamento}")
    public ResponseEntity<Object> getOneAgendamento(@PathVariable(value = "idAgendamento") Long idAgendamento) {
        Optional<AgendamentoModel> agendamento = agendamentoRepository.findById(idAgendamento);
        if (agendamento.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não encontrado.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(agendamento.get());
    }

    @PutMapping("/{idAgendamento}")
    public ResponseEntity<Object> updateAgendamento(@PathVariable(value = "idAgendamento") Long idAgendamento,
            @RequestBody @Valid AgendamentoRecordDto agendamentoRecordDto) {
        Optional<AgendamentoModel> agendamento = agendamentoRepository.findById(idAgendamento);
        if (agendamento.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não encontrado.");
        }
        var agendamentoModel = agendamento.get();

        Optional<ClienteModel> clienteOptional = clienteRepository.findById(agendamentoRecordDto.idCliente());
        if (clienteOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        Optional<ServicoModel> servicoOptional = servicoRepository.findById(agendamentoRecordDto.idServico());
        if (servicoOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Serviço não encontrado.");
        }

        Optional<BarbeariaModel> barbeariaOptional = barbeariaRepository.findById(agendamentoRecordDto.idBarbearia());
        if (barbeariaOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Barbearia não encontrada.");
        }

        agendamentoModel.setDataAgendamento(LocalDate.parse(agendamentoRecordDto.dataAgendamento()));
        agendamentoModel.setHorarioAgendamento(LocalTime.parse(agendamentoRecordDto.horarioAgendamento()));
        agendamentoModel.setDescricaoAgendamento(agendamentoRecordDto.descricaoAgendamento());
        agendamentoModel.setCliente(clienteOptional.get());
        agendamentoModel.setServico(servicoOptional.get());
        agendamentoModel.setBarbearia(barbeariaOptional.get());
        //agendamentoModel.setStatusAgendamento(agendamentoRecordDto.statusAgendamento());
        if (agendamentoRecordDto.statusAgendamento() != null) {
            agendamentoModel.setStatusAgendamento(agendamentoRecordDto.statusAgendamento());
        } else {
            //agendamentoModel.setStatusAgendamento(1);
            agendamentoModel.setStatusAgendamento(agendamentoModel.getStatusAgendamento()); 
        }
        return ResponseEntity.status(HttpStatus.OK).body(agendamentoRepository.save(agendamentoModel));
    }

    /*
     * Codigo antigo:
     * 
     * @PutMapping("/{idAgendamento}")
     * public ResponseEntity<Object> updateAgendamento(@PathVariable(value =
     * "idAgendamento") Long idAgendamento,
     * 
     * @RequestBody @Valid AgendamentoRecordDto agendamentoRecordDto) {
     * Optional<AgendamentoModel> agendamento =
     * agendamentoRepository.findById(idAgendamento);
     * if (agendamento.isEmpty()) {
     * return ResponseEntity.status(HttpStatus.NOT_FOUND).
     * body("Agendamento não encontrado.");
     * }
     * var agendamentoModel = agendamento.get();
     * BeanUtils.copyProperties(agendamentoRecordDto, agendamentoModel);
     * 
     * Optional<ClienteModel> clienteOptional =
     * clienteRepository.findById(agendamentoRecordDto.idCliente());
     * if (clienteOptional.isEmpty()) {
     * return
     * ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
     * }
     * 
     * Optional<BarbeariaModel> barbeariaOptional =
     * barbeariaRepository.findById(agendamentoRecordDto.idBarbearia());
     * if (barbeariaOptional.isEmpty()) {
     * return
     * ResponseEntity.status(HttpStatus.NOT_FOUND).body("Barbearia não encontrada."
     * );
     * }
     * 
     * agendamentoModel.setCliente(clienteOptional.get());
     * agendamentoModel.setBarbearia(barbeariaOptional.get());
     * 
     * return ResponseEntity.status(HttpStatus.OK).body(agendamentoRepository.save(
     * agendamentoModel));
     * }
     */

    @DeleteMapping("/{idAgendamento}")
    public ResponseEntity<Object> deleteAgendamento(@PathVariable(value = "idAgendamento") Long idAgendamento) {
        Optional<AgendamentoModel> agendamento = agendamentoRepository.findById(idAgendamento);
        if (agendamento.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não encontrado.");
        }
        agendamentoRepository.delete(agendamento.get());
        return ResponseEntity.status(HttpStatus.OK).body("Agendamento deletado com sucesso!");
    }
}
