import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-sentiment',
  imports: [CardModule],
  templateUrl: './sentiment.html',
  styleUrl: './sentiment.scss',
})
export class Sentiment {}
