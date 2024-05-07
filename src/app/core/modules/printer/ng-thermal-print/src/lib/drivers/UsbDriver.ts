import { BehaviorSubject, Observable } from 'rxjs';
import { PrintDriver } from "./PrintDriver";
declare var navigator: any;

export class UsbDriver extends PrintDriver {
    private device!: USBDevice | any;
    private endPoint: any | undefined;
    private vendorId: number | undefined;
    private productId: number | undefined;
    public isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(vendorId?: number, productId?: number) {
        super();
        this.vendorId = vendorId;
        this.productId = productId;
    }

    public connect() {
        navigator.usb.getDevices().then((devices: any) => {
            this.device = devices.find((device: any) => {
                return device.vendorId === this.vendorId && device.productId === this.productId;
            });
            console.log(this.device);
            return this.device.open();
        })
            .then(() => {
                let result = this.device.selectConfiguration(1);
                return result;
            })
            .then(() => {
                let result = this.device.claimInterface(0);
                return result;
            }).then((result: any) => {
                const endPoints: any[] | undefined = this.device.configuration?.interfaces[0].alternate.endpoints;
                this.endPoint = endPoints?.find((endPoint: any) => endPoint.direction === 'out');
                this.isConnected.next(true);
                this.listenForUsbConnections();
            }).catch((result: any) => {
                this.isConnected.next(false);
            });
    }


    /**
     * Request a USB device through the browser
     * return Observable<USBDevice>
     */
    public requestUsb(): Observable<USBDevice> {
        return new Observable(observer => {
            navigator.usb.requestDevice({ filters: [] })
                .then((result: any) => {
                    this.vendorId = result.vendorId;
                    this.productId = result.productId;
                    return observer.next(result);
                }).catch((error: any) => {
                    return observer.error(error);
                });
        });
    }

    public async write(data: Uint8Array): Promise<void> {
        this.device.transferOut(this.endPoint?.endpointNumber, data);
    }

    private listenForUsbConnections(): void {
        navigator.usb.addEventListener('disconnect', () => {
            this.isConnected.next(false)
        });
        navigator.usb.addEventListener('connect', () => {
            this.isConnected.next(true);
        });
    }
}