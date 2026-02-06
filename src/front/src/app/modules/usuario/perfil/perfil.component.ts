import {
  CamposFormularioComponent,
  ErrosFormularioComponent,
} from '../../../core/components/index.component';
import { CabecalhoComponent } from '../../../layout/cabecalho/cabecalho.component';
import { AuthService, UsuarioService } from '../../../core/services';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioToken } from '../../../core/interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PerfilEnum } from '../../../core/enums';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../core/models';
import { ToastrService } from 'ngx-toastr';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [
    ErrosFormularioComponent,
    CabecalhoComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent extends CamposFormularioComponent implements OnInit {
  public listaPerfilEnum = PerfilEnum.getAll();
  public ehEdicao: boolean = false;
  public mostrarConfirmarSenha: boolean = false;
  public mostrarSenha: boolean = false;
  public ehCadastro: boolean = false;

  private readonly usuarioService = inject(UsuarioService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
    this.preencherFormulario();

    this.route.queryParams.subscribe((dados: any) => {
      if (dados['ehEdicao']) {
        this.ehEdicao = true;
        this.formulario.get('senha')?.enable();
        this.formulario.get('confirmarSenha')?.enable();
      } else {
        this.ehEdicao = false;
        this.formulario.disable();
      }
    });
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null],
      email: [null],
      perfil: [null],
      dataCriacao: [null],
      senha: [null],
      confirmarSenha: [null],
    });
  }

  public preencherFormulario(): void {
    this.authService.usuarioLogado$.subscribe({
      next: (usuario) => {
        if (usuario?.dataCriacao) {
          usuario.dataCriacao = DateTime.fromISO(usuario.dataCriacao)
            .setLocale('pt-BR')
            .toFormat('dd/MM/yyyy');
        }

        this.formulario.patchValue(usuario as UsuarioToken);
        this.desabilitarFormulario();
      },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  public editarDadosPerfil(): void {
    this.preencherFormulario();
    this.habilitarFormulario();
    this.ehEdicao = true;
  }

  public alterarSenha(): void {
    const usuario = this.formulario.getRawValue();
    usuario.dataCriacao = null;

    this.usuarioService.salvar(usuario).subscribe({
      next: () => {
        this.toastr.success('Senha alterada com sucesso!', 'Sucesso!');
        this.ehCadastro = false;
        this.limparFormulario();
        this.marcarFormularioComoNAOTocado();
      },
      error: (resposta: HttpErrorResponse) => {
        const msg =
          resposta.error?.mensagem ||
          resposta.error?.message ||
          'Erro inesperado. Tente novamente.';
        this.toastr.error(msg, 'Erro!');
      },
    });
  }

  public cancelar(): void {
    this.router.navigate(['']);
  }
}
