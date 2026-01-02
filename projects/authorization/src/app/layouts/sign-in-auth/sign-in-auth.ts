import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { NgClass, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize, Subscription, take } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { AuthRequestDTO } from '../../interfaces/auth-request-dto';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'lib-sign-in-auth',
  imports: [InputTextModule, InputIconModule, IconFieldModule, NgClass, ReactiveFormsModule, CommonModule, RippleModule, RouterLink, MessageModule],
  templateUrl: './sign-in-auth.html',
  styleUrl: './sign-in-auth.scss',
})
export class SignInAuth implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly subs = new Subscription();

  protected form!: FormGroup;
  protected isPasswordVisible = false;
  protected loading = false;

  protected isUserError = false;
  protected isPasswordError = false;

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
  }

  private initializeForm()
  {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.loading);
  }

  onSubmit(): void
  {
    if (this.form.invalid) {
      this.loading = false;
      return;
    }

    this.loading = true;
    this.form.disable();

    const credentials: AuthRequestDTO = this.form.value;

    this.subs.add(
      this.authService.signIn(credentials).pipe(
        take(1),
        finalize(() => {
          this.loading = false;
          this.form.enable();
        })
      ).subscribe({
        next: () => this.form.reset(),
        error: () =>
        {
          this.isUserError = true;
          this.isPasswordError = true;
        }
      })
    );
  }
}
