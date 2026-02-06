export interface UsuarioToken {
  sub: string;
  roles: Array<string>;
  exp: number;
  idUsuario: number;
  email: string;
  nome: string;
  senha: string;
  confirmarSenha?: string;
  perfil: number;
  dataCriacao?: string;
  ativo?: boolean;
}
