import { Component, Input } from '@angular/core';

@Component({
  selector: 'textarea-primario',
  imports: [],
  templateUrl: './textarea-primario.html',
  styleUrl: './textarea-primario.scss'
})
export class TextareaPrimario {
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() rows: number = 4;
  @Input() ariaLabel?: string;
  @Input() hasError: boolean = false;
  @Input() required: boolean = false;
}
