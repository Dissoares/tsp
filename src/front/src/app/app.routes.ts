import { AuthGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/usuario/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./modules/usuario/cadastro/cadastro.component').then((m) => m.CadastroComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/conteudo/conteudo.component').then((c) => c.ConteudoComponent),
    children: [
      {
        path: 'gerenciamento',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/gerenciamento/gerenciamento.routing').then((m) => m.GERENCIAMENTO),
      },
    ],
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/usuario/perfil/perfil.component').then((m) => m.PerfilComponent),
  },

  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];
