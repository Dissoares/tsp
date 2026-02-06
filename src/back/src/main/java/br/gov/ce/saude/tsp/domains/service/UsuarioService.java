package br.gov.ce.saude.tsp.domains.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import br.gov.ce.saude.tsp.domains.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import br.gov.ce.saude.tsp.domains.entities.Usuario;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import lombok.AllArgsConstructor;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    
    private static final String UPLOAD_DIR = "uploads/imagens-perfil/";

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
    
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
    
    public String salvarImagemPerfil(Long usuarioId, MultipartFile file) throws IOException {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if (usuario.getImagemPerfil() != null) {
            throw new RuntimeException("Usuário já possui uma imagem de perfil. Use o endpoint de atualização.");
        }
        
        String nomeArquivo = gerarNomeArquivo(file);
        Path caminhoArquivo = getCaminhoArquivo(nomeArquivo);
        
        criarDiretorioUpload();
        Files.copy(file.getInputStream(), caminhoArquivo, StandardCopyOption.REPLACE_EXISTING);
        
        usuario.setImagemPerfil(nomeArquivo);

        usuarioRepository.save(usuario);
        
        return nomeArquivo;
    }
    
    public String atualizarImagemPerfil(Long usuarioId, MultipartFile file) throws IOException {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        String nomeArquivoAntigo = usuario.getImagemPerfil();
        String nomeArquivoNovo = gerarNomeArquivo(file);

        Path caminhoArquivoNovo = getCaminhoArquivo(nomeArquivoNovo);

        criarDiretorioUpload();

        Files.copy(file.getInputStream(), caminhoArquivoNovo, StandardCopyOption.REPLACE_EXISTING);

        usuario.setImagemPerfil(nomeArquivoNovo);

        usuarioRepository.save(usuario);
        
        if (nomeArquivoAntigo != null) {
            removerArquivo(nomeArquivoAntigo);
        }
        
        return nomeArquivoNovo;
    }
    
    public void removerImagemPerfil(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        String nomeArquivo = usuario.getImagemPerfil();
        usuario.setImagemPerfil(null);

        usuarioRepository.save(usuario);
        if (nomeArquivo != null) {
            removerArquivo(nomeArquivo);
        }
    }
    
    public String getImagemPerfil(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return usuario.getImagemPerfil();
    }
    
    private String gerarNomeArquivo(MultipartFile file) {
        String extensao = getFileExtension(file.getOriginalFilename());
        return UUID.randomUUID().toString() + "." + extensao;
    }
    
    private String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf('.') == -1) {
            return "jpg";
        }
        return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
    }
    
    private Path getCaminhoArquivo(String nomeArquivo) {
        return Paths.get(UPLOAD_DIR + nomeArquivo);
    }
    
    private void criarDiretorioUpload() throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
    }
    
    private void removerArquivo(String nomeArquivo) {
        try {
            Path caminhoArquivo = getCaminhoArquivo(nomeArquivo);
            Files.deleteIfExists(caminhoArquivo);
        } catch (IOException e) {
            System.err.println("Erro ao remover arquivo: " + e.getMessage());
        }
    }
}
