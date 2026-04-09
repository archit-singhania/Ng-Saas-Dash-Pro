import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

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
  imports: [CommonModule, CardModule, ButtonModule, BadgeModule, DialogModule, TagModule],
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

  get currentMonthLabel(): string {
    return new Date(this.viewYear(), this.viewMonth(), 1)
      .toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  // Mock appointment data keyed by YYYY-MM-DD
  private mockAppointments: Record<string, Appointment[]> = this.generateMockData();

  private generateMockData(): Record<string, Appointment[]> {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');

    const pad = (n: number) => String(n).padStart(2, '0');
    const data: Record<string, Appointment[]> = {};

    const entries: [number, Appointment[]][] = [
      [2, [
        { id: 1, name: 'Priya Sharma', phone: '+91 98765 43210', time: '10:00 AM', type: 'Booking', status: 'Confirmed', notes: 'Talk to human agent' },
        { id: 2, name: 'Rahul Mehta', phone: '+91 87654 32109', time: '11:30 AM', type: 'Follow-up', status: 'Confirmed', notes: 'Talk to human agent' },
      ]],
      [5, [
        { id: 3, name: 'Anita Patel', phone: '+91 76543 21098', time: '9:00 AM', type: 'General', status: 'Pending', notes: 'Talk to human agent' },
      ]],
      [8, [
        { id: 4, name: 'Vikram Nair', phone: '+91 65432 10987', time: '2:00 PM', type: 'Booking', status: 'Confirmed', notes: 'Talk to human agent' },
        { id: 5, name: 'Sunita Rao', phone: '+91 54321 09876', time: '3:30 PM', type: 'General', status: 'Confirmed', notes: 'Talk to human agent' },
        { id: 6, name: 'Arjun Kapoor', phone: '+91 43210 98765', time: '4:45 PM', type: 'Booking', status: 'Pending', notes: 'Talk to human agent' },
      ]],
      [12, [
        { id: 7, name: 'Meera Iyer', phone: '+91 32109 87654', time: '11:00 AM', type: 'Follow-up', status: 'Cancelled', notes: 'Talk to human agent' },
      ]],
      [15, [
        { id: 8, name: 'Deepak Singh', phone: '+91 21098 76543', time: '9:30 AM', type: 'General', status: 'Confirmed', notes: 'Talk to human agent' },
        { id: 9, name: 'Kavya Reddy', phone: '+91 10987 65432', time: '10:45 AM', type: 'Booking', status: 'Confirmed', notes: 'Talk to human agent' },
      ]],
      [20, [
        { id: 10, name: 'Sanjay Gupta', phone: '+91 99887 76655', time: '3:00 PM', type: 'General', status: 'Confirmed', notes: 'Talk to human agent' },
      ]],
      [23, [
        { id: 11, name: 'Pooja Bhatia', phone: '+91 88776 65544', time: '12:00 PM', type: 'Follow-up', status: 'Pending', notes: 'Talk to human agent' },
        { id: 12, name: 'Manish Tiwari', phone: '+91 77665 54433', time: '2:30 PM', type: 'General', status: 'Confirmed', notes: 'Talk to human agent' },
      ]],
      [27, [
        { id: 13, name: 'Neha Joshi', phone: '+91 66554 43322', time: '10:00 AM', type: 'Follow-up', status: 'Confirmed', notes: 'Talk to human agent' },
      ]],
    ];

    entries.forEach(([day, appts]) => {
      data[`${y}-${m}-${pad(day)}`] = appts;
    });

    return data;
  }

  get calendarCells(): CalendarCell[] {
    const year = this.viewYear();
    const month = this.viewMonth();
    const today = new Date();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = firstDay.getDay(); // 0=Sun
    const cells: CalendarCell[] = [];

    // Prev month padding
    for (let i = startPad - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      cells.push(this.makeCell(d, false, today));
    }

    // Current month days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      cells.push(this.makeCell(date, true, today));
    }

    // Next month padding to complete grid (max 42 cells)
    let next = 1;
    while (cells.length < 42) {
      const d = new Date(year, month + 1, next++);
      cells.push(this.makeCell(d, false, today));
    }

    return cells;
  }

  private makeCell(date: Date, isCurrentMonth: boolean, today: Date): CalendarCell {
    const key = this.dateKey(date);
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    return {
      key,
      date,
      isCurrentMonth,
      isToday,
      appointments: isCurrentMonth ? (this.mockAppointments[key] ?? []) : [],
    };
  }

  private dateKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
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
    this.modalHeader = cell.date.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    this.showModal = true;
  }

  getApptSeverity(status: string): 'success' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'Confirmed': return 'success';
      case 'Pending':   return 'warn';
      case 'Cancelled': return 'danger';
      default:          return 'secondary';
    }
  }
}
