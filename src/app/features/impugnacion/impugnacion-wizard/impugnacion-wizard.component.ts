import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent, StepItem } from '../../../shared/components/stepper/stepper.component';
import { ImpugnacionData } from '../../../shared/models/impugnacion.models';
import { Step0Component } from '../steps/step0/step0.component';
import { Step1Component } from '../steps/step1/step1.component';

@Component({
  selector: 'app-impugnacion-wizard',
  standalone: true,
  imports: [CommonModule, StepperComponent, Step0Component, Step1Component],
  templateUrl: './impugnacion-wizard.component.html',
  styleUrl: './impugnacion-wizard.component.scss'
})
export class ImpugnacionWizardComponent implements AfterViewInit {
  @ViewChild(StepperComponent) stepper!: StepperComponent;

  steps: StepItem[] = [
    { label: 'Paso 1', description: 'Información general' },
    { label: 'Paso 2', description: 'Datos del impugnante' },
    { label: 'Paso 3', description: 'Datos del representante' },
    { label: 'Paso 4', description: 'Datos de la impugnación' },
    { label: 'Paso 5', description: 'Acreditación de la personalidad' },
    { label: 'Paso 6', description: 'Documentos adicionales' },
    { label: 'Paso 7', description: 'Revisión' },
    { label: 'Paso 8', description: 'Confirmación' },
  ];

  /** Control total del índice (configurado en paso 5 = índice 4) */
  currentIndex = 4;

  /** Posición de la flecha en porcentaje */
  arrowPosition = 50;

  /** Estado global de todos los pasos */
  data: ImpugnacionData = {};

  @ViewChild('step0Ref') step0Ref?: Step0Component;
  @ViewChild('step1Ref') step1Ref?: Step1Component;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Calcular la posición inicial después de que la vista se haya inicializado
    setTimeout(() => {
      this.updateArrowPosition();
    });
  }

  /** Actualiza la posición de la flecha de manera segura */
  updateArrowPosition() {
    setTimeout(() => {
      this.arrowPosition = this.calculateArrowPosition();
      this.cdr.detectChanges();
    });
  }

  prev() { 
    this.currentIndex = Math.max(0, this.currentIndex - 1); 
    this.updateArrowPosition();
  }

  next() {
    // Valida y guarda el paso actual
    if (!this.collectCurrentStep()) return;

    const last = this.currentIndex === this.steps.length - 1;
    if (!last) {
      this.currentIndex = Math.min(this.steps.length - 1, this.currentIndex + 1);
      this.updateArrowPosition();
    } else {
      this.submitAll();
    }
  }

  private collectCurrentStep(): boolean {
    switch (this.currentIndex) {
      case 0: {
        const v = this.step0Ref?.validateAndGet();
        if (!v) return false;
        this.data.step0 = v;
        return true;
      }
      case 1: {
        const v = this.step1Ref?.validateAndGet();
        if (!v) return false;
        this.data.step1 = v;
        return true;
      }
      default:
        return true;
    }
  }

  /** Submit final: aquí vive el envío/guardar */
  submitAll() {
    // Tienes TODO el payload
    console.log('Payload final de impugnación:', this.data);
    // TODO: Llama API / router, etc.
  }

  /** Calcula la posición de la flecha basada en el centro del círculo del paso actual */
  calculateArrowPosition(): number {
    // Usar las posiciones absolutas reales
    if (this.stepper && this.stepper['dotEls']) {
      try {
        const dotEls = this.stepper['dotEls'];
        const currentDot = dotEls.get(this.currentIndex);

        if (currentDot) {
          // Obtener las posiciones absolutas de los elementos
          const dotRect = currentDot.nativeElement.getBoundingClientRect();
          const stepperContainer = document.querySelector('.stepper-container');

          if (stepperContainer) {
            const containerRect = stepperContainer.getBoundingClientRect();

            // Calcular el centro del círculo relativo al contenedor de la flecha
            const dotCenter = dotRect.left + (dotRect.width / 2);
            const containerLeft = containerRect.left;
            const containerWidth = containerRect.width;

            // Posición relativa en porcentaje
            const relativePosition = ((dotCenter - containerLeft) / containerWidth) * 100;

            return Math.min(Math.max(relativePosition, 0), 100);
          }
        }
      } catch (error) {
        console.log('Error calculando posición de flecha:', error);
      }
    }

    // Fallback al cálculo original si no hay posiciones disponibles
    const totalSteps = this.steps.length;
    if (totalSteps === 0) return 50;

    const stepWidth = 100 / totalSteps;
    const stepCenter = stepWidth / 2;
    const position = (this.currentIndex * stepWidth) + stepCenter;

    return position;
  }
}
