import { Component } from '@angular/core';
import { LogService } from 'src/app/shared/log.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuAberto = false;
  
  constructor(private logService: LogService) {}
 
  toggleMenu(): boolean {
    this.logService.log('Testando log service')
    this.menuAberto = !this.menuAberto;
    return this.menuAberto;
  }

  
}
