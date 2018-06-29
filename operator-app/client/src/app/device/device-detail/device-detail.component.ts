import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../../_models/device.model';
import { ActivatedRoute, Params } from '@angular/router';
import { DeviceService } from '../shared';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  device: Device;

  constructor(private deviceService: DeviceService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.forEach((params: Params) => {
      this.device = this.router.snapshot.data['device'];
    });
  }

}
