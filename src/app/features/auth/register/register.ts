import { Component, signal, inject, HostListener, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService, ThemeMode, SurfaceKey, PRIMARY_PALETTES, SURFACE_PALETTES } from '../../../core/services/theme.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, ButtonModule, InputTextModule, PasswordModule, CheckboxModule, DividerModule, ToastModule, TooltipModule, SelectButtonModule],
  providers: [MessageService],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private elRef = inject(ElementRef<HTMLElement>);

  themeService = inject(ThemeService);
  configOpen = false;
  primaryColors = Object.entries(PRIMARY_PALETTES).map(([name, palette]) => ({ name, hex: palette[500] }));
  surfaceKeys = Object.keys(SURFACE_PALETTES) as SurfaceKey[];
  surfaceHex(key: SurfaceKey): string { return SURFACE_PALETTES[key][500]; }
  themeModes: { mode: ThemeMode; icon: string; label: string }[] = [
    { mode: 'light',  icon: 'pi pi-sun',     label: 'Light'  },
    { mode: 'system', icon: 'pi pi-desktop', label: 'System' },
    { mode: 'dark',   icon: 'pi pi-moon',    label: 'Dark'   }
  ];
  get selectedMode(): ThemeMode { return this.themeService.mode(); }
  set selectedMode(val: ThemeMode) { this.themeService.setMode(val); }
  toggleConfig(e: Event): void {
    e.stopPropagation();
    this.configOpen = !this.configOpen;
  }
  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!(this.elRef.nativeElement as HTMLElement).contains(e.target as Node)) this.configOpen = false;
  }

  fullName = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  loading = signal(false);

  onSubmit(): void {
    this.loading.set(true);
    this.authService.register(
      this.fullName() || 'User',
      this.email() || 'user@example.com',
      this.password() || 'password'
    );
    setTimeout(() => {
      this.loading.set(false);
      void this.router.navigate(['/dashboard']);
    }, 700);
  }
}
