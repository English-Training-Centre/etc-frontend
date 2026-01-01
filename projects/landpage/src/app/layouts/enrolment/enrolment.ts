import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-enrolment',
  imports: [Ripple, FormsModule, ReactiveFormsModule, IconFieldModule, InputIconModule, InputTextModule, InputMaskModule, SelectModule, DatePickerModule, CommonModule],
  templateUrl: './enrolment.html',
  styleUrl: './enrolment.scss',
})
export class Enrolment implements OnInit {
  private readonly fb = inject(FormBuilder);
  form!: FormGroup;

  protected modalityOptions: any[] =
  [
    { id: 'onPerson', value: 'Presencial' },
    { id: 'online', value: 'Online' }
  ];

  protected packageOptions: any[] =
  [
    { id: 'regular', value: 'Regular' },
    { id: 'intensive', value: 'Intensivo' },
    { id: 'private', value: 'Particular' }
  ];

  protected levelOptions: any[] =
  [
    { id: 'a1', value: 'A1 - Iniciante' },
    { id: 'a2', value: 'A2 - Básico' },
    { id: 'b1', value: 'B1 - Intermédio' },
    { id: 'b2', value: 'B2 - Intermédio Superior' },
    { id: 'c1', value: 'C1 - Avançado' }
  ];

  protected timeOptions: any[] =
  [
    { id: '7h', value: '7h:00 - 8h:00' },
    { id: '8h', value: '8h:00 - 9h:00' },
    { id: '9h', value: '9h:00 - 10h:00' },
    { id: '10h', value: '10h:00 - 11h:00' },
    { id: '11h', value: '11h:00 - 12h:00' },
    { id: '12h', value: '12h:00 - 13h:00' },
    { id: '13h', value: '13h:00 - 14h:00' },
    { id: '14h', value: '14h:00 - 15h:00' },
    { id: '15h', value: '15h:00 - 16h:00' },
    { id: '16h', value: '16h:00 - 17h:00' },
    { id: '17h', value: '17h:00 - 18h:00' },
    { id: '18h', value: '18h:00 - 19h:00' },
    { id: '19h', value: '19h:00 - 20h:00' }
  ];

  protected genderOptions: any[] =
  [
    { id: 'female', value: 'Feminino' },
    { id: 'male', value: 'Masculino' }
  ];

  ngOnInit(): void {
    this.initializeForm();

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  private initializeForm(): void
  {
    this.form = this.fb.group({
      modality: [null],
      package: [null],
      level: [null],
      time: [null],

      fullName: [],
      gender: [null],
      dateBirth: [null],

      email: [null],
      phone: [null],
      residencialAddress: [null]
    });
  }
}
