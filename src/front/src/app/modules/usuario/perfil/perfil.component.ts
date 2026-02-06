import {
  CamposFormularioComponent,
  ErrosFormularioComponent,
} from '../../../core/components/index.component';
import { CabecalhoComponent } from '../../../layout/cabecalho/cabecalho.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { ChangeDetectorRef } from '@angular/core';
import { PerfilEnum } from '../../../core/enums';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [
    ErrosFormularioComponent,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CabecalhoComponent,
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

  public mostrarConfirmarSenha: boolean = false;
  public temImagemNoBanco: boolean = false;
  public progressoUpload: boolean = false;
  public mostrarSenha: boolean = false;
  public ehCadastro: boolean = false;
  public ehEdicao: boolean = false;

  public visualizacaoImagem: string | null = null;
  public linkImagem: string | null = null;

  private readonly usuarioService = inject(UsuarioService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

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
      imagemPerfil: [null],
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

        if (usuario && usuario?.id) {
          this.usuarioService.buscarImagemPerfil(usuario.id).subscribe({
            next: (response: any) => {
              try {
                let nomeImagem, url;

                if (typeof response === 'string') {
                  if (response.trim().startsWith('{')) {
                    const parsed = JSON.parse(response);
                    nomeImagem = parsed?.nomeImagem;
                    url = parsed?.url;
                  } else {
                    nomeImagem = null;
                    url = null;
                  }
                } else {
                  nomeImagem = response?.nomeImagem;
                  url = response?.url;
                }

                if (nomeImagem && url) {
                  this.linkImagem = `${url}?t=${Date.now()}`;
                  this.temImagemNoBanco = true;
                } else {
                  this.temImagemNoBanco = false;
                }

                this.cdr.detectChanges();
              } catch (e) {
                this.temImagemNoBanco = false;
                this.cdr.detectChanges();
              }
            },
            error: (erro) => {
              this.temImagemNoBanco = false;
              this.cdr.detectChanges();
            },
          });
        }

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

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.toastr.error('Por favor, selecione apenas arquivos de imagem.', 'Erro!');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.toastr.error('A imagem deve ter no máximo 5MB.', 'Erro!');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.visualizacaoImagem = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.uploadImagem(file);
    }
  }

  public uploadImagem(file: File): void {
    const usuarioId = this.formulario.get('id')?.value || this.formulario.get('id')?.value;

    if (!usuarioId) {
      return;
    }

    if (!this.ehEdicao) {
      this.editarDadosPerfil();
    }

    this.progressoUpload = true;

    const uploadMethod = this.temImagemNoBanco
      ? this.usuarioService.atualizarImagemPerfil(usuarioId, file)
      : this.usuarioService.uploadImagemPerfil(usuarioId, file);

    uploadMethod.subscribe({
      next: (nomeArquivo) => {
        this.linkImagem = `http://localhost:8080/uploads/imagens-perfil/${nomeArquivo}?t=${Date.now()}`;
        this.visualizacaoImagem = null;
        this.progressoUpload = false;
        this.temImagemNoBanco = true;

        this.cdr.detectChanges();

        this.toastr.success('Imagem de perfil atualizada com sucesso!', 'Sucesso!');
      },
      error: (resposta: HttpErrorResponse) => {
        this.progressoUpload = false;
        const msg =
          resposta.error?.mensagem || resposta.error?.message || 'Erro ao fazer upload da imagem.';
        this.toastr.error(msg, 'Erro!');
      },
    });
  }

  public removerImagem(): void {
    const usuarioId = this.formulario.get('id')?.value || this.formulario.get('idUsuario')?.value;

    if (!usuarioId) {
      this.toastr.error('Usuário não identificado.', 'Erro!');
      return;
    }

    this.usuarioService.removerImagemPerfil(usuarioId).subscribe({
      next: () => {
        this.linkImagem = null;
        this.visualizacaoImagem = null;
        this.temImagemNoBanco = false;
        this.toastr.success('Imagem de perfil removida com sucesso!', 'Sucesso!');
      },
      error: (resposta: HttpErrorResponse) => {
        const msg =
          resposta.error?.mensagem || resposta.error?.message || 'Erro ao remover a imagem.';
        this.toastr.error(msg, 'Erro!');
      },
    });
  }

  public cancelarUpload(): void {
    this.visualizacaoImagem = null;
  }
}
