package br.gov.ce.saude.tsp.domains.repository;

import br.gov.ce.saude.tsp.domains.entities.SolicitacaoProjeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitacaoProjetoRepository extends JpaRepository<SolicitacaoProjeto, Long>, JpaSpecificationExecutor<SolicitacaoProjeto> {
}
