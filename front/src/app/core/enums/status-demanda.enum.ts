export class StatusDemandaEnum {
  public static AGUARDANDO = new StatusDemandaEnum(1, 'AGUARDANDO');
  public static DEVOLVIDO = new StatusDemandaEnum(2, 'DEVOLVIDO');
  public static APROVADO = new StatusDemandaEnum(3, 'APROVADO');
  public static RECUSADO = new StatusDemandaEnum(4, 'RECUSADO');

  private constructor(
    public readonly id: number,
    public readonly descricao: string,
  ) {}

  public static getAll(): Array<StatusDemandaEnum> {
    return [this.AGUARDANDO, this.DEVOLVIDO, this.APROVADO, this.RECUSADO];
  }

  public static getById(id: number): StatusDemandaEnum | undefined {
    return this.getAll().find((perfil) => perfil.id === id);
  }
}
