import { Component, inject, signal, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

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
  imports: [RouterLink, RouterLinkActive, TooltipModule, DialogModule, DrawerModule, TagModule, DividerModule, ButtonModule, AvatarModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  themeService = inject(ThemeService);
  authService = inject(AuthService);
  private elRef = inject(ElementRef);

  featuresExpanded = signal(false);
  profileOpen = signal(false);
  settingsOpen = signal(false);

  navItems: NavItem[] = [
    { label: 'Overview',  icon: 'pi pi-home',  route: '/dashboard' },
    { label: 'Call Logs', icon: 'pi pi-phone', route: '/calls'     },
    {
      label: 'Features',
      icon: 'pi pi-box',
      route: '/features',
      children: [
        { label: 'Bookings Calendar',        icon: 'pi pi-calendar',   route: '/features/bookings'        },
        { label: 'Transcripts & Recordings', icon: 'pi pi-file-edit',  route: '/features/transcripts'     },
        { label: 'Prompt & Knowledge Base',  icon: 'pi pi-sliders-h',  route: '/features/prompt-settings' },
        { label: 'Data Analytics',           icon: 'pi pi-chart-bar',  route: '/features/analytics'       },
        { label: 'Sentiment Analysis',       icon: 'pi pi-heart',      route: '/features/sentiment'       },
        { label: 'CRM Integration',          icon: 'pi pi-users',      route: '/features/crm'             }
      ]
    }
  ];

  toggleFeatures(event: Event): void {
    event.preventDefault();
    this.featuresExpanded.update(v => !v);
  }

  openSettings(event: Event): void {
    event.preventDefault();
    this.settingsOpen.set(true);
  }

  closeSettings(): void {
    this.settingsOpen.set(false);
  }

  openProfile(): void {
    this.profileOpen.set(true);
  }

  signOut(): void {
    this.profileOpen.set(false);
    this.authService.logout();
  }
}
