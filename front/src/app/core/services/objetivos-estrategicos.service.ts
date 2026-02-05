import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ObjetivosEstrategicosService {
  private readonly apiUrl: string = environment.apiUrl;
  private readonly endPointUrl: string = '/solicitacao';

  constructor(private http: HttpClient) {}
}
