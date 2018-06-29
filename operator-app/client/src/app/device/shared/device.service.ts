import { HttpClient } from '@angular/common/http';
import { of, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Device } from '../../_models/device.model';

@Injectable()
export class DeviceService {
    constructor(private http: HttpClient) {

    }

    getDevices(): Observable<Device[]> {
        return of(DEVICES);
    }

    getDevice(id: number): Observable<Device> {
        const device: Device = DEVICES.find(m => m.id === id);
        const subject = new Subject<Device>();
        setTimeout(() => {subject.next(device); subject.complete(); }, 100);
        return subject;
    }

}

const DEVICES: Device[] = [
    { id: 1, uniqueId: 'A001', location: 'dasdas', type: 'Arduino' },
    { id: 2, uniqueId: 'A002', location: 'dasdas', type: 'Arduino' },
    { id: 3, uniqueId: 'R001', location: 'dasdas', type: 'Raspberry' },
    { id: 4, uniqueId: 'R002', location: 'dasdas', type: 'Raspberry' },
];
