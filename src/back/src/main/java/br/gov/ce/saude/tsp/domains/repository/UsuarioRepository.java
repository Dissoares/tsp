package br.gov.ce.saude.tsp.domains.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.gov.ce.saude.tsp.domains.entities.Usuario;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}