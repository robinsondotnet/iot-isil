import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../../_models/device.model';

@Component({
  selector: 'app-device-list-card',
  template: `
  <div class="card">
    <div class="card-body">
        <h5>Device: {{ device.id }} </h5>
        <p class="card-text"><b>IsUsed:</b> {{ device.isUsed }} </p>
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
