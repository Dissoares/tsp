import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [CommonModule],
})
export class FormularioComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
