import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ObjetivosEstrategicosService } from '../../services';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ObjetivosEstrategicos } from '../../models';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-objetivos-estrategicos',
  standalone: true,
  templateUrl: './dialog-objetivos-estrategicos.component.html',
  styleUrls: ['./dialog-objetivos-estrategicos.component.scss'],
  imports: [
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
})
export class DialogObjetivosEstrategicosComponent implements OnInit {
  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  private readonly objetivosService = inject(ObjetivosEstrategicosService);
  private readonly toastr = inject(ToastrService);

  public dadosTabela = new MatTableDataSource<ObjetivosEstrategicos>([]);
  public listaObjetivosEstrategico: Array<ObjetivosEstrategicos> = [];
  public objetivosSelecionados = new Set<ObjetivosEstrategicos>();

  public colunasTabela: Array<string> = [
    'secretariaExecutiva',
    'coordenadoria',
    'objetivo',
    'selecionar',
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogObjetivosEstrategicosComponent>,
    @Inject(MAT_DIALOG_DATA) public objetivos: any,
  ) {}

  public ngOnInit(): void {
    this.buscarObjetivos();
  }

  public carregarObjetivosAdicionados(): void {
    const itensJaSelecionados = this.objetivosService.selecionados;
    itensJaSelecionados.forEach((item) => {
      const itemCorrespondente = this.listaObjetivosEstrategico.find((obj) => obj.id === item.id);
      if (itemCorrespondente) {
        this.objetivosSelecionados.add(itemCorrespondente);
      }
    });
  }

  public ngAfterViewInit(): void {
    this.dadosTabela.paginator = this.paginator;
  }

  public buscarObjetivos(): void {
    this.objetivosService.listarObjetivoEstrategicos().subscribe({
      next: (objetivos: Array<ObjetivosEstrategicos>) => {
        this.listaObjetivosEstrategico = objetivos;
        this.dadosTabela.data = objetivos;
        this.dadosTabela.paginator = this.paginator;

        this.carregarObjetivosAdicionados();
      },
      error: () => {
        this.toastr.error('Erro ao listar objetivos estratégicos', 'Erro!');
      },
    });
  }

  public aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dadosTabela.filter = valor.trim().toLowerCase();

    if (this.dadosTabela.paginator) {
      this.dadosTabela.paginator.firstPage();
    }
  }

  public limparFiltro(): void {
    this.dadosTabela.filter = '';
  }

  public adicionar(): void {
    if (!this.objetivosSelecionados.size) {
      this.toastr.info('Selecione um objetivo', 'Aviso!');
      return;
    }
    const selecionados = Array.from(this.objetivosSelecionados);

    this.objetivosService.adicionarSelecionados(selecionados);

    this.dialogRef.close(selecionados);
  }

  public selecionarObjetivo(item: ObjetivosEstrategicos): void {
    if (this.objetivosSelecionados.has(item)) {
      this.objetivosSelecionados.delete(item);
    } else {
      this.objetivosSelecionados.add(item);
    }
  }

  public isSelecionado(item: ObjetivosEstrategicos): boolean {
    return this.objetivosSelecionados.has(item);
  }

  public cancelar(): void {
    this.dialogRef.close();
  }
}
