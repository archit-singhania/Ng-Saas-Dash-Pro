import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CallApiService, CallRow } from '../../../core/services/call-api.service';
import { DownloadService } from '../../../core/services/download.service';

@Component({
  selector: 'app-transcripts',
  imports: [TableModule, ButtonModule, CardModule, DialogModule, DividerModule, ChipModule, ToastModule],
  providers: [MessageService],
  templateUrl: './transcripts.html',
  styleUrl: './transcripts.scss',
})
export class Transcripts implements OnInit {
  private callApi         = inject(CallApiService);
  private downloadService = inject(DownloadService);
  private messageService  = inject(MessageService);

  records  = signal<CallRow[]>([]);
  total    = signal(0);
  page     = signal(1);
  limit    = signal(15);
  loading  = signal(true);

  showTranscriptDialog  = false;
  showRecordingDialog   = false;
  selectedRecord: CallRow | null = null;

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.loading.set(true);
    this.callApi.getCalls(this.page(), this.limit()).subscribe({
      next: res => {
        this.records.set(res.data);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onPageChange(event: { first: number; rows: number }): void {
    this.limit.set(event.rows);
    this.page.set(Math.floor(event.first / event.rows) + 1);
    this.loadPage();
  }

  openTranscript(rec: CallRow): void {
    this.selectedRecord = rec;
    this.showTranscriptDialog = true;
  }

  openRecording(rec: CallRow): void {
    this.selectedRecord = rec;
    this.showRecordingDialog = true;
  }

  downloadTranscript(): void {
    if (!this.selectedRecord?.transcript) return;
    this.downloadService.downloadText(
      this.selectedRecord.transcript,
      `transcript_${this.selectedRecord.phone}_${this.selectedRecord.date}.txt`
    );
  }

  downloadRecording(): void {
    if (!this.selectedRecord?.recordingUrl) return;
    this.downloadService.downloadFromUrl(
      this.selectedRecord.recordingUrl,
      `recording_${this.selectedRecord.phone}.ogg`
    );
    this.messageService.add({
      severity: 'info',
      summary: 'Download Started',
      detail: 'Recording download initiated.',
      life: 3000
    });
  }

  formatTranscriptLines(raw: string): { speaker: string; text: string }[] {
    if (!raw) return [];
    return raw.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        if (line.startsWith('[ASSISTANT]')) {
          return { speaker: 'Agent', text: line.replace('[ASSISTANT]', '').trim() };
        } else if (line.startsWith('[USER]')) {
          return { speaker: 'Caller', text: line.replace('[USER]', '').trim() };
        }
        return { speaker: '—', text: line };
      });
  }
}
