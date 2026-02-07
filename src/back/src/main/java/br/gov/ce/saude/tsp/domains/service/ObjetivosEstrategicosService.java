package br.gov.ce.saude.tsp.domains.service;

import br.gov.ce.saude.tsp.domains.repository.ObjetivosEstrategicosRepository;
import br.gov.ce.saude.tsp.domains.repository.SolicitacaoProjetoRepository;
import br.gov.ce.saude.tsp.domains.entities.ObjetivosEstrategicos;
import br.gov.ce.saude.tsp.domains.entities.SolicitacaoProjeto;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ObjetivosEstrategicosService {
    private final SolicitacaoProjetoRepository solicitacaoRepository;
    private final ObjetivosEstrategicosRepository objetivosRepository;

    public SolicitacaoProjeto salvar(SolicitacaoProjeto solicitacao) {
        List<Long> ids = solicitacao.getObjetivosEstrategicosSesa()
                .stream()
                .map(ObjetivosEstrategicos::getId)
                .toList();

        List<ObjetivosEstrategicos> objetivosGerenciados = objetivosRepository.findAllById(ids);

        if (objetivosGerenciados.size() != ids.size()) {
            throw new IllegalArgumentException("Um ou mais objetivos estratégicos informados não existem no banco.");
        }
        solicitacao.setObjetivosEstrategicosSesa(objetivosGerenciados);
        return solicitacaoRepository.save(solicitacao);
    }
    public List<ObjetivosEstrategicos> listar() {
        return objetivosRepository.findAll();
    }
}
