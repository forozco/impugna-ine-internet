import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tooltip } from 'bootstrap';

export interface StepItem {
  label: string;        // Texto debajo del círculo
  description?: string; // Texto largo que va en el tooltip
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent implements AfterViewInit, OnChanges {
  @Input({ required: true }) steps: StepItem[] = [];
  /** Índice 0-based del paso actual (solo lectura desde el padre) */
  @Input({ required: true }) currentIndex = 0;

  @ViewChildren('dotEl') private dotEls!: QueryList<ElementRef<HTMLElement>>;

  private tooltipInstances: Tooltip[] = [];
  private host = inject(ElementRef<HTMLElement>);

  get progressPercent(): number {
    const n = this.steps.length;
    return n <= 1 ? 0 : (this.currentIndex / (n - 1)) * 100;
  }
  isDone(i: number) {
    return i < this.currentIndex;
  }
  isCurrent(i: number) {
    return i === this.currentIndex;
  }
  isDisabled(i: number) {
    return i > this.currentIndex;
  }

  ngAfterViewInit(): void {
    this.initTooltips();
    this.dotEls.forEach((ref) => {
      new Tooltip(ref.nativeElement, {
        container: 'body',
        placement: 'bottom',
      });
    });
  }
  ngOnChanges(): void {
    this.initTooltips();
  }

  private initTooltips() {
    // Destruir instancias anteriores
    this.tooltipInstances.forEach((t) => t.dispose());
    this.tooltipInstances = [];

    // Crear instancias para cada punto (opt-in)
    queueMicrotask(() => {
      this.dotEls?.forEach((ref) => {
        const el = ref.nativeElement;
        // En BS5, title debe tener contenido; container:'body' evita clipping
        const tip = new Tooltip(el, { placement: 'bottom', container: 'body' });
        this.tooltipInstances.push(tip);
      });
    });
  }
}
