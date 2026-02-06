package br.gov.ce.saude.tsp.api.controller;

import br.gov.ce.saude.tsp.domains.service.ObjetivosEstrategicosService;
import br.gov.ce.saude.tsp.domains.service.SolicitacaoProjetoService;
import br.gov.ce.saude.tsp.domains.entities.ObjetivosEstrategicos;
import br.gov.ce.saude.tsp.domains.entities.SolicitacaoProjeto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import lombok.AllArgsConstructor;
import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/objetivos-estrategicos")
public class ObjetivosEstrategicosController {

    private final ObjetivosEstrategicosService objetivosService;

    @GetMapping("/listar")
    public List<ObjetivosEstrategicos> listar() {
        return objetivosService.listar();
    }
}
