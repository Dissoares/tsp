import { AuthGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/conteudo/conteudo.component').then((c) => c.ConteudoComponent),
    children: [
      {
        path: '**',
        redirectTo: '/auth',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
];
