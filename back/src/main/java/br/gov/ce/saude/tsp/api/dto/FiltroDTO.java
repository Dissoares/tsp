package br.gov.ce.saude.tsp.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FiltroDTO {
    private String periodoEnvio;
    private String tituloProjeto;
    private String responsavelProjeto;
    private String statusProjeto;
    private String prioridade;
    private String estimativaTempo;
}
