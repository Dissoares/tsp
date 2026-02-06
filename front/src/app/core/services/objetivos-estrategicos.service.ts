import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObjetivosEstrategicosService {
  constructor() {}

  private readonly objetivoSelecionados$ = new BehaviorSubject<Array<any>>([]);
  public readonly selecionados$ = this.objetivoSelecionados$.asObservable();

  get selecionados(): Array<any> {
    return this.objetivoSelecionados$.value;
  }

  public adicionarSelecionados(listaObjetivos: Array<any>): void {
    this.objetivoSelecionados$.next(listaObjetivos);
  }
}
