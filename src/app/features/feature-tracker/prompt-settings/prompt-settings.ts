import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-prompt-settings',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule, InputTextModule, TextareaModule,
    SliderModule, SelectButtonModule, ToggleSwitchModule, InputNumberModule,
    AutoCompleteModule, SelectModule, FileUploadModule, ToastModule, TagModule,
    CardModule 
  ],
  providers: [MessageService],
  templateUrl: './prompt-settings.html',
  styleUrl: './prompt-settings.scss'
})
export class PromptSettings {
  greetingEnabled = signal(true);
  greetingText = signal('Hello! Thank you for calling. How may I assist you today?');
  agentName = signal('Aria');

  systemPrompt = signal(
    'You are Aria, a professional AI voice assistant. Your role is to handle inbound customer calls politely and efficiently. Always greet the caller, understand their intent, and either resolve their query or schedule a callback. Do not make promises outside your knowledge base. If unsure, escalate to a human agent.'
  );

  listeningScore = signal(70);
  vadMode = signal('Automatic');
  vadOptions = [
    { label: 'Automatic', value: 'Automatic' },
    { label: 'Manual', value: 'Manual' },
    { label: 'Aggressive', value: 'Aggressive' }
  ];

  allowInterruptions = signal(true);
  silenceThreshold = signal(1200);

  fallbackMessage = signal("I'm sorry, I didn't quite understand that. Could you please rephrase?");
  fallbackTriggers = signal<string[]>(['huh', "don't understand", 'what', 'repeat', 'pardon']);

  uploadedDocs = signal<{ name: string; size: string; uploadedAt: string }[]>([
    { name: 'Product_FAQ.pdf', size: '128 KB', uploadedAt: '2025-04-01' },
    { name: 'Pricing_Guide_2025.pdf', size: '256 KB', uploadedAt: '2025-04-05' },
  ]);

  postCallActions = [
    { label: 'None', value: 'none' },
    { label: 'Send SMS Confirmation', value: 'sms' },
    { label: 'Log Support Ticket', value: 'ticket' },
    { label: 'Update CRM Record', value: 'crm' },
    { label: 'Send Email Summary', value: 'email' }
  ];
  selectedPostCallAction = signal('sms');
  wrapUpNote = signal('Thank you for calling. A summary of your session has been sent to your registered number.');

  languages = [
    { label: 'English (India)', value: 'en-IN' },
    { label: 'English (US)', value: 'en-US' },
    { label: 'Hindi', value: 'hi-IN' },
    { label: 'Tamil', value: 'ta-IN' },
    { label: 'Telugu', value: 'te-IN' }
  ];
  selectedLanguage = signal('en-IN');

  voices = [
    { label: 'Aria — Female (Neutral)', value: 'aria' },
    { label: 'Nova — Female (Warm)', value: 'nova' },
    { label: 'Echo — Male (Clear)', value: 'echo' },
    { label: 'Onyx — Male (Deep)', value: 'onyx' }
  ];
  selectedVoice = signal('aria');

  escalationPhrases = signal<string[]>(['speak to manager', 'human agent', 'transfer', 'escalate', 'complaint']);
  escalationPhone = signal('+91 99000 11000');
  escalationEmail = signal('support@yourbusiness.com');

  get listeningLabel(): string {
    if (this.listeningScore() < 34) return 'Low';
    if (this.listeningScore() < 67) return 'Medium';
    return 'High';
  }

  get charCount(): number {
    return this.systemPrompt().length;
  }

  removeDoc(index: number): void {
    this.uploadedDocs.update(docs => docs.filter((_, i) => i !== index));
  }

  saveAll(): void {
    return;
  }

  resetAll(): void {
    this.greetingText.set('Hello! Thank you for calling. How may I assist you today?');
    this.agentName.set('Aria');
    this.listeningScore.set(70);
    this.silenceThreshold.set(1200);
  }
}
