package br.gov.ce.saude.tsp.domains.entities;

import br.gov.ce.saude.tsp.common.Auditoria;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "objetivos_estrategicos")
public class ObjetivosEstrategicos extends Auditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "secretaria_executiva")
    private String secretariaExecutiva;

    @Column(name = "coordenadoria")
    private String coordenadoria;

    @Column(name = "descricao_objetivo")
    private String descricaoObjetivo;
}

