package br.gov.ce.saude.gepes.domains.service;

import br.gov.ce.saude.gepes.domains.entities.SolicitacaoProjeto;
import br.gov.ce.saude.gepes.domains.repository.SolicitacaoProjetoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class SolicitacaoProjetoService {
    private final SolicitacaoProjetoRepository solicitacaoRepository;

    public SolicitacaoProjeto salvar(SolicitacaoProjeto solicitacao) {
        return solicitacaoRepository.save(solicitacao);
    }
}
