import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsbService {
  private device: USBDevice | null = null;

  constructor() {}

  async requestDevice(vendorId: number, productId: number): Promise<USBDevice | undefined> {
    try {
      // Solicita al usuario que seleccione un dispositivo USB.
      this.device = await navigator.usb.requestDevice({
        filters: [{ vendorId, productId }],
      });
      console.log('Device', this.device);
      return this.device;
    } catch (error) {
      console.error('There was an error selecting the device:', error);
      return undefined;
    }
  }

  async connectToDevice(): Promise<boolean> {
    if (!this.device) {
      console.error('No device selected');
      return false;
    }

    try {
      // Abre el dispositivo seleccionado.
      await this.device.open();
      // Selecciona una configuración si el dispositivo no está configurado.
      if (this.device.configuration === null)
        await this.device.selectConfiguration(1);
      // Reclama una interfaz para interactuar con el dispositivo.
      await this.device.claimInterface(0);
      console.log('Device opened');
      return true;
    } catch (error) {
      console.error('Error opening the device:', error);
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.device) {
      try {
        await this.device.close();
        this.device = null;
        console.log('Device closed');
      } catch (error) {
        console.error('Error closing the device:', error);
      }
    }
  }
}