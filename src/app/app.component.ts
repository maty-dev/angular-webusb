import { Component } from '@angular/core';
import { UsbService } from './webusb.service';
import { BarcodeScanComponent } from './device/barcode-scan/barcode-scan.component';
import { FigerprintReaderComponent } from './device/figerprint-reader/figerprint-reader.component';
import { ThermalPrinterComponent } from './device/thermal-printer/thermal-printer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [BarcodeScanComponent, FigerprintReaderComponent, ThermalPrinterComponent]
})
export class AppComponent {
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

