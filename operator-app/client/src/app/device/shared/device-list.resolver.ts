import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DeviceService } from './device.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DeviceListResolver implements Resolve<any> {

    constructor(private deviceService: DeviceService) {

    }

    resolve() {
        return this.deviceService.getDevices().pipe(map(devices => devices));
    }
}

