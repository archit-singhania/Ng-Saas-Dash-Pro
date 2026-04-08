import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from '../topbar/topbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, Topbar, Sidebar],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss'
})
export class AppLayout {
  sidebarVisible = true;

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
