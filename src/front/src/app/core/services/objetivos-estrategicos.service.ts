import { environment } from '../../../environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ObjetivosEstrategicos } from '../models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjetivosEstrategicosService {
  private readonly apiUrl: string = environment.apiUrl;
  private readonly endPointUrl: string = '/objetivos-estrategicos';

  constructor(private http: HttpClient) {}

  private readonly objetivoSelecionados$ = new BehaviorSubject<Array<ObjetivosEstrategicos>>([]);
  public readonly selecionados$ = this.objetivoSelecionados$.asObservable();

  get selecionados(): Array<ObjetivosEstrategicos> {
    return this.objetivoSelecionados$.value;
  }

  public listarObjetivoEstrategicos(): Observable<Array<ObjetivosEstrategicos>> {
    return this.http.get<Array<ObjetivosEstrategicos>>(
      `${this.apiUrl}${this.endPointUrl}/listar`,
      {},
    );
  }

  public adicionarSelecionados(listaObjetivos: Array<ObjetivosEstrategicos>): void {
    this.objetivoSelecionados$.next(listaObjetivos);
  }
}
