package br.gov.ce.saude.tsp.domains.entities;

import br.gov.ce.saude.tsp.common.Auditoria;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "solictacao")
public class SolicitacaoProjeto extends Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tituloProjeto;
    private String descricaoProjeto;
    private String responsavelProjeto;
    private String motivacaoProjeto;
    private String objetivosEspecificosProjeto;
    private String objetivosEstrategicosSesa;
    private String premissas;
    private String riscos;
    private String restricoes;
    private Integer aprovacao;
    private Integer projetoViavel;
    private String estimativaTempo;
    private String estimativaCusto;
    private Boolean ativo;
}
