package br.gov.ce.saude.gepes.domains.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolicitacaoProjetoRepository extends JpaRepository<br.gov.ce.saude.gepes.domains.entities.SolicitacaoProjeto, Long> {
}
