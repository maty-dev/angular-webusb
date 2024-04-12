import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'fingerprint-reader',
        title: 'Fingerprint Reader | Owner - DigitalPersona',
        loadComponent: () => import('./device/figerprint-reader/figerprint-reader.component').then( m => m.FigerprintReaderComponent ),
    },
    {
        path: 'thermal-printer',
        title: 'Thermal Printer | Generic',
        loadComponent: () => import('./device/thermal-printer/thermal-printer.component').then( m => m.ThermalPrinterComponent ),
    },
    {
        path: 'barcacode-scan',
        title: 'Barcacode Scan | Generic (Uni & Bidirectional)',
        loadComponent: () => import('./device/barcode-scan/barcode-scan.component').then( m => m.BarcodeScanComponent ),
    },

    {
        path: '',
        redirectTo: 'fingerprint-reader',
        pathMatch: 'full'
    },  
    {
        path: '**',
        redirectTo: 'fingerprint-reader',
        pathMatch: 'full'
    } 
];
