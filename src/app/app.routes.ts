import { Routes } from '@angular/router';
import { FingerprintReader } from '@digitalpersona/devices';

export const routes: Routes = [
    {
        path: 'fingerprint-reader',
        title: 'Fingerprint Reader',
        loadComponent: () => import('./device/figerprint-reader/figerprint-reader.component').then( m => m.FigerprintReaderComponent ),
    },
    {
        path: 'thermal-printer',
        title: 'Thermal Printer',
        loadComponent: () => import('./device/thermal-printer/thermal-printer.component').then( m => m.ThermalPrinterComponent ),
    },
    {
        path: 'barcacode-scan',
        title: 'Barcacode Scan',
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
    },   
];
