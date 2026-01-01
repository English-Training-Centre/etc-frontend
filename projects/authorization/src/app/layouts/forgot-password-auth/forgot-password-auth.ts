import { NgClass, CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-forgot-password-auth',
  imports: [InputTextModule, InputIconModule, IconFieldModule, NgClass, ReactiveFormsModule, CommonModule, RippleModule, RouterLink],
  templateUrl: './forgot-password-auth.html',
  styleUrl: './forgot-password-auth.scss',
})
export class ForgotPasswordAuth implements OnInit, OnDestroy {
  private readonly subs = new Subscription();
  private readonly fb = inject(FormBuilder);

  form!: FormGroup;
  showLoader = false;
  isError = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
  }

  private initializeForm()
  {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.form.get('email')?.valueChanges.subscribe(() => {
      this.form.get('email')?.setErrors(null);
      this.isError = false;
    });
  }

  private resetFormErrors() {
    this.form.get('email')?.setErrors(null);
    this.form.get('email')?.updateValueAndValidity();

    this.isError = false;
  }

  // On Submit
  onSubmit(): void
  {
  }
}
