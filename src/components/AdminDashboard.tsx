import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { LogOut, Trash2, CheckCircle, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const { user, isAdmin, logout, token, accessToken } = useAuth();
  const [data, setData] = useState<any>({ appointments: [], messages: [], reviews: [] });
  const [driveFiles, setDriveFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin && token) {
      fetch('/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(console.error);
    }
  }, [isAdmin, token]);

  useEffect(() => {
    if (isAdmin && accessToken) {
      fetch('https://www.googleapis.com/drive/v3/files?pageSize=10&fields=files(id,name,mimeType,webViewLink)', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
      .then(res => res.json())
      .then(d => {
        if (d.files) {
          setDriveFiles(d.files);
        }
      })
      .catch(console.error);
    }
  }, [isAdmin, accessToken]);

  const updateAppointment = async (id: number, status: string) => {
    try {
      await fetch(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      setData((prev: any) => ({
        ...prev,
        appointments: prev.appointments.map((a: any) => a.id === id ? { ...a, status } : a)
      }));
    } catch (e) { console.error(e); }
  };

  const approveReview = async (id: number, isApproved: boolean) => {
    try {
      await fetch(`/api/admin/reviews/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ isApproved })
      });
      setData((prev: any) => ({
        ...prev,
        reviews: prev.reviews.map((r: any) => r.id === id ? { ...r, isApproved } : r)
      }));
    } catch (e) { console.error(e); }
  };

  const deleteReview = async (id: number) => {
    try {
      await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setData((prev: any) => ({
        ...prev,
        reviews: prev.reviews.filter((r: any) => r.id !== id)
      }));
    } catch (e) { console.error(e); }
  };

  const exportData = () => {
    // Basic CSV export for appointments
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Name,Phone,Date,Status\n"
      + data.appointments.map((a: any) => `${a.id},${a.name},${a.phone},${a.date},${a.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "appointments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAdmin) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
        <p className="text-slate-600 mb-4">You do not have permission to view this page.</p>
        <button onClick={logout} className="px-4 py-2 bg-slate-200 rounded text-slate-800 text-sm font-bold">Sign Out</button>
      </div>
    );
  }

  if (loading) return <div className="p-8 text-center text-slate-500">Loading admin data...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-serif font-bold text-ayur-dark-green">Admin Dashboard</h2>
        <div className="flex gap-2">
          <button onClick={exportData} className="px-3 py-1.5 bg-green-50 text-green-700 rounded border border-green-200 text-xs font-bold hover:bg-green-100 flex items-center gap-1">
            <CheckCircle size={14} /> Export CSV
          </button>
          <button onClick={logout} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded border border-slate-200 text-xs font-bold hover:bg-slate-200 flex items-center gap-1">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">Google Drive Files</h3>
        <div className="overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 uppercase text-[10px] text-slate-800 border-b border-slate-100">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2 text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {driveFiles.map((f: any) => (
                <tr key={f.id}>
                  <td className="px-3 py-2 font-medium flex items-center gap-2">
                    <FileText size={14} className="text-blue-500" />
                    {f.name}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <a href={f.webViewLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
                  </td>
                </tr>
              ))}
              {driveFiles.length === 0 && <tr><td colSpan={2} className="text-center py-4 text-slate-400">No Drive files found or token missing.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">Appointments</h3>
        <div className="overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 uppercase text-[10px] text-slate-800 border-b border-slate-100">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.appointments.map((a: any) => (
                <tr key={a.id}>
                  <td className="px-3 py-2 font-medium">{a.name}</td>
                  <td className="px-3 py-2">{a.phone}</td>
                  <td className="px-3 py-2">{a.date}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${a.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    {a.status === 'Pending' && (
                      <button onClick={() => updateAppointment(a.id, 'Completed')} className="text-xs text-green-600 font-bold hover:underline">Mark Completed</button>
                    )}
                  </td>
                </tr>
              ))}
              {data.appointments.length === 0 && <tr><td colSpan={5} className="text-center py-4 text-slate-400">No appointments found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-slate-800">Reviews</h3>
          <button onClick={() => {
            const name = prompt("Enter reviewer name:");
            if (!name) return;
            const text = prompt("Enter review text:");
            if (!text) return;
            const rating = parseInt(prompt("Enter rating (1-5):") || "5");
            fetch('/api/admin/reviews', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify({ name, text, rating, isApproved: true })
            }).then(() => {
              // Reload data
              fetch('/api/admin/dashboard', { headers: { 'Authorization': `Bearer ${token}` } })
                .then(res => res.json())
                .then(d => setData(d));
            });
          }} className="px-3 py-1 bg-ayur-green text-white rounded text-xs font-bold hover:bg-ayur-dark-green">
            + Add Review
          </button>
        </div>
        <div className="overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 uppercase text-[10px] text-slate-800 border-b border-slate-100">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Text</th>
                <th className="px-3 py-2">Rating</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.reviews.map((r: any) => (
                <tr key={r.id}>
                  <td className="px-3 py-2 font-medium">{r.name}</td>
                  <td className="px-3 py-2">{r.text}</td>
                  <td className="px-3 py-2">{r.rating}/5</td>
                  <td className="px-3 py-2">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.isApproved ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                      {r.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right flex justify-end gap-2">
                    {!r.isApproved && (
                      <button onClick={() => approveReview(r.id, true)} className="text-green-600 hover:text-green-800"><CheckCircle size={16} /></button>
                    )}
                    <button onClick={() => deleteReview(r.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {data.reviews.length === 0 && <tr><td colSpan={6} className="text-center py-4 text-slate-400">No reviews found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
