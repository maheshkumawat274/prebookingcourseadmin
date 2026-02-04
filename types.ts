import React from 'react';

export enum BookingStatus {
  PAID = 'Paid',
  PENDING = 'Pending'
}

export interface Booking {
  id: string;
  userName: string;
  mobile: string;
  email: string;
  amount: number;
  status: BookingStatus;
  gatewayRef: string;
  date: string;
}

export interface StatData {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  // Fix: Added React import to satisfy React.ReactNode type declaration
  icon: React.ReactNode;
}

export type ViewType = 'dashboard' | 'bookings';