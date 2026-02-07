export class FiltrosDto {
  public periodoEnvio!: string;
  public tituloProjeto!: string;
  public responsavelProjeto!: string;
  public statusProjeto!: string;
  public prioridade!: string;
  public estimativaTempo!: string;

  constructor(init?: Partial<FiltrosDto>) {
    Object.assign(this, init);
  }
}
