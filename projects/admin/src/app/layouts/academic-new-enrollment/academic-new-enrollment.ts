import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Ripple } from 'primeng/ripple';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Subscription } from 'rxjs';
import { Divider } from 'primeng/divider';
import { InputNumber } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-academic-new-enrollment',
  imports: [StepperModule, ButtonModule, Ripple, FormsModule, ReactiveFormsModule, IconFieldModule, InputIconModule, InputTextModule, InputMaskModule, SelectModule, DatePickerModule, CommonModule, FloatLabelModule, InputNumber, Divider],
  templateUrl: './academic-new-enrollment.html',
  styleUrl: './academic-new-enrollment.scss',
})
export class AcademicNewEnrollment implements OnInit, OnDestroy, AfterViewInit {
  private readonly subs = new Subscription();
  private readonly fb = inject(FormBuilder);
  form!: FormGroup;
  activeStep: number = 1;

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

  showLoader = false;
  cashRegisterId: string = '';
  visible: boolean = false;

  isCashHovered = false;
  cashPriceEnabled = false;
  cashPriceControl = new FormControl<number | null>(null);

  isEMolaHovered = false;
  eMolaPriceEnabled = false;
  eMolaPriceControl = new FormControl<number | null>(null);

  isMPesaHovered = false;
  mPesaPriceEnabled = false;
  mPesaPriceControl = new FormControl<number | null>(null);

  @ViewChild('cashField') cashField!: ElementRef;
  @ViewChild('eMolaField') eMolaField!: ElementRef;
  @ViewChild('mPesaField') mPesaField!: ElementRef;

  isCashReadonly = true;
  isEMolaReadonly = true;
  isMPesaReadonly = true;

  totalAmount = signal(0);
  totalPaid = signal(0);
  totalDue = signal(0);
  totalChange = signal(0);

  private listenerEnabled = false;

  ngOnInit(): void {
    this.initializeForm();

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
    this.listenerEnabled = false;
  }

  ngAfterViewInit(): void {
    // Garante que as refs existam
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

  toggleMethod(method: 'cash' | 'eMola' | 'mPesa'): void {
    // Ativar o escolhido
    switch (method) {
      case 'cash':
        this.cashPriceEnabled = !this.cashPriceEnabled;
        if (!this.cashPriceEnabled) {
          this.cashPriceControl.setValue(null);
          this.isCashReadonly = true;
        }
        else
        {
          this.isCashReadonly = false;
          this.focusInput(this.cashField);
        }
        break;
      case 'eMola':
        this.eMolaPriceEnabled = !this.eMolaPriceEnabled;
        if (!this.eMolaPriceEnabled) {
          this.eMolaPriceControl.setValue(null);
          this.isEMolaReadonly = true;
        }
        else
        {
          this.isEMolaReadonly = false;
          this.focusInput(this.eMolaField);
        }
        break;
      case 'mPesa':
        this.mPesaPriceEnabled = !this.mPesaPriceEnabled;
        if (!this.mPesaPriceEnabled) {
          this.mPesaPriceControl.setValue(null);
          this.isMPesaReadonly = true;
        }
        else
        {
          this.isMPesaReadonly = false;
          this.focusInput(this.mPesaField);
        }
        break;
    }
  }

  private focusInput(container: ElementRef): void {
    // Aguarda a animação abrir (300ms da sua transition)
    setTimeout(() => {
      const input = container.nativeElement.querySelector('input');
      if (input) {
        input.focus();
        input.select(); // seleciona o texto (ótimo para POS!)
      }
    }, 320);
  }

  sumAmount()
  {
    const totalAmount = Number(this.totalAmount() ?? 0);
    const cash = Number(this.cashPriceControl.value ?? 0);
    const eMola = Number(this.eMolaPriceControl.value ?? 0);
    const mPesa = Number(this.mPesaPriceControl.value ?? 0);

    const totalPaid = cash + eMola + mPesa;
    const totalDue = totalAmount - totalPaid;
    const totalChange = totalPaid - totalAmount;

    this.totalPaid.set(totalPaid);

    if (totalPaid < totalAmount)
    {
      this.totalDue.set(totalDue);
      this.totalChange.set(0);
    } else
    {
      this.totalChange.set(totalChange);
      this.totalDue.set(0);
    }
  }

  clearAmount() {
    this.totalPaid.set(0);
    this.totalDue.set(0);
    this.totalChange.set(0);

    this.cashPriceEnabled = false;
    this.eMolaPriceEnabled = false;
    this.mPesaPriceEnabled = false;

    this.cashPriceControl.setValue(null);
    this.eMolaPriceControl.setValue(null);
    this.mPesaPriceControl.setValue(null);
  }
}
