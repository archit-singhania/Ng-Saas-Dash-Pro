import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-crm',
  imports: [CardModule],
  templateUrl: './crm.html',
  styleUrl: './crm.scss',
})
export class Crm {}
