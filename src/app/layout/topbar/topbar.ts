import { Component, inject, HostListener, ElementRef, signal } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { ThemeService, ThemeMode, SurfaceKey, PRIMARY_PALETTES, SURFACE_PALETTES } from '../../core/services/theme.service';

@Component({
  selector: 'app-topbar',
  imports: [TooltipModule, ButtonModule, SelectButtonModule, DividerModule, DialogModule, TagModule, FormsModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class Topbar {
  themeService = inject(ThemeService);
  private elRef = inject(ElementRef<HTMLElement>);

  configOpen = false;
  notificationsOpen = signal(false);

  openNotifications(): void { this.notificationsOpen.set(true); }
  closeNotifications(): void { this.notificationsOpen.set(false); }

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
    const nativeEl = this.elRef.nativeElement as HTMLElement;
    if (!nativeEl.contains(e.target as Node)) this.configOpen = false;
  }
}
