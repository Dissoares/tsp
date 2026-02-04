import {
  ErrosFormularioComponent,
  NadaEncontradoComponent,
} from '../../../core/components/index.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { SolicitacaoProjetosService } from '../../../core/services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SolicitacaoProjeto } from '../../../core/models';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RespostaEnum } from '../../../core/enums';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  imports: [
    ErrosFormularioComponent,
    NadaEncontradoComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatTooltipModule,
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

  private readonly solicitacaoService = inject(SolicitacaoProjetosService);
  private readonly toastr = inject(ToastrService);

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

  public verificarCamposValidos(): boolean {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.toastr.error('Preencha os campos obrigatórios.', 'Erro');
      return false;
    }

    return true;
  }

  public avancar(stepper: MatStepper): void {
    stepper.next();
  }

  public voltar(stepper: MatStepper): void {
    stepper.previous();
  }

  public enviar(): void {
    const solicitacao: SolicitacaoProjeto = this.formulario.getRawValue();

    if (this.verificarCamposValidos()) {
      this.solicitacaoService.salvar(solicitacao).subscribe({
        next: (salva: SolicitacaoProjeto) => {
          salva && salva
            ? this.toastr.success('Solicitação salva com sucesso!.', 'Sucesso!')
            : null;
        },
        error: (erro) => {
          this.toastr.error('Não foi possível salvar a solicitação.', 'Erro!');
          console.log(erro);
        },
      });
    }
  }
}
