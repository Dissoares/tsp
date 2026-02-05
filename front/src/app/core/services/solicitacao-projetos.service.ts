import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SolicitacaoProjeto } from '../models';
import { Injectable } from '@angular/core';
import { FiltrosDto } from '../dtos';
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

  public filtrarPor(filtro: FiltrosDto): Observable<Array<SolicitacaoProjeto>> {
    const params = new HttpParams({ fromObject: this.camposFiltrados(filtro) });
    return this.http.post<Array<SolicitacaoProjeto>>(`${this.apiUrl}${this.endPointUrl}/filtrar`, {
      params,
    });
  }

  private camposFiltrados(filtros: any): { [param: string]: string } {
    const filtrados: { [campo: string]: string } = {};
    Object.keys(filtros).forEach((campo) => {
      if (filtros[campo] !== undefined && filtros[campo] !== null) {
        filtrados[campo] = filtros[campo].toString();
      }
    });
    return filtrados;
  }
}
