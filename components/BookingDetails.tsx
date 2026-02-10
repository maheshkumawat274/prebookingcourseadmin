import React, { useEffect, useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Trash2
} from "lucide-react";
import { Booking } from "../types";
import { API_BASE_URL } from "../src/config/api";

const BookingDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔹 LOAD BOOKINGS */
  const fetchBookings = () => {
    fetch(`${API_BASE_URL}/list_users.php`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBookings(data.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* 🗑 DELETE */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this booking?")) return;

    const formData = new FormData();
    formData.append("id", id);

    const res = await fetch(`${API_BASE_URL}/delete_user.php`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      setBookings(prev => prev.filter(b => b.id !== id));
      alert("Deleted");
    } else {
      alert("Delete failed");
    }
  };

  /* 🔍 SEARCH */
  const filteredBookings = bookings.filter(b =>
    b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.cfPaymentId ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-10 text-center text-slate-500">Loading…</div>;
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

      {/* SEARCH */}
      <div className="p-4 border-b">
        <div className="relative w-96">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            placeholder="Search name, email, order id or payment id"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">CF Payment ID</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredBookings.map(b => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-semibold">{b.userName}</div>
                  <div className="text-xs text-slate-500">{b.date}</div>
                </td>

                <td className="px-6 py-4">
                  <div>{b.email || "—"}</div>
                  <div className="text-xs text-slate-400">{b.mobile}</div>
                </td>

                <td className="px-6 py-4">
                  {b.status === "PAID" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700">
                      <CheckCircle size={14} /> PAID
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-red-50 text-red-700">
                      <XCircle size={14} /> FAILED
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 font-mono text-xs">
                  {b.orderId}
                </td>

                <td className="px-6 py-4 font-mono text-xs text-slate-600">
                  {b.cfPaymentId || "—"}
                </td>

                <td className="px-6 py-4 text-right font-bold">
                  ₹{b.amount}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="p-2 rounded hover:bg-red-50 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t text-xs text-slate-500">
        Showing <b>{filteredBookings.length}</b> of {bookings.length}
      </div>
    </div>
  );
};

export default BookingDetails;
