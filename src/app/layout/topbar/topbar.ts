import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ThemeService, ThemeMode, SurfaceKey, PRIMARY_PALETTES, SURFACE_PALETTES } from '../../core/services/theme.service';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, TooltipModule, ButtonModule, SelectButtonModule, FormsModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class Topbar {
  themeService = inject(ThemeService);
  private elRef = inject(ElementRef);

  configOpen = false;

  primaryColors = Object.entries(PRIMARY_PALETTES).map(([name, palette]) => ({
    name,
    hex: palette[500]
  }));

  surfaceKeys = Object.keys(SURFACE_PALETTES) as SurfaceKey[];

  surfaceHex(key: SurfaceKey): string {
    return SURFACE_PALETTES[key][500];
  }

  themeModes: { mode: ThemeMode; icon: string; label: string }[] = [
    { mode: 'light',  icon: 'pi pi-sun',     label: 'Light'  },
    { mode: 'system', icon: 'pi pi-desktop', label: 'System' },
    { mode: 'dark',   icon: 'pi pi-moon',    label: 'Dark'   }
  ];

  get selectedMode(): ThemeMode { return this.themeService.mode(); }

  set selectedMode(val: ThemeMode) { this.themeService.setMode(val); }

  toggleConfig(): void { this.configOpen = !this.configOpen; }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(e.target)) this.configOpen = false;
  }
}
