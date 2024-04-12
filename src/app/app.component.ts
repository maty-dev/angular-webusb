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

  
  constructor(private usbService: UsbService) {}

  async connect() {
    const vendorId = 0x225D; // Reemplaza con el ID de vendedor real de tu dispositivo
    const productId = 0xC000A; // Reemplaza con el ID de producto real de tu dispositivo
    const device = await this.usbService.requestDevice(vendorId, productId);

    if(!device) alert('Could not get connected devices');

    const isConnected: boolean = await this.usbService.connectToDevice();
    if (!isConnected) return;
    
    alert('Device is connected');
  }

  async disconnect() {
    await this.usbService.disconnect();
  }
}

