import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ThemeService } from '../../core/services/theme.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule, TooltipModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  themeService = inject(ThemeService);

  navItems: NavItem[] = [
    { label: 'Overview',  icon: 'pi pi-home',  route: '/dashboard' },
    { label: 'Call Logs', icon: 'pi pi-phone', route: '/calls'     },
    { label: 'Features',  icon: 'pi pi-box',   route: '/features'  },
    { label: 'Settings',  icon: 'pi pi-cog',   route: '/settings'  }
  ];
}
