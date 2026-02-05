import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
  public colunasTabela: Array<string> = [
    'secretariaExecutiva',
    'coordenadoria',
    'objetivo',
    'selecionar',
  ];

  public listaObjetivosEstrategico = [
    {
      secretariaExecutiva: 'SEADE',
      coordenadoria: '',
      objetivo: 'Implementação da carteira de serviços das regiões de saúde',
    },
    {
      secretariaExecutiva: 'SEADE',
      coordenadoria: '',
      objetivo: 'Incorporação dos serviços de alta complexidade nos hospitais regionais',
    },
    {
      secretariaExecutiva: 'SEVIG',
      coordenadoria: 'COVIS',
      objetivo: 'Gestão sanitária da segurança do paciente en serviços de saúde pública',
    },
    {
      secretariaExecutiva: 'SEVIG',
      coordenadoria: 'COVIG',
      objetivo: 'Observatóriode causas externas do estado do ceará',
    },
    {
      secretariaExecutiva: 'SPOS',
      coordenadoria: 'COPIS',
      objetivo: 'Programa cuidar melhor',
    },
    {
      secretariaExecutiva: 'SPOS',
      coordenadoria: 'COFAP',
      objetivo:
        'Apoio à implantação e implementação dos serviços de farmácia clínica nos hospitais da rede sesa',
    },
    {
      secretariaExecutiva: 'SESA',
      coordenadoria: 'COLOG',
      objetivo: 'Otimizar logística de insumos',
    },
    {
      secretariaExecutiva: 'SESA',
      coordenadoria: 'COPLAN',
      objetivo: 'Planejar metas estratégicas anuais',
    },
    {
      secretariaExecutiva: 'SEADE',
      coordenadoria: '',
      objetivo: 'Implementação da carteira de serviços das regiões de saúde',
    },
    {
      secretariaExecutiva: 'SEADE',
      coordenadoria: '',
      objetivo: 'Incorporação dos serviços de alta complexidade nos hospitais regionais',
    },
    {
      secretariaExecutiva: 'SEVIG',
      coordenadoria: 'COVIS',
      objetivo: 'Gestão sanitária da segurança do paciente en serviços de saúde pública',
    },
    {
      secretariaExecutiva: 'SEVIG',
      coordenadoria: 'COVIG',
      objetivo: 'Observatóriode causas externas do estado do ceará',
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogObjetivosEstrategicosComponent>,
    @Inject(MAT_DIALOG_DATA) public objetivos: any,
  ) { }

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

  public adicionar(item: any): void {
    this.dialogRef.close(item);
  }

  public cancelar(): void {
    this.dialogRef.close(true);
  }
}
