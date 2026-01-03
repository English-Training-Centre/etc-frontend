import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { Subscription } from 'rxjs';
import { DialogCreateRepository } from '../../../../../../../core/src/lib/repositories/dialog-create-repository';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-create-employees-dialog',
  imports: [Dialog, FormsModule, ReactiveFormsModule, IconFieldModule, InputIconModule, InputTextModule, InputMaskModule, CommonModule, FloatLabelModule, InputNumberModule, MessageModule],
  templateUrl: './create-employees-dialog.html',
  styleUrl: './create-employees-dialog.scss',
})
export class CreateEmployeesDialog implements OnInit, OnDestroy {
  private readonly dialogCreateRep = inject(DialogCreateRepository);

  private readonly fb = inject(FormBuilder);
  private readonly subs = new Subscription();

  protected form!: FormGroup;

  protected loading = false;
  protected isVisible = false;

  protected isUserError = false;

  ngOnInit(): void {
    this.initializeForm();

    this.subs.add(
      this.dialogCreateRep.currentDialog$.subscribe(value => {
        if (value.format === 'human_resources-create')
        {
          this.isVisible = value.isVisible;
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
  }

  private initializeForm()
  {
    this.form = this.fb.group({
      username: [null, Validators.required],
      phoneNumber: [null]
    });
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.loading);
  }

  onSubmit()
  {}
}
