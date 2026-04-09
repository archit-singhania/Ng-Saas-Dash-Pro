import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

export interface TranscriptLine {
  speaker: 'Agent' | 'Caller';
  text: string;
  timestamp: string;
}

export interface TranscriptRecord {
  id: number;
  date: string;
  phone: string;
  duration: string;
  status: string;
  transcript: TranscriptLine[];
}

@Component({
  selector: 'app-transcripts',
  imports: [TableModule, TagModule, ButtonModule, CardModule, DialogModule, DividerModule, ToastModule],
  providers: [MessageService],
  templateUrl: './transcripts.html',
  styleUrl: './transcripts.scss',
})
export class Transcripts {
  private messageService = inject(MessageService);

  showTranscript = false;
  selectedRecord: TranscriptRecord | null = null;

  records: TranscriptRecord[] = [
    {
      id: 1,
      date: '2025-04-09  10:32 AM',
      phone: '+91 98765 43210',
      duration: '3m 42s',
      status: 'Completed',
      transcript: [
        { speaker: 'Agent',  text: 'Hello! Thank you for calling. How can I assist you today?', timestamp: '0:00' },
        { speaker: 'Caller', text: 'Hi, I would like to book an appointment for next Monday.', timestamp: '0:05' },
        { speaker: 'Agent',  text: 'Of course! May I have your name and preferred time, please?', timestamp: '0:09' },
        { speaker: 'Caller', text: 'My name is Priya Sharma. 10 AM works for me.', timestamp: '0:14' },
        { speaker: 'Agent',  text: 'Perfect, Priya. I have booked you in for Monday at 10 AM. Is there anything else I can help you with?', timestamp: '0:20' },
        { speaker: 'Caller', text: 'No, that\'s all. Thank you!', timestamp: '0:28' },
        { speaker: 'Agent',  text: 'You\'re welcome. Have a great day! Goodbye.', timestamp: '0:31' },
      ]
    },
    {
      id: 2,
      date: '2025-04-09  11:15 AM',
      phone: '+91 87654 32109',
      duration: '1m 20s',
      status: 'Missed',
      transcript: [
        { speaker: 'Agent',  text: 'Hello! Thank you for calling. How can I assist you today?', timestamp: '0:00' },
        { speaker: 'Caller', text: '...', timestamp: '0:06' },
        { speaker: 'Agent',  text: 'I\'m sorry, I didn\'t catch that. Could you please repeat?', timestamp: '0:10' },
      ]
    },
    {
      id: 3,
      date: '2025-04-08  02:45 PM',
      phone: '+91 76543 21098',
      duration: '5m 10s',
      status: 'Completed',
      transcript: [
        { speaker: 'Agent',  text: 'Hello! Thank you for calling. How can I assist you today?', timestamp: '0:00' },
        { speaker: 'Caller', text: 'I want to reschedule my appointment from Friday to Thursday.', timestamp: '0:04' },
        { speaker: 'Agent',  text: 'Let me check availability for Thursday. May I have your booking ID?', timestamp: '0:10' },
        { speaker: 'Caller', text: 'Sure, it\'s BK-4892.', timestamp: '0:18' },
        { speaker: 'Agent',  text: 'Found it! I\'ve rescheduled your appointment to Thursday at 3 PM. Confirmation sent to your phone.', timestamp: '0:24' },
        { speaker: 'Caller', text: 'Thank you so much!', timestamp: '0:34' },
        { speaker: 'Agent',  text: 'My pleasure. Have a wonderful day!', timestamp: '0:37' },
      ]
    },
    {
      id: 4,
      date: '2025-04-08  04:00 PM',
      phone: '+91 65432 10987',
      duration: '2m 05s',
      status: 'Completed',
      transcript: [
        { speaker: 'Agent',  text: 'Hello! Thank you for calling. How can I assist you today?', timestamp: '0:00' },
        { speaker: 'Caller', text: 'Can you tell me your working hours?', timestamp: '0:05' },
        { speaker: 'Agent',  text: 'We are open Monday to Saturday, 9 AM to 6 PM. Is there anything else?', timestamp: '0:09' },
        { speaker: 'Caller', text: 'No, that\'s it. Thanks.', timestamp: '0:17' },
        { speaker: 'Agent',  text: 'You\'re welcome! Have a great day.', timestamp: '0:20' },
      ]
    },
    {
      id: 5,
      date: '2025-04-07  09:10 AM',
      phone: '+91 54321 09876',
      duration: '4m 30s',
      status: 'In Progress',
      transcript: [
        { speaker: 'Agent',  text: 'Hello! Thank you for calling. How can I assist you today?', timestamp: '0:00' },
        { speaker: 'Caller', text: 'I need help with my recent bill.', timestamp: '0:06' },
        { speaker: 'Agent',  text: 'I\'d be happy to help. Could you provide your account number?', timestamp: '0:11' },
        { speaker: 'Caller', text: 'It\'s 88-449-2201.', timestamp: '0:19' },
        { speaker: 'Agent',  text: 'Thank you. I can see your account. What seems to be the issue?', timestamp: '0:25' },
      ]
    },
  ];

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'Completed':   return 'success';
      case 'Missed':      return 'danger';
      case 'In Progress': return 'warn';
      default:            return 'secondary';
    }
  }

  openTranscript(rec: TranscriptRecord): void {
    this.selectedRecord = rec;
    this.showTranscript = true;
  }

  downloadRecording(rec: TranscriptRecord): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Download Started',
      detail: `Recording for ${rec.phone} is being prepared.`,
      life: 3000
    });
  }
}
