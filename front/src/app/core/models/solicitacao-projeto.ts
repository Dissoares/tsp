import { PerfilEnum } from '../enums';

export class SolicitacaoProjeto {
  public id?: number;
  public tituloProjeto!: string;
  public descricaoProjeto!: string;
  public responsavelProjeto?: string;
  public motivacaoProjeto?: string;
  public objetivosEspecificosProjeto!: string;
  public objetivosEstrategicosSesa!: string;
  public premissas?: string;
  public riscos?: string;
  public restricoes?: string;
  public aprovacao?: number;
  public projetoViavel?: number;
  public estimativaTempo?: string;
  public estimativaCusto?: string;
  public ativo?: string;

  constructor(init?: Partial<SolicitacaoProjeto>) {
    Object.assign(this, init);
  }
}
