import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { loginGuard } from '../core/guards/login.guard';

export const INICIO_ROUTES: Routes = [
  {
    path: '',
    component: Inicio,
    canActivate: [loginGuard]
  }
];