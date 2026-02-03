package br.gov.ce.saude.gepes.api.controller;

import org.springframework.dao.DataIntegrityViolationException;
import br.gov.ce.saude.gepes.domains.service.UsuarioService;
import br.gov.ce.saude.gepes.domains.entities.Usuario;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
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
}
