import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn-secundario',
  imports: [],
  templateUrl: './btn-secundario.html',
  styleUrl: './btn-secundario.scss'
})
export class BtnSecundario {
  @Input() ariaLabel?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean | null = false;
}
