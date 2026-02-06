package br.gov.ce.saude.tsp.domains.service;

import br.gov.ce.saude.tsp.api.dto.FiltroDTO;
import br.gov.ce.saude.tsp.domains.entities.SolicitacaoProjeto;
import br.gov.ce.saude.tsp.domains.repository.SolicitacaoProjetoRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SolicitacaoProjetoService {
    private final SolicitacaoProjetoRepository solicitacaoRepository;

    public SolicitacaoProjeto salvar(SolicitacaoProjeto solicitacao) {
        return solicitacaoRepository.save(solicitacao);
    }

    public List<SolicitacaoProjeto> listar() {
        return solicitacaoRepository.findAll();
    }

    public List<SolicitacaoProjeto> filtrar(FiltroDTO filtro) {
        Specification<SolicitacaoProjeto> spec = Specification.where(null);

        if (filtro.getTituloProjeto() != null && !filtro.getTituloProjeto().isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("tituloProjeto")),
                            "%" + filtro.getTituloProjeto().toLowerCase() + "%"));
        }

        if (filtro.getResponsavelProjeto() != null && !filtro.getResponsavelProjeto().isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("responsavelProjeto")),
                            "%" + filtro.getResponsavelProjeto().toLowerCase() + "%"));
        }

        if (filtro.getEstimativaTempo() != null && !filtro.getEstimativaTempo().isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("estimativaTempo"), filtro.getEstimativaTempo()));
        }

        if (filtro.getPrioridade() != null && !filtro.getPrioridade().isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("prioridade"), filtro.getPrioridade()));
        }

        if (filtro.getStatusProjeto() != null && !filtro.getStatusProjeto().isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("statusProjeto"), filtro.getStatusProjeto()));
        }

        return solicitacaoRepository.findAll(spec);
    }

}
