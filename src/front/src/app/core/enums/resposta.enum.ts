export class RespostaEnum {
  public static SIM = new RespostaEnum(1, 'SIM');
  public static NAO = new RespostaEnum(2, 'NÃO');

  private constructor(
    public readonly id: number,
    public readonly descricao: string,
  ) {}

  public static getAll(): Array<RespostaEnum> {
    return [this.SIM, this.NAO];
  }

  public static getById(id: number): RespostaEnum | undefined {
    return this.getAll().find((perfil) => perfil.id === id);
  }
}
