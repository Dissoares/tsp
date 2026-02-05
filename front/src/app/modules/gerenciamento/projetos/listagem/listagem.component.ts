import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrioridadeDemandaEnum, StatusDemandaEnum } from '../../../../core/enums';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { SolicitacaoProjetosService } from '../../../../core/services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FiltrosComponent } from './filtros/filtros.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SolicitacaoProjeto } from '../../../../core/models';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FiltrosDto } from '../../../../core/dtos';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listagem',
  standalone: true,
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
  imports: [
    FiltrosComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatToolbarModule,
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
export class ListagemComponent implements OnInit {
  public formulario!: FormGroup;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  public dadosTabela = new MatTableDataSource<SolicitacaoProjeto>([]);
  public colunasTabela: Array<string> = [
    'periodoEnvio',
    'tituloProjeto',
    'responsavelProjeto',
    'statusProjeto',
    'prioridade',
    'estimativaTempo',
    'acoes',
  ];

  private readonly solicitacaoService = inject(SolicitacaoProjetosService);
  private readonly toastr = inject(ToastrService);
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

  public filtrar(filtros: FiltrosDto): void {
    this.solicitacaoService.filtrarPor(filtros).subscribe({
      next: (lista: Array<SolicitacaoProjeto>) => {
        this.dadosTabela.data = lista;
        this.dadosTabela.paginator = this.paginator;
      },
      error: (erro) => {
        this.toastr.error('Erro ao buscar solicitações', 'Erro!');
        console.error(erro);
      },
    });
  }

  public editar(solicitacao: SolicitacaoProjeto): void {
    if (this.formulario.valid) {
      this.toastr.info('Só é possivel uma edição por vez', 'Aviso!');
      return;
    }
    this.formulario.patchValue(solicitacao);

    const index = this.dadosTabela.data.indexOf(solicitacao);
    if (index > -1) {
      this.dadosTabela.data.splice(index, 1);
    }
  }

  public visualizar(solicitacao: SolicitacaoProjeto): void {}
}
