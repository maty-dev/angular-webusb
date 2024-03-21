// webusb.d.ts
declare global {
    interface Navigator {
      usb: USB;
    }
  
    interface USB {
      getDevices(): Promise<USBDevice[]>;
      requestDevice(options: USBDeviceRequestOptions): Promise<USBDevice>;
      onconnect: ((this: USB, ev: USBConnectionEvent) => any) | null;
      ondisconnect: ((this: USB, ev: USBConnectionEvent) => any) | null;
    }
  
    interface USBDevice {
      open(): Promise<void>;
      close(): Promise<void>;
      selectConfiguration(configurationValue: number): Promise<void>;
      claimInterface(interfaceNumber: number): Promise<void>;
      releaseInterface(interfaceNumber: number): Promise<void>;
      controlTransferIn(setup: USBControlTransferParameters, length: number): Promise<USBInTransferResult>;
      controlTransferOut(setup: USBControlTransferParameters, data: BufferSource): Promise<USBOutTransferResult>;
      transferIn(endpointNumber: number, length: number): Promise<USBInTransferResult>;
      transferOut(endpointNumber: number, data: BufferSource): Promise<USBOutTransferResult>;
      configuration: USBConfiguration | null;
      productName: string | undefined;
      manufacturerName: string | undefined;
      serialNumber: string | undefined;
    }
  
    interface USBConfiguration {
      configurationValue: number;
      // Definir aquí más propiedades según sean necesarias...
    }
  
    interface USBConnectionEvent extends Event {
      device: USBDevice;
    }
  
    interface USBInTransferResult {
      data: DataView;
      status: USBTransferStatus;
    }
  
    interface USBOutTransferResult {
      bytesWritten: number;
      status: USBTransferStatus;
    }
  
    interface USBControlTransferParameters {
      requestType: 'standard' | 'class' | 'vendor';
      recipient: 'device' | 'interface' | 'endpoint' | 'other';
      request: number;
      value: number;
      index: number;
    }
  
    type USBTransferStatus = 'ok' | 'stall' | 'babble';
  }
  
  export {};
  
  