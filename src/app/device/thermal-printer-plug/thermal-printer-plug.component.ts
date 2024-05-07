import { Component, OnInit, inject } from '@angular/core';
import { ThermalPrintModule } from '../../core/modules/printer/ng-thermal-print/src/lib/ng-thermal-print.module';
import { UsbDriver, WebPrintDriver } from '../../core/modules/printer/ng-thermal-print/src/lib/drivers';
import { PrintDriver } from '../../core/modules/printer/ng-thermal-print/src/lib/drivers/PrintDriver';
import { PrintService } from '../../core/modules/printer/ng-thermal-print/src/lib/ng-thermal-print.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-thermal-printer-plug',
  standalone: true,
  imports: [ ThermalPrintModule, FormsModule ],
  providers: [ PrintService ],
  templateUrl: './thermal-printer-plug.component.html',
  styleUrl: './thermal-printer-plug.component.css'
})
export class ThermalPrinterPlugComponent implements OnInit {
  public status: boolean = false;
  public usbPrintDriver!: UsbDriver;
  public webPrintDriver!: WebPrintDriver;
  private readonly _printSvc: PrintService = inject( PrintService );
  public ip: string = '';

  date: string = new Date().toLocaleDateString();

  constructor() {}

  ngOnInit(): void {
    this.usbPrintDriver = new UsbDriver();

    this._printSvc.isConnected.subscribe(result => {
      this.status = result;
      
      if (result) alert('Connected to printer!!!');
      else console.error('Not connected to printer.');
    });
  }

  requestUsb() {
    this.usbPrintDriver.requestUsb().subscribe(result => {
      this._printSvc.setDriver(this.usbPrintDriver, 'ESC/POS');
    });
  }

  connectToWebPrint() {
    this.webPrintDriver = new WebPrintDriver(this.ip);
    this._printSvc.setDriver(this.webPrintDriver, 'WebPRNT');
  }

  print(driver?: PrintDriver) {
    this._printSvc.init()
      .setJustification('center')
      .setBold(true)
      .writeLine('Greetings Deivid, from the Devs Adviters team in Argentina !!')
      .feed(1)
      .setBold(false)
      .feed(2)
      .writeLine('V2')
      .feed(1)
      .writeLine(`Date: ${ this.date }`)
      .feed(4)
      .cut('full')
      .flush();
  }
 
}
