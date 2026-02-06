import { ObjetivosEstrategicos } from '../models';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObjetivosEstrategicosService {
  constructor() {}

  private readonly objetivoSelecionados$ = new BehaviorSubject<Array<ObjetivosEstrategicos>>([]);
  public readonly selecionados$ = this.objetivoSelecionados$.asObservable();

  get selecionados(): Array<ObjetivosEstrategicos> {
    return this.objetivoSelecionados$.value;
  }

  public adicionarSelecionados(listaObjetivos: Array<ObjetivosEstrategicos>): void {
    this.objetivoSelecionados$.next(listaObjetivos);
  }
}
