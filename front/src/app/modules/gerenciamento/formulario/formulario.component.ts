import {
  ErrosFormularioComponent,
  NadaEncontradoComponent,
} from '../../../core/components/index.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { SolicitacaoProjetosService } from '../../../core/services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { campoObrigatorio } from '../../../core/validators';
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

  public avancar(stepper: MatStepper): void {
    stepper.next();
  }

  public voltar(stepper: MatStepper): void {
    stepper.previous();
  }

  public enviar(): void {
    const solicitacao: SolicitacaoProjeto = this.formulario.getRawValue();

    this.solicitacaoService.salvar(solicitacao).subscribe((salva: SolicitacaoProjeto) => {
      if (salva && salva.id) {
        this.toastr.success('Solicitação salva com sucesso!.', 'Sucesso!');
        return;
      }
      this.toastr.error('Não foi possível salvar a solicitação.', 'Erro!');
    });
  }
}
