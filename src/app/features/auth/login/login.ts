import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ButtonModule, InputTextModule, PasswordModule, CheckboxModule, DividerModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  loading = signal(false);

  onSubmit(): void {
    if (!this.email() || !this.password()) {
      this.messageService.add({ severity: 'warn', summary: 'Missing Fields', detail: 'Please enter your email and password.', life: 3000 });
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      const ok = this.authService.login(this.email(), this.password());
      this.loading.set(false);
      if (ok) {
        void this.router.navigate(['/dashboard']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid email or password.', life: 3000 });
      }
    }, 800);
  }
}
