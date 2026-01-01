import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'lib-validate-code-auth',
  imports: [FormsModule, InputOtpModule, NgClass, RouterLink],
  templateUrl: './validate-code-auth.html',
  styleUrl: './validate-code-auth.scss',
})
export class ValidateCodeAuth implements OnInit {
  private router = inject(Router);
  otpCode: any;
  loader: boolean = false;
  isInvalid: boolean = false;

  ngOnInit(): void {
    const browserInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      vendor: navigator.vendor
    };

    //console.log('Browser Info:', browserInfo);
  }

  onOtpChange(value: string) {
    if (value.length === 8) {
      this.verifyOtp();
    }
  }

  verifyOtp()
  {
    console.log('✅ OTP completo:', this.otpCode);
    /*this.isInvalid = false;
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.isInvalid = true;
    }, 3000);*/

    this.loader = true;
    setTimeout(() => this.router.navigate(['/v1-licence_ok']), 3000);
  }
}
