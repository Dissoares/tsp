package br.gov.ce.saude.tsp.domains.entities;

import br.gov.ce.saude.tsp.common.Auditoria;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "solicitacao_projeto")
public class SolicitacaoProjeto extends Auditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo_projeto", nullable = false)
    private String tituloProjeto;

    @Column(name = "descricao_projeto", nullable = false)
    private String descricaoProjeto;

    @Column(name = "responsavel_projeto", nullable = false)
    private String responsavelProjeto;

    @Column(name = "motivacao_projeto")
    private String motivacaoProjeto;

    @Column(name = "objetivos_especificos_projeto", length = 1200)
    private String objetivosEspecificosProjeto;

    @ManyToMany
    @JoinTable(
            name = "solicitacao_objetivo_estrategico",
            joinColumns = @JoinColumn(name = "solicitacao_id"),
            inverseJoinColumns = @JoinColumn(name = "objetivo_estrategico_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"solicitacao_id", "objetivo_estrategico_id"})
    )
    private List<ObjetivosEstrategicos> objetivosEstrategicosSesa;

    @Column(name = "premissas", length = 1200)
    private String premissas;

    @Column(name = "riscos")
    private String riscos;

    @Column(name = "restricoes")
    private String restricoes;

    @Column(name = "aprovacao")
    private Boolean aprovacao;

    @Column(name = "projeto_viavel")
    private Boolean projetoViavel;

    @Column(name = "estimativa_tempo")
    private String estimativaTempo;

    @Column(name = "estimativa_custo")
    private String estimativaCusto;

    @Column(nullable = false)
    private Boolean ativo = true;
}