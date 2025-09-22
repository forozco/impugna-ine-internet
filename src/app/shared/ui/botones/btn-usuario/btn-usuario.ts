import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn-usuario',
  imports: [],
  templateUrl: './btn-usuario.html',
  styleUrl: './btn-usuario.scss'
})
export class BtnUsuario {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() ariaLabel?: string;
}
