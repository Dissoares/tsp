import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { SolicitacaoProjeto } from '../models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoProjetosService {
  private readonly apiUrl: string = environment.apiUrl;
  private readonly endPointUrl: string = '/solicitacao';

  constructor(private http: HttpClient) {}

  public salvar(solicitacao: SolicitacaoProjeto): Observable<SolicitacaoProjeto> {
    return this.http.post<SolicitacaoProjeto>(this.apiUrl + this.endPointUrl, solicitacao);
  }
}
