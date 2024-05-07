import { Component } from '@angular/core';
import { UsbService } from './webusb.service';

import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {

  public menuItems = routes
    .map((route) => route ?? [])
    .flat()
    .filter((route) => route && route.path)
    .filter((route) => !route.path?.includes(':'));
    
}

