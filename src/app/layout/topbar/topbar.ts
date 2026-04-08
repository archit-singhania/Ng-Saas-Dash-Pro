import { Component, Output, EventEmitter, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ThemeService, ThemeMode } from '../../core/services/theme.service';

@Component({
  selector: 'app-topbar',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss'
})
export class Topbar {
  @Output() menuToggle = new EventEmitter<void>();

  themeService = inject(ThemeService);

  themeModes: { mode: ThemeMode; icon: string; label: string }[] = [
    { mode: 'light',  icon: 'pi pi-sun',     label: 'Light'  },
    { mode: 'system', icon: 'pi pi-desktop', label: 'System' },
    { mode: 'dark',   icon: 'pi pi-moon',    label: 'Dark'   }
  ];

  setTheme(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }
}
