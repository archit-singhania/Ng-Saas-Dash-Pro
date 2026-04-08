import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule, ButtonModule, TooltipModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  @Input() visible = true;

  navGroups: NavGroup[] = [
    {
      label: 'General',
      items: [
        { label: 'Overview', icon: 'pi pi-home', route: '/dashboard' },
        { label: 'Call Logs', icon: 'pi pi-phone', route: '/calls' }
      ]
    },
    {
      label: 'Manage',
      items: [
        { label: 'Features', icon: 'pi pi-box', route: '/features' },
        { label: 'Settings', icon: 'pi pi-cog', route: '/settings' }
      ]
    }
  ];
}
