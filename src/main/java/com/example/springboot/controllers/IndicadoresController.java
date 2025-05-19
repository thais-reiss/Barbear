package com.example.springboot.controllers;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.models.AgendamentoModel;
import com.example.springboot.models.ServicoModel;
import com.example.springboot.repositories.AgendamentoRepository;
import com.example.springboot.repositories.AvaliacaoRepository;

@RestController
@RequestMapping("/indicadores")
public class IndicadoresController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @GetMapping("/agendamentos/{idBarbearia}")
    public ResponseEntity<Integer> getAgendamentosPorBarbearia(@PathVariable Long idBarbearia, @RequestParam int mes) {
        int quantidade = agendamentoRepository.countAgendamentosByBarbeariaAndMes(idBarbearia, mes);
        return ResponseEntity.ok(quantidade);
    }

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @GetMapping("/avaliacoes/{idBarbearia}")
    public ResponseEntity<Double> getPercentualAvaliacoesPositivas(@PathVariable Long idBarbearia) {
        long totalAvaliacoes = avaliacaoRepository.countAvaliacoesByBarbearia(idBarbearia);
        long positivas = avaliacaoRepository.countAvaliacoesPositivasByBarbearia(idBarbearia);
        double percentual = totalAvaliacoes == 0 ? 0 : (double) positivas / totalAvaliacoes * 100;
        return ResponseEntity.ok(percentual);
    }

    @GetMapping("/servicos/popularidade/{idBarbearia}")
    public ResponseEntity<Map<String, Long>> getPopularidadeServicos(
            @PathVariable Long idBarbearia,
            @RequestParam("mes") int mes,
            @RequestParam("ano") int ano) {

        LocalDate dataInicio = LocalDate.of(ano, mes, 1);
        LocalDate dataFim = dataInicio.withDayOfMonth(dataInicio.lengthOfMonth());

        List<AgendamentoModel> agendamentos = agendamentoRepository
                .findByDataAgendamentoBetweenAndBarbearia_IdBarbearia(dataInicio, dataFim, idBarbearia);

        Map<ServicoModel, Long> contagemServicos = new HashMap<>();
        for (AgendamentoModel agendamento : agendamentos) {
            ServicoModel servico = agendamento.getServico();
            contagemServicos.put(servico, contagemServicos.getOrDefault(servico, 0L) + 1);
        }

        Map<String, Long> servicosPopulares = new HashMap<>();
        for (Map.Entry<ServicoModel, Long> entry : contagemServicos.entrySet()) {
            if (entry.getValue() >= 10) {
                servicosPopulares.put(entry.getKey().getNomeServico(), entry.getValue());
            }
        }

        return ResponseEntity.ok(servicosPopulares);
    }

    /*Codigo antigo:
     * @GetMapping("/servicos/popularidade/{idBarbearia}")
    public ResponseEntity<Map<String, Long>> getPopularidadeServicos(
            @PathVariable Long idBarbearia, 
            @RequestParam("inicio") String inicio, 
            @RequestParam("fim") String fim) {
        
        LocalDate dataInicio = LocalDate.parse(inicio);
        LocalDate dataFim = LocalDate.parse(fim);

        List<AgendamentoModel> agendamentos = agendamentoRepository.findByDataAgendamentoBetweenAndBarbearia_IdBarbearia(dataInicio, dataFim, idBarbearia);
        
        Map<ServicoModel, Long> contagemServicos = new HashMap<>();
        
        for (AgendamentoModel agendamento : agendamentos) {
            for (ServicoModel servico : agendamento.getServicos()) {
                contagemServicos.put(servico, contagemServicos.getOrDefault(servico, 0L) + 1);
            }
        }

        Map<String, Long> servicosPopulares = new HashMap<>();
        for (Map.Entry<ServicoModel, Long> entry : contagemServicos.entrySet()) {
            if (entry.getValue() >= 10) {
                servicosPopulares.put(entry.getKey().getNomeServico(), entry.getValue());
            }
        }

        return ResponseEntity.ok(servicosPopulares);
    }
     */
}
