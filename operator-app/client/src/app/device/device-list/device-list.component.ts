import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../_models/device.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-device-list',
  template: `
    <div class="row">
      <app-device-list-card class="col-sm-3" *ngFor="let device of devices | async" [device]="device"></app-device-list-card>
    </div>
  `,
})
export class DeviceListComponent implements OnInit {
  devices: Observable<Device[]>;

  constructor(private deviceService: DeviceService, private route: ActivatedRoute) {
  
   }

  ngOnInit() {
    console.log('onInit');

    //this.devices = this.route.snapshot.data['devices'];
    this.devices = this.deviceService.getDevices();
    console.log(this.devices);
  }

}
