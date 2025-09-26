import { Component, ViewChild } from '@angular/core';
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
})
export class ImpugnacionWizardComponent {
  steps: StepItem[] = [
    { label: 'Paso 1', description: 'Inicia la impugnación' },
    { label: 'Paso 2', description: '¿Quién registra la impugnación?' }, // <- primer hijo implementado
    { label: 'Paso 3', description: 'Adjunta evidencia' },
    { label: 'Paso 4', description: 'Revisión y envío' },
  ];

  /** Control total del índice (arranca en 1 para coincidir con la UI mostrada) */
  currentIndex = 0;

  /** Estado global de todos los pasos */
  data: ImpugnacionData = {};

  @ViewChild('step0Ref') step0Ref?: Step0Component; 
  @ViewChild('step1Ref') step1Ref?: Step1Component;

  prev() { this.currentIndex = Math.max(0, this.currentIndex - 1); }

  next() {
    // Valida y guarda el paso actual
    if (!this.collectCurrentStep()) return;

    const last = this.currentIndex === this.steps.length - 1;
    if (!last) {
      this.currentIndex = Math.min(this.steps.length - 1, this.currentIndex + 1);
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
}
