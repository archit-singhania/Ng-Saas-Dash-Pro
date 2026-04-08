import { Component, inject, signal, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
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
  imports: [RouterLink, RouterLinkActive, CommonModule, TooltipModule, DialogModule, DrawerModule, TagModule, DividerModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  themeService = inject(ThemeService);
  private elRef = inject(ElementRef);

  featuresExpanded = signal(false);
  profileOpen = signal(false);
  settingsOpen = signal(false);
  activeSettingsTab = signal('profile');

  settingsTabs = [
    { id: 'profile',       label: 'Profile',       icon: 'pi pi-user'        },
    { id: 'agent',         label: 'Agent Config',  icon: 'pi pi-microphone'  },
    { id: 'api',           label: 'API & Keys',    icon: 'pi pi-key'         },
    { id: 'notifications', label: 'Notifications', icon: 'pi pi-bell'        },
    { id: 'billing',       label: 'Billing',       icon: 'pi pi-credit-card' },
  ];

  openSettings(event: MouseEvent): void {
    event.preventDefault();
    this.settingsOpen.set(true);
  }

  closeSettings(): void {
    this.settingsOpen.set(false);
  }

  setSettingsTab(id: string): void {
    this.activeSettingsTab.set(id);
  }

  navItems: NavItem[] = [
    { label: 'Overview',  icon: 'pi pi-home',  route: '/dashboard' },
    { label: 'Call Logs', icon: 'pi pi-phone', route: '/calls'     },
    {
      label: 'Features',
      icon: 'pi pi-box',
      route: '/features',
      children: [
        { label: 'Booking Details',    icon: 'pi pi-calendar',  route: '/features/bookings'    },
        { label: 'Transcripts',        icon: 'pi pi-file-edit', route: '/features/transcripts' },
        { label: 'Data Analytics',     icon: 'pi pi-chart-bar', route: '/features/analytics'   },
        { label: 'Sentiment Analysis', icon: 'pi pi-heart',     route: '/features/sentiment'   },
        { label: 'CRM Integration',    icon: 'pi pi-users',     route: '/features/crm'         }
      ]
    }
  ];

  toggleFeatures(event: MouseEvent): void {
    event.preventDefault();
    this.featuresExpanded.update(v => !v);
  }

  openProfile(): void {
    this.profileOpen.set(true);
  }

  closeProfile(): void {
    this.profileOpen.set(false);
  }


}
