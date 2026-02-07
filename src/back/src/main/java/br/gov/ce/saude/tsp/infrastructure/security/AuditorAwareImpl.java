package br.gov.ce.saude.tsp.infrastructure.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import br.gov.ce.saude.tsp.domains.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import br.gov.ce.saude.tsp.domains.entities.Usuario;

import java.util.Optional;
@Component("auditorAware")
public class AuditorAwareImpl implements AuditorAware<Usuario> {

    private final UsuarioRepository usuarioRepository;

    public AuditorAwareImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Optional<Usuario> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof Usuario usuario) {
            return usuarioRepository.findById(usuario.getId());
        }
        if (principal instanceof UserDetails userDetails) {
            return usuarioRepository.findByEmail(userDetails.getUsername());
        }
        return Optional.empty();
    }
}