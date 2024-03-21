import { Component } from '@angular/core';
import { UsbService } from './webusb.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="connect()">Connect to USB Device</button>
    <button (click)="disconnect()">Disconnect</button>
  `,
  standalone: true
})
export class AppComponent {
  constructor(private usbService: UsbService) {}

  async connect() {
    const vendorId = 0x225D; // Reemplaza con el ID de vendedor real de tu dispositivo
    const productId = 0xC000A; // Reemplaza con el ID de producto real de tu dispositivo
    const device = await this.usbService.requestDevice(vendorId, productId);
    if (device) {
      const isConnected = await this.usbService.connectToDevice();
      if (isConnected) {
        console.log('Device is connected');
      }
    }
  }

  async disconnect() {
    await this.usbService.disconnect();
  }
}

