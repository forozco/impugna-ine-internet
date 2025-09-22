import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn-primario',
  imports: [],
  templateUrl: './btn-primario.html',
  styleUrl: './btn-primario.scss'
})
export class BtnPrimario {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() ariaLabel?: string;
}
