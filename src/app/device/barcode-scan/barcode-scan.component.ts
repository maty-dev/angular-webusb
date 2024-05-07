import { FormsModule } from '@angular/forms';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, WritableSignal, signal } from '@angular/core';
import { Observable, Subscription, debounceTime, filter, fromEvent, map, scan, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-barcode-scan',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './barcode-scan.component.html',
  styleUrl: './barcode-scan.component.css'
})
export class BarcodeScanComponent implements OnInit, OnDestroy{
  scanned!: Observable<string>;
  lastScanned: string = 'Here, you can see his scan !!';
  suscriptionScanned!: Subscription;

  constructor() {}

  ngOnInit() {
    const down: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, 'keydown');
    const up: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, 'keyup');

    const scannerKeys = up.pipe(
      map((event: KeyboardEvent) => {
        console.log( event );
        if(event.key === 'Unidentified') event.preventDefault();
       // Here you can implement logic to process different types of inputs, such as QR codes, images, maps, URLs, etc.
        return event; // For example, here we are scanning the pressed key.
      }),
      filter((e: KeyboardEvent) => e.code !== 'ShiftLeft'),
      withLatestFrom(down, (u: KeyboardEvent, d: KeyboardEvent) => ({
        key: `${d.key}`,
        pressTime: u.timeStamp - d.timeStamp,
        e: u,
      })),
      filter((x) => x.pressTime < 5)
    );

    this.scanned = scannerKeys.pipe(
      scan((acc, value) => {
        const key = value.key;
      
        if (key !== 'Enter') {
          this.lastScanned = acc + key;
          return acc + key;
        } else {
          // Handle the scanned code here
          this.lastScanned = '';
          return '';
        }
      }, ''),
      filter((x) => x !== ''),
      debounceTime(50)
    );

    this.suscriptionScanned = this.scanned.subscribe((scannedCode) => {
      console.log( 'Scanned Code: ', scannedCode );
      this.lastScanned = scannedCode;
    });
  }

  ngOnDestroy(): void {
    this.suscriptionScanned.unsubscribe();
  }
}
