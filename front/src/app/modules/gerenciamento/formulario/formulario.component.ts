import {
  ErrosFormularioComponent,
  NadaEncontradoComponent,
} from '../../../core/components/index.component';
import {
  ObjetivosEstrategicosService,
  SolicitacaoProjetosService,
  DialogConfirmacaoService,
} from '../../../core/services';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DialogObjetivosEstrategicosComponent } from '../../../core/dialogs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SolicitacaoProjeto } from '../../../core/models';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RespostaEnum } from '../../../core/enums';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
    MatPaginatorModule,
    MatStepperModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
})
export class FormularioComponent implements OnInit {
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  public formulario!: FormGroup;

  public respostaEnum = RespostaEnum.getAll();

  public dadosTabela = new MatTableDataSource<any>([]);
  public colunasTabela: Array<string> = [
    'secretariaExecutiva',
    'coordenadoria',
    'objetivo',
    'acoes',
  ];

  private readonly solicitacaoService = inject(SolicitacaoProjetosService);
  private readonly objetivosService = inject(ObjetivosEstrategicosService);
  private readonly confirmacaoDialog = inject(DialogConfirmacaoService);
  private readonly dadosDialog = inject(MatDialog);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  constructor(public fb: FormBuilder) {}

  public ngOnInit(): void {
    this.criarFormulario();
  }

  public ngAfterViewInit(): void {
    this.dadosTabela.paginator = this.paginator;
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

  public cancelar() {
    this.router.navigate(['']);
  }

  public enviar(): void {
    const solicitacao: SolicitacaoProjeto = this.formulario.getRawValue();

    if (this.verificarCamposValidos(solicitacao)) {
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

  public adicionarObjetivosEstrategicos(): void {
    const dialogRef = this.dadosDialog.open(DialogObjetivosEstrategicosComponent, {
      width: '95%',
      maxWidth: '90vw',
      disableClose: false,
      backdropClass: 'fundo-modal',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.dadosTabela.data = resultado;
        this.dadosTabela.paginator = this.paginator;
      }
    });
  }

  public verificarCamposValidos(solicitacao: SolicitacaoProjeto): boolean {
    if (
      !solicitacao.tituloProjeto ||
      !solicitacao.descricaoProjeto ||
      !solicitacao.responsavelProjeto ||
      !solicitacao.motivacaoProjeto ||
      !solicitacao.objetivosEspecificosProjeto ||
      !solicitacao.objetivosEstrategicosSesa ||
      !solicitacao.premissas ||
      !solicitacao.riscos ||
      !solicitacao.restricoes ||
      !solicitacao.aprovacao ||
      !solicitacao.projetoViavel ||
      !solicitacao.estimativaTempo ||
      !solicitacao.estimativaCusto
    ) {
      this.formulario.markAllAsTouched();
      this.toastr.error('Preencha os campos obrigatórios.', 'Erro');
      return false;
    }

    return true;
  }

  public excluir(item: any): void {
    this.confirmacaoDialog
      .openDialog({
        titulo: 'Confirmação!',
        acao: 'excluir',
        textoConfirmacao: 'Excluir',
        textoCancelamento: 'Cancelar',
      })
      .subscribe((resultado) => {
        if (!resultado) return;
        this.dadosTabela.data = this.dadosTabela.data.filter(
          (objetivos: any) => objetivos.id !== item.id,
        );

        const itensAtualizados = this.objetivosService.selecionados.filter(
          (objetivos: any) => objetivos.id !== item.id,
        );
        this.objetivosService.adicionarSelecionados(itensAtualizados);

        this.toastr.info('Item excluído!', 'Aviso!');
      });
  }
}
