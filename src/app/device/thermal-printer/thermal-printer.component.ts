import { Component } from '@angular/core';

@Component({
  selector: 'app-thermal-printer',
  standalone: true,
  imports: [],
  templateUrl: './thermal-printer.component.html',
  styleUrl: './thermal-printer.component.css'
})
export class ThermalPrinterComponent {
  date: string = new Date().toLocaleDateString();

  onPrint(){
    window.print();
  }
}
