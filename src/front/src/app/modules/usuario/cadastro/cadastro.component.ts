import {
  CamposFormularioComponent,
  ErrosFormularioComponent,
} from '../../../core/components/index.component';
import { UsuarioService } from '../../../core/services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { campoObrigatorio } from '../../../core/validators';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PerfilEnum } from '../../../core/enums';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../core/models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    ErrosFormularioComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent extends CamposFormularioComponent implements OnInit {
  private readonly usuarioService = inject(UsuarioService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  public listaPerfilEnum = PerfilEnum.getAll();

  public mostrarConfirmarSenha: boolean = false;
  public mostrarSenha: boolean = false;

  constructor() {
    super(inject(FormBuilder));
  }

  public ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario(): void {
    this.formulario = this.fb.group({
      nome: [null, [campoObrigatorio()]],
      email: [null, [campoObrigatorio()]],
      senha: [null, [campoObrigatorio()]],
      confirmarSenha: [null, [campoObrigatorio()]],
      perfil: [null, [campoObrigatorio()]],
    });
  }

  public cadastrar(): void {
    const usuario: Usuario = this.formulario.value;

    if (this.formulario.invalid) {
      this.toastr.error('Preencha todos os campos obrigatórios!', 'Aviso!');
      this.marcarFormularioComoTocado();
      return;
    }

    if (usuario.senha !== this.formulario.get('confirmarSenha')?.value) {
      this.toastr.error('As senhas não coincidem.', 'Aviso');
      return;
    }

    this.usuarioService.salvar(usuario).subscribe({
      next: () => {
        this.toastr.success('Cadastrado com sucesso! Redirecionando para o login...', 'Sucesso!');
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 2000);
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

  public voltarParaLogin(): void {
    this.router.navigate(['/auth']);
  }
}
