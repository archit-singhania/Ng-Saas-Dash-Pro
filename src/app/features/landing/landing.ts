import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService, ThemeMode, SurfaceKey, PRIMARY_PALETTES, SURFACE_PALETTES } from '../../core/services/theme.service';

interface Feature {
  icon: string;
  title: string;
  description: string;
  status: 'live' | 'coming-soon';
}

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink, FormsModule, ButtonModule, CardModule, TagModule, DividerModule, TooltipModule, SelectButtonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  themeService = inject(ThemeService);
  private elRef = inject(ElementRef<HTMLElement>);

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

  toggleConfig(): void { this.configOpen = !this.configOpen; }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    if (!(this.elRef.nativeElement as HTMLElement).contains(e.target as Node)) this.configOpen = false;
  }

  currentYear = new Date().getFullYear();

  features: Feature[] = [
    { icon: 'pi pi-phone',      title: 'Feature 1',    description: 'Coming soon.',  status: 'live'        },
    { icon: 'pi pi-calendar',   title: 'Feature 2',         description: 'Coming soon.',  status: 'live'        },
    { icon: 'pi pi-file-edit',  title: 'Feature 3',  description: 'Coming soon.',  status: 'live'        },
    { icon: 'pi pi-sliders-h',  title: 'Feature 4',   description: 'Coming soon.',  status: 'live'        },
    { icon: 'pi pi-chart-bar',  title: 'Feature 5',            description: 'Coming soon.',  status: 'coming-soon' },
    { icon: 'pi pi-heart',      title: 'Feature 6',        description: 'Coming soon.',  status: 'coming-soon' },
  ];

  steps: Step[] = [
    { number: '01', icon: 'pi pi-plug',       title: 'Step 1',  description: 'Coming soon.' },
    { number: '02', icon: 'pi pi-code',       title: 'Step 2', description: 'Coming soon.' },
    { number: '03', icon: 'pi pi-phone',      title: 'Step 3',              description: 'Coming soon.' },
    { number: '04', icon: 'pi pi-chart-line', title: 'Step 4',    description: 'Coming soon.' },
  ];
}
