import { Routes, RouterModule } from '@angular/router';

export const GERENCIAMENTO: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./formulario/formulario.component').then((c) => c.FormularioComponent),
  },
  {
    path: 'projetos',
    loadComponent: () =>
      import('./projetos/listagem/listagem.component').then((c) => c.ListagemComponent),
  },
  {
    path: 'solicitacao',
    loadComponent: () =>
      import('./formulario/formulario.component').then((c) => c.FormularioComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
