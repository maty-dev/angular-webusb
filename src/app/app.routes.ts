import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'fingerprint-morpho',
        title: 'Fingerprint Morpho | Owner',
        loadComponent: () => import('./device/fingerprint-morpho/fingerprint-morpho.component').then( m => m.FingerprintMorphoComponent ),
    },
    {
        path: 'fingerprint-dpersona',
        title: 'Fingerprint DigitalPersona | Owner',
        loadComponent: () => import('./device/fingerprint-reader/fingerprint-reader.component').then( m => m.FigerprintReaderComponent ),
    },
    {
        path: 'thermal-printer',
        title: 'Thermal Printer | Generic',
        loadComponent: () => import('./device/thermal-printer/thermal-printer.component').then( m => m.ThermalPrinterComponent ),
    },
    {
        path: 'thermal-plug',
        title: 'Thermal Printer | Plug',
        loadComponent: () => import('./device/thermal-printer-plug/thermal-printer-plug.component').then( m => m.ThermalPrinterPlugComponent ),
    },
    {
        path: 'barcacode-scan',
        title: 'Barcacode Scan | Generic (Uni & Bi)',
        loadComponent: () => import('./device/barcode-scan/barcode-scan.component').then( m => m.BarcodeScanComponent ),
    },

    {
        path: '',
        redirectTo: 'fingerprint-morpho',
        pathMatch: 'full'
    },  
    {
        path: '**',
        redirectTo: 'fingerprint-morpho',
        pathMatch: 'full'
    } 
];
