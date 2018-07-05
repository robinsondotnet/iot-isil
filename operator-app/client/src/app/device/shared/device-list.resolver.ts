import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DeviceService } from './device.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DeviceListResolver implements Resolve<any> {

    constructor(private deviceService: DeviceService) {

    }

    resolve() {
        console.log('before resolving');
        return this.deviceService.getDevices().pipe(map(devices => {
            console.log('devices');
            console.log(devices);
            return devices
        }));
    }
}

