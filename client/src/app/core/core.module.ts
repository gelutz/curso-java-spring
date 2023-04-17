import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NavbarComponent } from './navbar/navbar.component';
import { OpenCloseButtonComponent } from './openclosebutton/openclosebutton.component';
import { ErrorHandlerService } from './services/error-handler.service';


const declarations = [
	NavbarComponent,
	OpenCloseButtonComponent
]

@NgModule({
	declarations: declarations,
	imports: [
		CommonModule,
		ToastModule,
		ConfirmDialogModule,
		RouterModule
	],
	providers: [
		MessageService,
		ConfirmationService,
		ErrorHandlerService
	],
	exports: [
		...declarations,
		ToastModule,
		ConfirmDialogModule
	]
})
export class CoreModule { }
