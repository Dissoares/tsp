import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UsuarioToken } from '../interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { PerfilEnum } from '../enums';
import { LoginDto } from '../dtos';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly LOCAL_STORAGE = { TOKEN: 'token' } as const;
  private readonly API_ENDPOINT = { AUTH: 'auth' } as const;
  private readonly usuarioLogado = new BehaviorSubject<UsuarioToken | null>(null);
  private readonly perfil = new BehaviorSubject<PerfilEnum | null>(null);
  public token$ = new BehaviorSubject<string | null>(
    localStorage.getItem(this.LOCAL_STORAGE.TOKEN),
  );

  public readonly usuarioLogado$ = this.usuarioLogado.asObservable();
  public readonly perfil$ = this.perfil.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    this.carregarTokenDoStorage();
  }

  public login(loginDto: LoginDto): Observable<{ token: string }> {
    const url = `${this.apiUrl}/${this.API_ENDPOINT.AUTH}/login`;

    return this.http.post<{ token: string }>(url, loginDto).pipe(
      tap(({ token }) => this.processarToken(token)),
      catchError((error) => {
        console.error('Erro no login:', error);
        return throwError(() => error);
      }),
    );
  }

  private carregarTokenDoStorage(): void {
    const token = localStorage.getItem(this.LOCAL_STORAGE.TOKEN);
    if (!token) {
      this.removerAcesso();
      return;
    }
    try {
      if (this.isTokenExpirado(token)) {
        console.warn('Token expirado. Fazendo logout.');
        this.removerAcesso();
        return;
      }
      const usuario = this.decodificarToken(token);
      this.setUsuarioLogado(usuario);
    } catch (error) {
      this.removerAcesso();
    }
  }

  private processarToken(token: string): void {
    try {
      if (this.isTokenExpirado(token)) {
        console.warn('Token recebido já está expirado.');
        throw new Error('Token expirado');
      }
      localStorage.setItem(this.LOCAL_STORAGE.TOKEN, token);
      const usuario = this.decodificarToken(token);
      this.setUsuarioLogado(usuario);
    } catch (error) {
      console.error('Erro ao processar token:', error);
      throw error;
    }
  }

  public isTokenExpirado(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) return true;
      const expMs = decoded.exp * 1000;
      return Date.now() > expMs;
    } catch (e) {
      return true;
    }
  }

  private decodificarToken(token: string): UsuarioToken {
    return jwtDecode<UsuarioToken>(token);
  }

  private setUsuarioLogado(usuario: UsuarioToken): void {
    this.usuarioLogado.next(usuario);
    const perfil = PerfilEnum.getById(usuario.perfil);
    this.perfil.next(perfil ?? null);
  }

  public removerAcesso(): void {
    localStorage.removeItem(this.LOCAL_STORAGE.TOKEN);
    this.usuarioLogado.next(null);
    this.perfil.next(null);
  }

  public getNivelAcessoId(): number {
    return this.perfil.value?.id ?? 0;
  }

  private temAcesso(...perfis: Array<PerfilEnum>): boolean {
    return perfis.some((perfil) => perfil.id === this.getNivelAcessoId());
  }

  public isAdmin(): boolean {
    return this.temAcesso(PerfilEnum.ADMINISTRADOR);
  }

  public isSecretaria(): boolean {
    return this.temAcesso(PerfilEnum.SECRETARIA);
  }

  public isSecretariaExecutiva(): boolean {
    return this.temAcesso(PerfilEnum.SECRETARIA_EXECUTIVA);
  }

  public isUsuario(): boolean {
    return this.temAcesso(PerfilEnum.USUARIO);
  }

  public podeAcessarAreaAdmin(): boolean {
    return this.isAdmin();
  }

  public podeAcessarAreaSecretaria(): boolean {
    return this.isSecretaria();
  }

  public podeAcessarAreaSecretariaExecutiva(): boolean {
    return this.isSecretariaExecutiva();
  }

  public podeAcessarAreaUsuario(): boolean {
    return this.isUsuario();
  }

  public logout(): void {
    this.removerAcesso();
    this.router.navigate([this.API_ENDPOINT.AUTH]);
  }

  public redirecionarComBaseNoPerfil(): void {
    this.router.navigate(['/']);
  }
}
