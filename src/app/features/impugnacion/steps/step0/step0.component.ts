import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Step0Data, RegistroOption } from '../../../../shared/models/impugnacion.models';

@Component({
  selector: 'app-impugnacion-step0',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step0.component.html',
})
export class Step0Component {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    option: this.fb.control<RegistroOption | null>(null, { validators: [Validators.required] }),
    folio: this.fb.control<string>(''),
    tipoImpugnacion: this.fb.control<string>('', { validators: [Validators.required] }),
  });

  /** Carga estado inicial (si vuelven a este paso) */
  @Input() set initial(value: Step0Data | undefined) {
    if (!value) return;
    this.form.patchValue({
      option: value.option,
      folio: value.folio ?? '',
      tipoImpugnacion: value.tipoImpugnacion ?? '',
    });
  }

  /** Validación condicional + retorno tipado */
  validateAndGet(): Step0Data | null {
    const opt = this.form.value.option;
    const folioCtrl = this.form.get('folio')!;
    // Reglas condicionales
    if (opt === 'ampliacion') {
      folioCtrl.addValidators([Validators.required, Validators.minLength(3)]);
    } else {
      folioCtrl.clearValidators();
      folioCtrl.setValue('');
    }
    folioCtrl.updateValueAndValidity({ emitEvent: false });

    this.form.markAllAsTouched();
    if (this.form.invalid) return null;

    return {
      option: opt!,
      folio: this.form.value.folio?.trim() || undefined,
      tipoImpugnacion: this.form.value.tipoImpugnacion!,
    };
  }
}
