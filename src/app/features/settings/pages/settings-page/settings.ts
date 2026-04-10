import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';

export interface SettingsTab {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-settings',
  imports: [FormsModule, TagModule, DividerModule, ToggleSwitchModule, ButtonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  activeTab = signal('profile');

  tabs: SettingsTab[] = [
    { id: 'profile',       label: 'Profile',       icon: 'pi pi-user'         },
    { id: 'agent',         label: 'Agent Config',  icon: 'pi pi-microphone'   },
    { id: 'api',           label: 'API & Keys',    icon: 'pi pi-key'          },
    { id: 'notifications', label: 'Notifications', icon: 'pi pi-bell'         },
    { id: 'billing',       label: 'Billing',       icon: 'pi pi-credit-card'  },
  ];

  toggleDisabled2fa = false;
  toggleAgentActive = true;
  toggleMissedCallAlerts = true;
  toggleDailySummary = false;
  toggleAgentDowntime = true;

  setTab(id: string): void {
    this.activeTab.set(id);
  }
}
