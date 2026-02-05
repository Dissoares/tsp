import { ReactiveFormsModule, FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { PrioridadeDemandaEnum, StatusDemandaEnum } from '../../../../../core/enums';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FiltrosDto } from '../../../../../core/dtos';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-filtros',
  standalone: true,
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatTimepickerModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
})
export class FiltrosComponent implements OnInit {
  @Output() public filtro = new EventEmitter<any>();
  public formulario!: FormGroup;

  public prioridadeEnum = PrioridadeDemandaEnum.getAll();
  public statusDemandaEnum = StatusDemandaEnum.getAll();

  private readonly router = inject(Router);

  constructor(public fb: FormBuilder) {}

  public ngOnInit(): void {
    this.criarFormulario();
  }

  public criarFormulario(): void {
    this.formulario = this.fb.group({
      periodoEnvio: [null],
      tituloProjeto: [null],
      responsavelProjeto: [null],
      statusProjeto: [null],
      prioridade: [null],
      estimativaTempo: [null],
    });
  }

  public limpar(): void {
    this.formulario.reset();
  }

  public filtrar(): void {
    const dadosFiltro: FiltrosDto = this.formulario.value;
    this.filtro.emit(dadosFiltro);
  }

  public novoProjeto(): void {
    this.router.navigate(['']);
  }
}
