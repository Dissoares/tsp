import { FiltrosComponent } from './filtros/filtros.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem',
  standalone: true,
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
  imports: [CommonModule, FiltrosComponent],
})
export class ListagemComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
