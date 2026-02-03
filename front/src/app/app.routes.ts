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
    path: '',
    loadComponent: () =>
      import('./layout/conteudo/conteudo.component').then((c) => c.ConteudoComponent),
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/usuario/perfil/perfil.component').then(
        (m) => m.PerfilComponent,
      ),
  },

  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];
