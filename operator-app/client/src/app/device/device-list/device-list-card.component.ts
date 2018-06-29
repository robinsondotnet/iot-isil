import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../../_models/device.model';

@Component({
  selector: 'app-device-list-card',
  template: `
  <div class="card">
    <div class="card-body">
        <h5>{{ device.type }} #{{device.uniqueId}}</h5>
        <p class="card-text"><b>Location:</b> {{device.location}}</p>
        <a [routerLink]="['/device', device.id]" class="btn btn-primary">View Status</a>
    </div>
  </div>
  `
})
export class DeviceListCardComponent implements OnInit {

  @Input() device: Device;

  constructor() { }

  ngOnInit() {
  }

}
