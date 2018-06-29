import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  DeviceListComponent,
  DeviceDetailComponent,
  DeviceListCardComponent,
} from './device';

import {
  NavMenuComponent,
} from './_layout';

import { DeviceResolver, DeviceService, DeviceListResolver } from './device/shared';
import { AuthGuard } from './_guards';
import { AuthModule } from './auth/auth.module';
import { BACKEND_URL } from './_common/app.config';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    DeviceDetailComponent,
    DeviceListCardComponent,
    DeviceListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(([
      { path: '', redirectTo: 'device', pathMatch: 'full'},
      { path: 'device', component: DeviceListComponent, resolve: { devices: DeviceListResolver }, canActivate: [AuthGuard] },
      { path: 'device/:id', component: DeviceDetailComponent, resolve: {device: DeviceResolver}, canActivate: [AuthGuard] },
      { path: 'service', component: DeviceListComponent, resolve: {devices: DeviceListResolver}, canActivate: [AuthGuard] },
      { path: 'car', component: DeviceListComponent, resolve: { devices: DeviceListResolver}, canActivate: [AuthGuard]},
      { path: 'owner', component: DeviceListComponent, resolve: { devices: DeviceListResolver }, canActivate: [AuthGuard] },
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
    ])),
    NgbModule.forRoot(),
    AuthModule
  ],
  providers: [
    DeviceService,
    DeviceResolver,
    DeviceListResolver,
    AuthGuard,
    { provide: BACKEND_URL, useValue: 'http://localhost:5001/api'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
