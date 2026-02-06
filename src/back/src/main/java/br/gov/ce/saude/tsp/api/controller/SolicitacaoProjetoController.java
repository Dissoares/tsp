package br.gov.ce.saude.tsp.api.controller;

import br.gov.ce.saude.tsp.api.dto.FiltroDTO;
import br.gov.ce.saude.tsp.domains.entities.SolicitacaoProjeto;
import br.gov.ce.saude.tsp.domains.service.SolicitacaoProjetoService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/solicitacao")
public class SolicitacaoProjetoController {
    private final SolicitacaoProjetoService solicitacaoService;

    @PostMapping
    public SolicitacaoProjeto salvar(@RequestBody SolicitacaoProjeto Solicitacao) {
        return solicitacaoService.salvar(Solicitacao);
    }

    @PostMapping("/filtrar")
    public List<SolicitacaoProjeto> filtrar(@RequestBody FiltroDTO filtro) {
        return solicitacaoService.filtrar(filtro);
    }

    @GetMapping("/listar")
    public List<SolicitacaoProjeto> listar() {
        return solicitacaoService.listar();
    }
}
