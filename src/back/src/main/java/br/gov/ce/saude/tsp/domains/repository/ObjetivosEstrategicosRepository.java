package br.gov.ce.saude.tsp.domains.repository;

import br.gov.ce.saude.tsp.domains.entities.ObjetivosEstrategicos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObjetivosEstrategicosRepository extends JpaRepository<ObjetivosEstrategicos, Long> {
}
