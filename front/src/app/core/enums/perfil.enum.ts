export class PerfilEnum {
  public static ADMINISTRADOR = new PerfilEnum(1, 'Administrador');
  public static SECRETARIA = new PerfilEnum(2, 'SECRETARIA');
  public static SECRETARIA_EXECUTIVA = new PerfilEnum(3, 'SECRETARIA EXECUTIVA');
  public static USUARIO = new PerfilEnum(4, 'USUARIO');

  private constructor(
    public readonly id: number,
    public readonly descricao: string,
  ) {}

  public static getAll(): Array<PerfilEnum> {
    return [this.ADMINISTRADOR, this.SECRETARIA, this.SECRETARIA_EXECUTIVA, this.USUARIO];
  }

  public static getById(id: number): PerfilEnum | undefined {
    return this.getAll().find((perfil) => perfil.id === id);
  }
}
