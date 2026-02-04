package br.gov.ce.saude.gepes.api.controller;

import br.gov.ce.saude.gepes.domains.entities.SolicitacaoProjeto;
import br.gov.ce.saude.gepes.domains.service.SolicitacaoProjetoService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}
