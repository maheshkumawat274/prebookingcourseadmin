
import React from 'react';
import { LayoutDashboard, Users, CreditCard, Calendar } from 'lucide-react';
import { Booking, BookingStatus } from './types';

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    userName: 'John Doe',
    mobile: '+1 (555) 001-2345',
    email: 'john.doe@example.com',
    amount: 199.99,
    status: BookingStatus.PAID,
    gatewayRef: 'PAY-8273615',
    date: '2024-05-20'
  },
  {
    id: '2',
    userName: 'Sarah Jenkins',
    mobile: '+1 (555) 002-3456',
    email: 's.jenkins@testmail.com',
    amount: 149.00,
    status: BookingStatus.PENDING,
    gatewayRef: 'PAY-9102834',
    date: '2024-05-20'
  },
  {
    id: '3',
    userName: 'Michael Smith',
    mobile: '+1 (555) 003-4567',
    email: 'msmith_dev@outlook.com',
    amount: 299.00,
    status: BookingStatus.PAID,
    gatewayRef: 'PAY-1122334',
    date: '2024-05-19'
  },
  {
    id: '4',
    userName: 'Emily Blunt',
    mobile: '+1 (555) 004-5678',
    email: 'emily.blunt@work.com',
    amount: 199.99,
    status: BookingStatus.PAID,
    gatewayRef: 'PAY-5566778',
    date: '2024-05-18'
  },
  {
    id: '5',
    userName: 'Robert Wilson',
    mobile: '+1 (555) 005-6789',
    email: 'rwilson@company.io',
    amount: 149.00,
    status: BookingStatus.PENDING,
    gatewayRef: 'PAY-9900112',
    date: '2024-05-18'
  },
  {
    id: '6',
    userName: 'Alice Cooper',
    mobile: '+1 (555) 006-7890',
    email: 'alice.c@gmail.com',
    amount: 399.00,
    status: BookingStatus.PAID,
    gatewayRef: 'PAY-4433221',
    date: '2024-05-17'
  }
];

export const CHART_DATA = [
  { name: 'Mon', bookings: 12, revenue: 1200 },
  { name: 'Tue', bookings: 19, revenue: 2100 },
  { name: 'Wed', bookings: 15, revenue: 1800 },
  { name: 'Thu', bookings: 22, revenue: 2800 },
  { name: 'Fri', bookings: 30, revenue: 4200 },
  { name: 'Sat', bookings: 25, revenue: 3500 },
  { name: 'Sun', bookings: 18, revenue: 2400 },
];
