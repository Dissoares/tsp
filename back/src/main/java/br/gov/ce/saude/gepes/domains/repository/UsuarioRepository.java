package br.gov.ce.saude.gepes.domains.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import br.gov.ce.saude.gepes.api.dto.FiltroUsuarioDTO;
import br.gov.ce.saude.gepes.domains.entities.Usuario;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import br.gov.ce.saude.gepes.api.dto.UsuarioDTO;
import java.util.Optional;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}