import { Component, OnDestroy, OnInit } from '@angular/core';
import { 
  FingerprintReader,
  SampleFormat,
  DeviceConnected,
  SamplesAcquired,
  AcquisitionStarted,
  AcquisitionStopped,
  DeviceDisconnected
} from "@digitalpersona/devices";

import "../../core/modules/WebSdk";

@Component({
  selector: 'app-fingerprint-reader',
  standalone: true,
  imports: [],
  templateUrl: './fingerprint-reader.component.html',
  styleUrl: './fingerprint-reader.component.css'
})
export class FigerprintReaderComponent implements OnInit, OnDestroy {
  private reader!: FingerprintReader;

  public listFingerprintReader!: any;
 /*  public infoFingerprintReader!: any; */
  public infoSamplesFingerprintReader!: any;
  public currentImgesFinger!: any;

  public isInit: boolean = false;
  public isStart: boolean = true;
  public isStop: boolean = true;

  private onDeviceConnected = ( event: DeviceConnected ) => {};
  private onDeviceDisconnected = ( event: DeviceDisconnected ) => {};

  private onAcquisitionStarted = ( event: AcquisitionStarted ) => {
    console.log( 'Acquisition Started' );
    console.log( event );
  }

  private onAcquisitionStopped = ( event: AcquisitionStopped ) => {
    console.log( 'AcquisitionStopped' );
    console.log( event );
  }

  private onSamplesAcquired = ( event: SamplesAcquired ) => {
    console.log( 'Samples Acquired' );
    console.log( event );

    this.infoSamplesFingerprintReader = event;
    this.captureImage();
  }

  public methodsReader: { name: string, func: any }[] = [
    {
      name: 'DeviceConnected', 
      func: this.onDeviceConnected
    },
    {
      name: 'DeviceDisconnected', 
      func: this.onDeviceDisconnected
    },
    {
      name: 'AcquisitionStarted', 
      func: this.onAcquisitionStarted
    },
    {
      name: 'AcquisitionStopped', 
      func: this.onAcquisitionStopped
    },
    {
      name: 'SamplesAcquired', 
      func: this.onSamplesAcquired
    }
  ];

  ngOnInit(): void {
    this.reader = new FingerprintReader();
    this.defineMethods( 'on' );
  }

  private defineMethods( mode: 'on' | 'off' ){
    for (const method of this.methodsReader) {
      this.reader[mode]( method.name, method.func );  
    }
  }

  getListAllDevices() {
    this.reader.enumerateDevices()
    .then( (devices: any) => {
      this.listFingerprintReader = devices[0];

      console.log(this.listFingerprintReader);
      alert( 'Selected device. The capture can now begin.' );

      this.isInit = true;
      this.isStart = false;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  startCapture() {
    this.reader.startAcquisition( SampleFormat.PngImage, this.listFingerprintReader )
    .then( (result: any) => {
      alert( 'You can init sart capturing !' );
      console.log( result );

      this.isStart = true;
      this.isStop = false;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  stopCapture() {
    this.reader.stopAcquisition( this.listFingerprintReader )
    .then( (result: any) => {
      alert( 'You can init stop capturing !' );
      console.log( result );

      this.isInit = false;
      this.isStart = true;
      this.isStop = true;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  private captureImage() {
    const listImages = this.infoSamplesFingerprintReader['samples'];
    const lengthSize = Object.keys( listImages ).length;

    if( !listImages || lengthSize <= 0 ) return; 
    this.currentImgesFinger = this.getFormatImage( listImages[0] ); 
    /* this.currentImgesFinger = listImages[0];  */
  }

  getFormatImage( codeBase64: string ) {
    let strImage = codeBase64;

    strImage = strImage.replace(/_/g, '/');
    strImage = strImage.replace(/-/g, '+');
  }

  ngOnDestroy(): void {
    this.defineMethods( 'off' );
  }

}
