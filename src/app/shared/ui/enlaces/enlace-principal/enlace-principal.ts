import { Component, Input } from '@angular/core';

@Component({
  selector: 'enlace-principal',
  imports: [],
  templateUrl: './enlace-principal.html',
  styleUrl: './enlace-principal.scss'
})
export class EnlacePrincipal {
  @Input() href: string = '#';
  @Input() target: '_blank' | '_self' = '_self';
  @Input() ariaLabel?: string;
}
