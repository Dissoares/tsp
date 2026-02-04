import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SolicitacaoProjeto } from '../../../core/models';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RespostaEnum } from '../../../core/enums';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
})
export class FormularioComponent implements OnInit {
  public formulario!: FormGroup;

  public respostaEnum = RespostaEnum.getAll();

  constructor(public fb: FormBuilder) {}

  public ngOnInit(): void {
    this.criarFormulario();
  }

  public criarFormulario(): void {
    this.formulario = this.fb.group({
      tituloProjeto: [null],
      descricaoProjeto: [null],
      responsavelProjeto: [null],
      motivacaoProjeto: [null],
      objetivosEspecificosProjeto: [null],
      objetivosEstrategicosSesa: [null],
      premissas: [null],
      riscos: [null],
      restricoes: [null],
      aprovacao: [null],
      projetoViavel: [null],
      estimativaTempo: [null],
      estimativaCusto: [null],
    });
  }

  public enviar(): void {
    const dados: SolicitacaoProjeto = this.formulario.getRawValue();
  }
}
