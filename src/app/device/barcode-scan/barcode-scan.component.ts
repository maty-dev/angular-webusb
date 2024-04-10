import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-barcode-scan',
  standalone: true,
  imports: [],
  templateUrl: './barcode-scan.component.html',
  styleUrl: './barcode-scan.component.css'
})
export class BarcodeScanComponent {
  @ViewChild('scanData') scanDataElement!: ElementRef;
  scannedData: string = '';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.scannedData = '';
    const scannedValue = event.key;
    this.scannedData += scannedValue;
  }
  
  onKey(event: any) {
    this.scannedData = event.target.value;
  }
}
