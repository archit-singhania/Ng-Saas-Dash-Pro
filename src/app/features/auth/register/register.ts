import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, ButtonModule, InputTextModule, PasswordModule, CheckboxModule, DividerModule, ToastModule, SelectModule],
  providers: [MessageService],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  fullName = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  businessName = signal('');
  agreedToTerms = signal(false);
  loading = signal(false);

  businessSizes = [
    { label: 'Just me', value: 'solo' },
    { label: '2–10 employees', value: 'small' },
    { label: '11–50 employees', value: 'medium' },
    { label: '51–200 employees', value: 'large' },
    { label: '200+ employees', value: 'enterprise' },
  ];
  businessSize = signal('small');

  onSubmit(): void {
    if (!this.fullName() || !this.email() || !this.password()) {
      this.messageService.add({ severity: 'warn', summary: 'Missing Fields', detail: 'Please fill in all required fields.', life: 3000 });
      return;
    }
    if (this.password() !== this.confirmPassword()) {
      this.messageService.add({ severity: 'error', summary: 'Password Mismatch', detail: 'Passwords do not match.', life: 3000 });
      return;
    }
    if (!this.agreedToTerms()) {
      this.messageService.add({ severity: 'warn', summary: 'Terms Required', detail: 'Please agree to the terms of service.', life: 3000 });
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.authService.register(this.fullName(), this.email(), this.password());
      this.loading.set(false);
      void this.router.navigate(['/dashboard']);
    }, 900);
  }
}
