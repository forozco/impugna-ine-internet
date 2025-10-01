import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  private cdr = inject(ChangeDetectorRef);
  private stepPositions: number[] = [];

  /** Método público para obtener la posición del círculo de un paso específico */
  getStepPositionPx(stepIndex: number): number {
    if (stepIndex < 0 || stepIndex >= this.stepPositions.length) return 0;
    return this.stepPositions[stepIndex] || 0;
  }

  /** Método público para obtener el ancho total del stepper */
  getStepperWidth(): number {
    return this.host.nativeElement.getBoundingClientRect().width;
  }

  get progressWidthPx(): number {
    if (this.currentIndex < 0 || this.stepPositions.length === 0) {
      return 0;
    }

    // Si estamos en el primer paso, no hay línea
    if (this.currentIndex === 0) return 0;

    // La línea debe ir desde el primer paso hasta el paso actual
    const width = this.stepPositions[this.currentIndex] || 0;
    return width;
  }  isDone(i: number) {
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
    // Calcular las posiciones fijas después de que se renderice la vista
    setTimeout(() => this.calculateStepPositions(), 100);
  }

  ngOnChanges(): void {
    // Cuando cambia currentIndex, forzar actualización visual
    this.cdr.detectChanges();

    // Recalcular las posiciones si es necesario
    if (this.dotEls && this.dotEls.length > 0 && this.stepPositions.length === 0) {
      setTimeout(() => this.calculateStepPositions(), 10);
    }
  }

  private calculateStepPositions(): void {
    if (!this.dotEls || this.dotEls.length === 0) return;

    const firstDot = this.dotEls.get(0);
    if (!firstDot) return;

    const firstDotRect = firstDot.nativeElement.getBoundingClientRect();
    const firstDotCenter = firstDotRect.left + (firstDotRect.width / 2);

    // Calcular la posición en píxeles para cada paso
    this.stepPositions = [];
    this.dotEls.forEach((dotRef, index) => {
      const dotRect = dotRef.nativeElement.getBoundingClientRect();
      const dotCenter = dotRect.left + (dotRect.width / 2);
      const distance = dotCenter - firstDotCenter;

      // Agregar un pequeño ajuste para llegar exactamente al centro
      const adjustedDistance = distance + 30; // 30px más para llegar al centro exacto
      this.stepPositions[index] = Math.max(0, adjustedDistance);
    });

    // Forzar actualización después de calcular posiciones
    this.cdr.detectChanges();
  }

  private initTooltips(): void {
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
