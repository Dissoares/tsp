package br.gov.ce.saude.gepes.domains.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import br.gov.ce.saude.gepes.domains.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import br.gov.ce.saude.gepes.api.dto.FiltroUsuarioDTO;
import br.gov.ce.saude.gepes.domains.entities.Usuario;
import br.gov.ce.saude.gepes.api.dto.UsuarioDTO;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    private Usuario getUsuarioLogado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Usuario) {
            return (Usuario) principal;
        }
        return null;
    }

    public Usuario salvar(Usuario usuario) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuario.getId() == null) {
            String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
            usuario.setSenha(senhaCriptografada);
            usuario.setDataCriacao(LocalDateTime.now());
            usuario.setAtivo(true);

            if (usuarioLogado != null ) {
                usuario.setCriadoPor(usuarioLogado);
            }
            return usuarioRepository.save(usuario);
        } else {
            Usuario existente = usuarioRepository.findById(usuario.getId()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            if (usuario.getSenha() != null && !usuario.getSenha().isBlank()) {
                usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
            } else {
                usuario.setSenha(existente.getSenha());
            }

            if (usuarioLogado.getId() != null) {
                usuario.setModificadoPor(usuarioLogado);
            } else {
                usuario.setModificadoPor(usuario);
            }
            usuario.setDataModificacao(LocalDateTime.now());
            return usuarioRepository.save(usuario);
        }
    }
    
    public Usuario atualizar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}
