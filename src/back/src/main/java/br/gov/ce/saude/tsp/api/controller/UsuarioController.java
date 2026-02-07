package br.gov.ce.saude.tsp.api.controller;

import org.springframework.dao.DataIntegrityViolationException;
import br.gov.ce.saude.tsp.domains.service.UsuarioService;
import org.springframework.web.multipart.MultipartFile;
import br.gov.ce.saude.tsp.domains.entities.Usuario;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Map;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Object> salvar(@RequestBody Usuario usuario) {
        return executarAcao(usuario, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Object> atualizar(@RequestBody Usuario usuario) {
        return executarAcao(usuario, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> buscarPorId(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.buscarPorId(id);
            if (usuario != null) {
                return ResponseEntity.ok(usuario);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception ex) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao buscar usuário: " + ex.getMessage());
        }
    }

    private ResponseEntity<Object> executarAcao(Usuario usuario, HttpStatus status) {
        try {
            return ResponseEntity.status(status).body(usuarioService.salvar(usuario));
        } catch (DataIntegrityViolationException ex) {

            String causa = ex.getMostSpecificCause().getMessage().toLowerCase();

            if (causa.contains("uk_usuario_email")) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Já existe um usuário cadastrado com esse e-mail");
            }

            if (causa.contains("uk_usuario_nome")) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Já existe um usuário cadastrado com esse nome");
            }

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMostSpecificCause().getMessage());
        }
    }

    @PostMapping("/upload-imagem-perfil/{id}")
    public ResponseEntity<Object> uploadImagemPerfil(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            String caminhoImagem = usuarioService.salvarImagemPerfil(id, file);
            return ResponseEntity.ok(caminhoImagem);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao fazer upload da imagem: " + ex.getMessage());
        }
    }

    @PutMapping("/atualizar-imagem-perfil/{id}")
    public ResponseEntity<Object> atualizarImagemPerfil(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            String caminhoImagem = usuarioService.atualizarImagemPerfil(id, file);
            return ResponseEntity.ok(caminhoImagem);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao atualizar a imagem: " + ex.getMessage());
        }
    }

    @DeleteMapping("/remover-imagem-perfil/{id}")
    public ResponseEntity<Object> removerImagemPerfil(@PathVariable Long id) {
        try {
            usuarioService.removerImagemPerfil(id);
            return ResponseEntity.ok("Imagem de perfil removida com sucesso");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao remover a imagem: " + ex.getMessage());
        }
    }

    @GetMapping("/verificar-imagem/{nomeArquivo}")
    public ResponseEntity<Object> verificarImagem(@PathVariable String nomeArquivo) {
        try {
            java.nio.file.Path caminho = java.nio.file.Paths.get("uploads/imagens-perfil/" + nomeArquivo);
            boolean existe = java.nio.file.Files.exists(caminho);
            return ResponseEntity.ok(Map.of("nomeArquivo", nomeArquivo, "existe", existe, "caminho", caminho.toString()
            ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + ex.getMessage());
        }
    }

    @GetMapping(value = "/imagem-perfil/{id}", produces = "application/json")
    public ResponseEntity<Object> getImagemPerfil(@PathVariable Long id) {
        try {
            String caminhoImagem = usuarioService.getImagemPerfil(id);

            if (caminhoImagem != null) {
                return ResponseEntity.ok().header("Content-Type", "application/json").body(Map.of("nomeImagem", caminhoImagem, "url", "http://localhost:8080/uploads/imagens-perfil/" + caminhoImagem));
            } else {
                return ResponseEntity.ok().header("Content-Type", "application/json").body(Map.of("nomeImagem", null, "url", null));
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao buscar a imagem: " + ex.getMessage());
        }
    }
}
