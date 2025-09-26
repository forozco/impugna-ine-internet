import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ImpugnacionWizardComponent } from '../../features/impugnacion/impugnacion-wizard/impugnacion-wizard.component';

@Component({
  selector: 'app-inicio',
  imports: [SharedModule, ImpugnacionWizardComponent],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
}
