import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
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

  public dadosTabela = new MatTableDataSource<any>([]);
  private readonly toastr = inject(ToastrService);
  public objetivosSelecionados = new Set<any>();

  public colunasTabela: Array<string> = [
    'secretariaExecutiva',
    'coordenadoria',
    'objetivo',
    'selecionar',
  ];

  public listaObjetivosEstrategico = [
    {
      id: 1,
      secretariaExecutiva: 'SEADE',
      coordenadoria: 'SEVIG',
      objetivo: 'Implementação da carteira de serviços das regiões de saúde',
    },
    {
      id: 2,
      secretariaExecutiva: 'SEADE',
      coordenadoria: 'SESA',
      objetivo: 'Incorporação dos serviços de alta complexidade nos hospitais regionais',
    },
    {
      id: 3,
      secretariaExecutiva: 'SEVIG',
      coordenadoria: 'COVIS',
      objetivo: 'Gestão sanitária da segurança do paciente en serviços de saúde pública',
    },
    {
      id: 4,
      secretariaExecutiva: 'SEVIG',
      coordenadoria: 'COVIG',
      objetivo: 'Observatóriode causas externas do estado do ceará',
    },
    {
      id: 5,
      secretariaExecutiva: 'SPOS',
      coordenadoria: 'COPIS',
      objetivo: 'Programa cuidar melhor',
    },
    {
      id: 6,
      secretariaExecutiva: 'SPOS',
      coordenadoria: 'COFAP',
      objetivo:
        'Apoio à implantação e implementação dos serviços de farmácia clínica nos hospitais da rede sesa',
    },
    {
      id: 7,
      secretariaExecutiva: 'SESA',
      coordenadoria: 'COLOG',
      objetivo: 'Otimizar logística de insumos',
    },
    {
      id: 8,
      secretariaExecutiva: 'SESA',
      coordenadoria: 'COPLAN',
      objetivo: 'Planejar metas estratégicas anuais',
    },
    {
      id: 9,
      secretariaExecutiva: 'SEADE',
      coordenadoria: '',
      objetivo: 'Implementação da carteira de serviços das regiões de saúde',
    },
    {
      id: 10,
      secretariaExecutiva: 'SEADE',
      coordenadoria: '',
      objetivo: 'Incorporação dos serviços de alta complexidade nos hospitais regionais',
    },
    {
      id: 11,
      secretariaExecutiva: 'SEVIG',
      coordenadoria: 'COVIS',
      objetivo: 'Gestão sanitária da segurança do paciente en serviços de saúde pública',
    },
    {
      id: 12,
      secretariaExecutiva: 'SEVIG',
      coordenadoria: 'COVIG',
      objetivo: 'Observatóriode causas externas do estado do ceará',
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogObjetivosEstrategicosComponent>,
    @Inject(MAT_DIALOG_DATA) public objetivos: any,
  ) {}

  public ngOnInit(): void {
    this.buscarObjetivos();
  }

  public ngAfterViewInit(): void {
    this.dadosTabela.paginator = this.paginator;
  }

  public buscarObjetivos(): void {
    this.dadosTabela.data = this.listaObjetivosEstrategico;
    this.dadosTabela.paginator = this.paginator;
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
    this.dialogRef.close(selecionados);
  }

  public selecionarObjetivo(item: any): void {
    if (this.objetivosSelecionados.has(item)) {
      this.objetivosSelecionados.delete(item);
    } else {
      this.objetivosSelecionados.add(item);
    }
  }

  public isSelecionado(item: any): boolean {
    return this.objetivosSelecionados.has(item);
  }

  public cancelar(): void {
    this.dialogRef.close(true);
  }
}
