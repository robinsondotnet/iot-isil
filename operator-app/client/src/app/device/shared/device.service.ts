import { of, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Device } from '../../_models/device.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class DeviceService {
    constructor(private db: AngularFirestore) {

    }

    getDevices(): Observable<Device[]> {
        return this.db.collection<Device>('services').snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Device;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
    }

    getDevice(id: number): Observable<Device> {
        const device: Device = DEVICES.find(m => 0 === id);
        const subject = new Subject<Device>();
        setTimeout(() => {subject.next(device); subject.complete(); }, 100);
        return subject;
    }

}

const DEVICES: Device[] = [

];
