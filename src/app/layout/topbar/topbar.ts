import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ThemeService, ThemeMode } from '../../core/services/theme.service';

type PrimaryColor = {
  name: string;
  hex: string;
};

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, TooltipModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class Topbar {
  themeService = inject(ThemeService);
  private elRef = inject(ElementRef);

  configOpen = false;

  primaryColors: PrimaryColor[] = [
    { name: 'noir',    hex: '#18181b' },
    { name: 'emerald', hex: '#10b981' },
    { name: 'green',   hex: '#22c55e' },
    { name: 'lime',    hex: '#84cc16' },
    { name: 'orange',  hex: '#f97316' },
    { name: 'amber',   hex: '#f59e0b' },
    { name: 'yellow',  hex: '#eab308' },
    { name: 'teal',    hex: '#14b8a6' },
    { name: 'cyan',    hex: '#06b6d4' },
    { name: 'sky',     hex: '#0ea5e9' },
    { name: 'blue',    hex: '#3b82f6' },
    { name: 'indigo',  hex: '#6366f1' },
    { name: 'violet',  hex: '#8b5cf6' },
    { name: 'purple',  hex: '#a855f7' },
    { name: 'fuchsia', hex: '#d946ef' },
    { name: 'pink',    hex: '#ec4899' },
    { name: 'rose',    hex: '#f43f5e' }
  ];

  selectedPrimary = '#8b5cf6';

  themeModes: { mode: ThemeMode; icon: string; label: string }[] = [
    { mode: 'light',  icon: 'pi pi-sun',     label: 'Light'  },
    { mode: 'system', icon: 'pi pi-desktop', label: 'System' },
    { mode: 'dark',   icon: 'pi pi-moon',    label: 'Dark'   }
  ];

  setTheme(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }

  selectPrimary(color: PrimaryColor): void {
    this.selectedPrimary = color.hex;
    document.documentElement.style.setProperty('--primary-color', color.hex);
  }

  toggleConfig(): void {
    this.configOpen = !this.configOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(e.target)) {
      this.configOpen = false;
    }
  }
}
