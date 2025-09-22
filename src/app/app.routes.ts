import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/login.routes').then(m => m.LOGIN_ROUTES),
  },
  {
    path: 'inicio',
    loadChildren: () => import('./features/inicio.routes').then(m => m.INICIO_ROUTES),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
