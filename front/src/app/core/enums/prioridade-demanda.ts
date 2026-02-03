export class PrioridadeDemandaEnum {
  public static ALTA = new PrioridadeDemandaEnum(1, 'ALTA');
  public static MEDIA = new PrioridadeDemandaEnum(2, 'MÉDIA');
  public static BAIXA = new PrioridadeDemandaEnum(3, 'BAIXA');
  public static URGENTE = new PrioridadeDemandaEnum(4, 'URGENTE');

  private constructor(
    public readonly id: number,
    public readonly descricao: string,
  ) {}

  public static getAll(): Array<PrioridadeDemandaEnum> {
    return [this.ALTA, this.MEDIA, this.BAIXA, this.URGENTE];
  }

  public static getById(id: number): PrioridadeDemandaEnum | undefined {
    return this.getAll().find((perfil) => perfil.id === id);
  }
}
