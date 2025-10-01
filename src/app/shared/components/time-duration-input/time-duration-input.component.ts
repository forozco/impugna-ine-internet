import { Component, Input, forwardRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

type ValueMode = 'minutes' | 'parts';

export interface DurationParts {
  days: number;
  hours: number;   // 0..23
  minutes: number; // 0..59
}

@Component({
  selector: 'app-time-duration-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './time-duration-input.component.html',
  styleUrls: ['./time-duration-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeDurationInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TimeDurationInputComponent),
      multi: true,
    },
  ],
})
export class TimeDurationInputComponent implements ControlValueAccessor {
  /** Título sobre el control */
  @Input() label = 'Sugerencia de plazo';

  /**
   * Modo de valor:
   *  - "minutes" (default): emite/recibe el total de minutos (number)
   *  - "parts": emite/recibe {days,hours,minutes}
   */
  @Input() valueMode: ValueMode = 'minutes';

  /** Valor mínimo en minutos (solo aplica cuando valueMode === 'minutes') */
  @Input() minMinutes = 0;

  /** Deshabilitar el control */
  @Input() disabled = false;

  parts: DurationParts = { days: 0, hours: 0, minutes: 0 };

  private onChange: (v: number | DurationParts) => void = () => {};
  private onTouched: () => void = () => {};

  // —— ControlValueAccessor ——
  writeValue(value: number | DurationParts | null): void {
    if (value == null) {
      this.parts = { days: 0, hours: 0, minutes: 0 };
      return;
    }
    if (this.valueMode === 'minutes' && typeof value === 'number') {
      this.parts = this.fromTotalMinutes(value);
    } else if (this.valueMode === 'parts' && typeof value === 'object') {
      this.parts = this.normalizeParts(value as DurationParts);
    } else {
      // intento de convertir si viene distinto al modo
      this.parts =
        typeof value === 'number'
          ? this.fromTotalMinutes(value)
          : this.normalizeParts(value as DurationParts);
    }
  }

  registerOnChange(fn: (v: number | DurationParts) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // —— Validator opcional (min) ——
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.valueMode === 'minutes') {
      const total = this.toTotalMinutes(this.parts);
      if (total < this.minMinutes) {
        return { minMinutes: { required: this.minMinutes, actual: total } };
      }
    }
    return null;
  }

  // —— UI handlers ——
  onBlur() {
    this.onTouched();
  }

  changeDays(v: string) {
    const n = this.keepInt(v);
    this.parts.days = Math.max(0, n);
    this.emit();
  }

  changeHours(v: string) {
    const n = this.keepInt(v);
    this.parts.hours = this.clamp(n, 0, 23);
    this.emit();
  }

  changeMinutes(v: string) {
    const n = this.keepInt(v);
    this.parts.minutes = this.clamp(n, 0, 59);
    this.emit();
  }

  step(field: keyof DurationParts, delta: number) {
    if (this.disabled) return;
    if (field === 'minutes') {
      let m = this.parts.minutes + delta;
      if (m > 59) {
        this.parts.minutes = m % 60;
        this.step('hours', Math.floor(m / 60));
      } else if (m < 0) {
        const borrow = Math.ceil(Math.abs(m) / 60);
        this.step('hours', -borrow);
        this.parts.minutes = (m % 60 + 60) % 60;
      } else {
        this.parts.minutes = m;
      }
    } else if (field === 'hours') {
      let h = this.parts.hours + delta;
      if (h > 23) {
        this.parts.hours = h % 24;
        this.parts.days += Math.floor(h / 24);
      } else if (h < 0) {
        const borrow = Math.ceil(Math.abs(h) / 24);
        this.parts.days = Math.max(0, this.parts.days - borrow);
        this.parts.hours = (h % 24 + 24) % 24;
      } else {
        this.parts.hours = h;
      }
    } else {
      this.parts.days = Math.max(0, this.parts.days + delta);
    }
    this.emit();
  }

  // permitir ↑/↓ en inputs
  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const field = target.getAttribute('data-field') as keyof DurationParts | null;
    if (!field) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.step(field, +1);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.step(field, -1);
    }
  }

  // —— helpers ——
  private emit() {
    if (this.valueMode === 'minutes') {
      const total = this.toTotalMinutes(this.parts);
      // respeta minMinutes
      const clamped = Math.max(this.minMinutes, total);
      // si tuvimos que clamp, reflejar en UI
      if (clamped !== total) this.parts = this.fromTotalMinutes(clamped);
      this.onChange(clamped);
    } else {
      this.onChange({ ...this.parts });
    }
  }

  private toTotalMinutes(p: DurationParts): number {
    return p.days * 24 * 60 + p.hours * 60 + p.minutes;
  }

  private fromTotalMinutes(total: number): DurationParts {
    total = Math.max(0, Math.floor(total));
    const days = Math.floor(total / (24 * 60));
    const rem = total - days * 24 * 60;
    const hours = Math.floor(rem / 60);
    const minutes = rem - hours * 60;
    return { days, hours, minutes };
  }

  private normalizeParts(p: DurationParts): DurationParts {
    return this.fromTotalMinutes(this.toTotalMinutes({
      days: Math.max(0, this.keepInt(p.days)),
      hours: this.clamp(this.keepInt(p.hours), 0, 23),
      minutes: this.clamp(this.keepInt(p.minutes), 0, 59),
    }));
  }

  private keepInt(v: unknown): number {
    const n = Number(v);
    return Number.isFinite(n) ? Math.floor(n) : 0;
    }

  private clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
  }

  // para template
  pad3(n: number) { return n.toString().padStart(3, '0'); }
  pad2(n: number) { return n.toString().padStart(2, '0'); }
}
