import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DeviceService } from './device.service';

@Injectable()
export class DeviceResolver implements Resolve<any> {

    constructor(private deviceService: DeviceService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.deviceService.getDevice(+route.params['id']);
    }
}
