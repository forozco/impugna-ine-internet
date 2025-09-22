import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router) {}

  login() {
    // Validación sencilla
    if (this.username === 'admin' && this.password === '1234') {
      this.errorMsg = '';
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/inicio']);
    } else {
      this.errorMsg = 'Usuario o contraseña incorrectos';
    }
  }
}
