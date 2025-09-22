import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BtnUsuario } from "../../ui/botones/btn-usuario/btn-usuario";

@Component({
  selector: 'app-encabezado',
  imports: [BtnUsuario],
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.scss'
})
export class Encabezado {
  private router = inject(Router);

  cerrarSesion() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/auth/login']);
  }
}
