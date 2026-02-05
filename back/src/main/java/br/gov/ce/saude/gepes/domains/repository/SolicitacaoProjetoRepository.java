package br.gov.ce.saude.gepes.domains.repository;

import br.gov.ce.saude.gepes.domains.entities.SolicitacaoProjeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitacaoProjetoRepository extends JpaRepository<SolicitacaoProjeto, Long>, JpaSpecificationExecutor<SolicitacaoProjeto> {
}
