import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';


const declarations = [
  NavbarComponent
]

@NgModule({
  declarations: declarations,
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: declarations
})
export class CoreModule { }
