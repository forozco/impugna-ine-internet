// step1.component.ts
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Step1Data, RegistrantType } from '../../../../shared/models/impugnacion.models';

@Component({
  selector: 'app-impugnacion-step1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step1.component.html',
})
export class Step1Component {
  private fb = inject(FormBuilder);

  // Form fuertemente tipado
  form = this.fb.group({
    registrantType: this.fb.control<RegistrantType | null>(null, { validators: [Validators.required] }),
    representatives: this.fb.array<FormControl<string>>([]),
  });

  // Getter tipado: FormArray<FormControl<string>>
  get reps(): FormArray<FormControl<string>> {
    return this.form.get('representatives') as FormArray<FormControl<string>>;
  }

  @Input() set initial(value: Step1Data | undefined) {
    if (!value) return;
    this.form.patchValue({ registrantType: value.registrantType });
    this.reps.clear();
    (value.representatives ?? []).forEach(v =>
      this.reps.push(this.fb.control<string>(v, { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }))
    );
  }

  addRep() {
    this.reps.push(this.fb.control<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }));
  }
  removeRep(i: number) { this.reps.removeAt(i); }

  validateAndGet(): Step1Data | null {
    const isReps = this.form.value.registrantType === 'representantes';
    if (isReps && this.reps.length === 0) this.addRep();
    this.form.markAllAsTouched();
    if (this.form.invalid) return null;

    return {
      registrantType: this.form.value.registrantType!,
      representatives: this.reps.controls
        .map(c => c.value.trim())
        .filter(Boolean),
    };
  }
}
