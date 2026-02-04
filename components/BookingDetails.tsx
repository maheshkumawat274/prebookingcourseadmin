
import React, { useState } from 'react';
import { Search, MoreHorizontal, CheckCircle, Clock, ExternalLink, Trash2 } from 'lucide-react';
import { MOCK_BOOKINGS } from '../constants';
import { BookingStatus, Booking } from '../types';

const BookingDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(b => b.id !== id));
      setActiveMenuId(null);
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.gatewayRef.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500 min-h-[500px]">
      <div className="p-4 md:p-6 border-b border-slate-100">
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, email or ref..." 
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User Details</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Gateway Ref</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Amount</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900">{booking.userName}</span>
                      <span className="text-xs text-slate-500">Booked on {booking.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-700 font-medium">{booking.email}</span>
                      <span className="text-xs text-slate-400">{booking.mobile}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      booking.status === BookingStatus.PAID 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {booking.status === BookingStatus.PAID ? (
                        <CheckCircle size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                      <span>{booking.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-mono text-slate-500">
                      <span>{booking.gatewayRef}</span>
                      <ExternalLink size={12} className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-indigo-500" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-slate-900">
                      ${booking.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block text-left">
                      <button 
                        onClick={() => setActiveMenuId(activeMenuId === booking.id ? null : booking.id)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200 transition-all focus:ring-2 focus:ring-slate-300"
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {activeMenuId === booking.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setActiveMenuId(null)}
                          ></div>
                          <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-100">
                            <button 
                              onClick={() => handleDelete(booking.id)}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-500">
                  <div className="flex flex-col items-center">
                    <p className="italic mb-1">No bookings found matching your search.</p>
                    <button 
                      onClick={() => {setSearchTerm(''); setBookings(MOCK_BOOKINGS);}}
                      className="text-indigo-600 text-sm font-semibold hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
        <p className="text-xs text-slate-500 font-medium">
          Showing <span className="text-slate-900">{filteredBookings.length}</span> of {bookings.length} records
        </p>
        <div className="flex items-center space-x-1">
          <button className="px-3 py-1 text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 transition-colors">
            1
          </button>
          <button className="px-3 py-1 text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
