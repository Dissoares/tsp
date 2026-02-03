import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtros',
  standalone: true,
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
  imports: [CommonModule],
})
export class FiltrosComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
