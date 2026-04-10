import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';

export interface Appointment {
  id: number;
  name: string;
  phone: string;
  time: string;
  type: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  notes: string;
}

export interface CalendarCell {
  key: string;
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: Appointment[];
}

@Component({
  selector: 'app-bookings',
  imports: [CardModule, ButtonModule, BadgeModule, DialogModule, TagModule, AvatarModule, ChipModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss',
})
export class Bookings {
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showModal = false;
  selectedDayAppointments: Appointment[] = [];
  modalHeader = '';

  private viewYear = signal(new Date().getFullYear());
  private viewMonth = signal(new Date().getMonth());

  private appointments: Appointment[] = [
    { id: 1,  name: 'Priya Sharma',   phone: '+91 98765 43210', time: '10:00 AM', type: 'Booking',  status: 'Confirmed', notes: 'Talk to human agent'       },
    { id: 2,  name: 'Arjun Mehta',    phone: '+91 87654 32109', time: '11:30 AM', type: 'Follow-up',     status: 'Confirmed', notes: 'Talk to human agent'    },
    { id: 3,  name: 'Sneha Rao',      phone: '+91 76543 21098', time: '02:00 PM', type: 'Visitation',  status: 'Pending',   notes: 'Talk to human agent' },
    { id: 4,  name: 'Kiran Nair',     phone: '+91 65432 10987', time: '03:30 PM', type: 'Follow-up',      status: 'Confirmed', notes: 'Talk to human agent'   },
    { id: 5,  name: 'Ananya Das',     phone: '+91 54321 09876', time: '09:00 AM', type: 'Follow-up',     status: 'Confirmed', notes: 'Talk to human agent'   },
    { id: 6,  name: 'Rohit Verma',    phone: '+91 43210 98765', time: '10:30 AM', type: 'Booking',  status: 'Cancelled', notes: 'Talk to human agent'     },
    { id: 7,  name: 'Meera Pillai',   phone: '+91 32109 87654', time: '01:00 PM', type: 'Follow-up',     status: 'Confirmed', notes: 'Talk to human agent'  },
    { id: 8,  name: 'Suresh Kumar',   phone: '+91 21098 76543', time: '04:00 PM', type: 'Visitation',  status: 'Pending',   notes: 'Talk to human agent'        },
    { id: 9,  name: 'Deepa Iyer',     phone: '+91 10987 65432', time: '11:00 AM', type: 'Visitation',      status: 'Confirmed', notes:'Talk to human agent'   },
    { id: 10, name: 'Vikram Singh',   phone: '+91 99887 76655', time: '02:30 PM', type: 'Booking',  status: 'Confirmed', notes: 'Talk to human agent'     },
    { id: 11, name: 'Pooja Bansal',   phone: '+91 88776 65544', time: '09:30 AM', type: 'Follow-up',     status: 'Confirmed', notes: 'Talk to human agent'  },
    { id: 12, name: 'Rahul Gupta',    phone: '+91 77665 54433', time: '12:00 PM', type: 'Visitation',     status: 'Confirmed', notes: 'Talk to human agent'    },
  ];

  private appointmentsByDate: Record<string, Appointment[]> = {};

  constructor() {
    const today = new Date();
    const dates = [
      new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15),
    ];
    this.appointments.forEach((appt, i) => {
      const key = this.dateKey(dates[i]);
      if (!this.appointmentsByDate[key]) this.appointmentsByDate[key] = [];
      this.appointmentsByDate[key].push(appt);
    });
  }

  get currentMonthLabel(): string {
    return new Date(this.viewYear(), this.viewMonth(), 1)
      .toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  }

  get calendarCells(): CalendarCell[] {
    const year = this.viewYear();
    const month = this.viewMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();
    const today = new Date();
    const cells: CalendarCell[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevDays - i);
      cells.push({ key: this.dateKey(date), date, isCurrentMonth: false, isToday: false, appointments: [] });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const key = this.dateKey(date);
      cells.push({
        key,
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        appointments: this.appointmentsByDate[key] ?? []
      });
    }
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      cells.push({ key: this.dateKey(date), date, isCurrentMonth: false, isToday: false, appointments: [] });
    }
    return cells;
  }

  prevMonth(): void {
    if (this.viewMonth() === 0) {
      this.viewMonth.set(11);
      this.viewYear.update(y => y - 1);
    } else {
      this.viewMonth.update(m => m - 1);
    }
  }

  nextMonth(): void {
    if (this.viewMonth() === 11) {
      this.viewMonth.set(0);
      this.viewYear.update(y => y + 1);
    } else {
      this.viewMonth.update(m => m + 1);
    }
  }

  openDayModal(cell: CalendarCell): void {
    this.selectedDayAppointments = cell.appointments;
    this.modalHeader = cell.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    this.showModal = true;
  }

  getApptSeverity(status: string): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'Confirmed': return 'success';
      case 'Pending':   return 'warn';
      default:          return 'danger';
    }
  }

  private dateKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }
}
