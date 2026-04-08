import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ThemeService } from '../../core/services/theme.service';

interface SubItem {
  label: string;
  icon: string;
  route: string;
}

interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: SubItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule, TooltipModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  themeService = inject(ThemeService);
  featuresExpanded = signal(false);

  navItems: NavItem[] = [
    { label: 'Overview',  icon: 'pi pi-home',  route: '/dashboard' },
    { label: 'Call Logs', icon: 'pi pi-phone', route: '/calls'     },
    {
      label: 'Features',
      icon: 'pi pi-box',
      route: '/features',
      children: [
        { label: 'Booking Details',   icon: 'pi pi-calendar',    route: '/features/bookings'    },
        { label: 'Transcripts',       icon: 'pi pi-file-edit',   route: '/features/transcripts' },
        { label: 'Data Analytics',    icon: 'pi pi-chart-bar',   route: '/features/analytics'   },
        { label: 'Sentiment Analysis',icon: 'pi pi-heart',       route: '/features/sentiment'   },
        { label: 'CRM Integration',   icon: 'pi pi-users',       route: '/features/crm'         }
      ]
    },
    { label: 'Settings',  icon: 'pi pi-cog',   route: '/settings'  }
  ];

  toggleFeatures(event: MouseEvent): void {
    event.preventDefault();
    this.featuresExpanded.update(v => !v);
  }
}
