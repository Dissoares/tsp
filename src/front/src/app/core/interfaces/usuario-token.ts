export interface UsuarioToken {
  sub: string;
  roles: Array<string>;
  exp: number;
  id: number;
  email: string;
  nome: string;
  senha: string;
  confirmarSenha?: string;
  perfil: number;
  imagemPerfil?: string;
  dataCriacao?: string;
  ativo?: boolean;
}
