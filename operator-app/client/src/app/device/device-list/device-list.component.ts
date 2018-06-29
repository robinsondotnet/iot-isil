import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../_models/device.model';

@Component({
  selector: 'app-device-list',
  template: `
    <div class="row">
      <app-device-list-card class="col-sm-3" *ngFor="let device of devices" [device]="device"></app-device-list-card>
    </div>
  `,
})
export class DeviceListComponent implements OnInit {
  devices: Device[];

  constructor(private deviceService: DeviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.devices = this.route.snapshot.data['devices'];
  }

}
