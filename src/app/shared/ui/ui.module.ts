import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnPrimario } from './botones/btn-primario/btn-primario';
import { BtnSecundario } from './botones/btn-secundario/btn-secundario';
import { BtnUsuario } from './botones/btn-usuario/btn-usuario';
import { EnlacePrincipal } from './enlaces/enlace-principal/enlace-principal';
import { TextareaPrimario } from './campos-texto/textarea-primario/textarea-primario';

@NgModule({
  imports: [
    CommonModule,
    BtnPrimario,
    BtnSecundario,
    BtnUsuario,
    EnlacePrincipal,
    TextareaPrimario
  ],
  exports: [
    BtnPrimario,
    BtnSecundario,
    BtnUsuario,
    EnlacePrincipal,
    TextareaPrimario
  ]
})
export class UiModule { }