import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  template: `
  <h2>Login</h2>
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
    <label for="username">Username</label>
    <input type="text" formControlName="username" class="form-control" [ngClass]="{ 'is-invalid': submitted && fields.username.errors }" />
    <div *ngIf="submitted && fields.username.errors" class="invalid-feedback">
      <div *ngIf="fields.username.errors.required">Username is required</div>
    </div>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" formControlName="password" class="form-control"
          [ngClass]="{ 'is-invalid': submitted && fields.password.errors }" />
    <div *ngIf="submitted && fields.password.errors" class="invalid-feedback">
      <div *ngIf="fields.password.errors.required">Password is required</div>
    </div>
  </div>
  <div class="form-group">
    <button [disabled]="loading" class="btn btn-primary">Login</button>
  </div>
  <div *ngIf="error" class="alert alert-danger">{{error}}</div>
  </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get fields() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.fields.username.value, this.fields.password.value)
      .subscribe(
        data => {
          console.log('redirecting to ... ');
          console.log(this.returnUrl);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
