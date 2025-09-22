import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from './ui/ui.module';
import { PiePagina } from './components/pie-pagina/pie-pagina';
import { Encabezado } from './components/encabezado/encabezado';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    PiePagina,
    Encabezado
  ],
  exports: [
    UiModule,
    PiePagina,
    Encabezado
  ]
})
export class SharedModule { }