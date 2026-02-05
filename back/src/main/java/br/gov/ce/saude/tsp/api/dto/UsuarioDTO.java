package br.gov.ce.saude.tsp.api.dto;

import java.time.LocalDateTime;

public record UsuarioDTO(
        Long id,
        String nome,
        String email,
        Integer perfil,
        LocalDateTime dataCriacao,
        Boolean ativo
) {}