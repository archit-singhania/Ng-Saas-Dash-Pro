import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from './topbar/topbar';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, Topbar, Sidebar],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class AppLayout {}
