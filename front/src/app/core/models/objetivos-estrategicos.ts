export class ObjetivosEstrategicos {
  public id?: number;
  public secretariaExecutiva!: string;
  public coordenadoria!: string;
  public descricaoObjetivo?: string;
  public ativo?: boolean;
  
  constructor(init?: Partial<ObjetivosEstrategicos>) {
    Object.assign(this, init);
  }
}
