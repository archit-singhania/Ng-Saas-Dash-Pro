import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

interface Feature {
  icon: string;
  title: string;
  description: string;
  status: 'live' | 'coming-soon';
}

interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink, ButtonModule, CardModule, TagModule, DividerModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  currentYear = new Date().getFullYear();

  features: Feature[] = [
    { icon: 'pi pi-phone',      title: 'Inbound Call Answering',    description: 'AI voice agent answers every call instantly — no hold times, no missed leads.',      status: 'live'        },
    { icon: 'pi pi-calendar',   title: 'Bookings Calendar',         description: 'Appointments confirmed and logged in real time. View your full calendar at a glance.', status: 'live'        },
    { icon: 'pi pi-file-edit',  title: 'Transcripts & Recordings',  description: 'Every call transcribed and recorded. Search, review, and download on demand.',         status: 'live'        },
    { icon: 'pi pi-sliders-h',  title: 'Prompt & Knowledge Base',   description: 'Fine-tune your agent\'s persona, greeting, fallbacks, and escalation rules.',          status: 'live'        },
    { icon: 'pi pi-chart-bar',  title: 'Data Analytics',            description: 'Call volume, booking rates, duration trends — all in one live dashboard.',             status: 'coming-soon' },
    { icon: 'pi pi-heart',      title: 'Sentiment Analysis',        description: 'Understand caller mood and intent automatically, powered by OpenAI.',                  status: 'coming-soon' },
  ];

  steps: Step[] = [
    { number: '01', icon: 'pi pi-plug',       title: 'Connect Your Number',  description: 'Link your Twilio or VoIP number in under 2 minutes.'        },
    { number: '02', icon: 'pi pi-code',       title: 'Configure Your Agent', description: 'Set the greeting, system prompt, and escalation rules.'      },
    { number: '03', icon: 'pi pi-phone',      title: 'Go Live',              description: 'Your AI agent starts answering calls immediately.'           },
    { number: '04', icon: 'pi pi-chart-line', title: 'Monitor & Improve',    description: 'Review transcripts, analytics, and fine-tune over time.'     },
  ];
}
