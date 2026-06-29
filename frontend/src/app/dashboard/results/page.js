'use client';

import { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { apiRequest } from '@/utils/api';

export default function ResultsEntry() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);

  // Load recent submissions on mount
  useEffect(() => {
    async function loadRecent() {
      try {
        const data = await apiRequest('/students');
        // Get the last 5 submissions (reverse order of creation)
        const recent = data.slice(-5).reverse().map(s => ({
          id: s.rollNo,
          sub: s.subject,
          time: new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          grade: s.grade
        }));
        setSubmissions(recent);
      } catch (err) {
        console.error(err);
      }
    }
    loadRecent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.trim();
    const rollNo = formData.get('rollNo')?.trim();
    const subject = formData.get('subject')?.trim();
    const internal = Number(formData.get('internal'));
    const external = Number(formData.get('external'));
    const marks = internal + external;

    try {
      const response = await apiRequest('/students/add', {
        method: 'POST',
        body: JSON.stringify({ name, rollNo, subject, marks })
      });

      setShowSuccess(true);
      e.target.reset();
      
      // Update local feed
      setSubmissions(prev => [
        {
          id: response.rollNo,
          sub: response.subject,
          time: 'Just now',
          grade: response.grade
        },
        ...prev.slice(0, 4)
      ]);

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit grades. Check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Results Processing</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Securely enter and publish academic grades.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 👉 LEFT SIDE: The Entry Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">New Result Entry</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/30 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-medium flex items-center">
                <AlertCircle className="w-5 h-5 text-rose-500 mr-2 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Student Name</label>
                  <input type="text" name="name" placeholder="e.g. Arjun Reddy" required
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Student ID (Roll No.)</label>
                  <input type="text" name="rollNo" placeholder="e.g. 24ECE101" required
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject / Course Name</label>
                  <input type="text" name="subject" placeholder="e.g. Database Management" required
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Internal (40)</label>
                    <input type="number" name="internal" min="0" max="40" placeholder="0-40" required
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">External (60)</label>
                    <input type="number" name="external" min="0" max="60" placeholder="0-60" required
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Faculty Remarks (Optional)</label>
                <textarea rows="3" placeholder="Enter any specific notes about the student's performance..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  <AlertCircle className="inline w-4 h-4 mr-1 mb-0.5" />
                  Double-check entries before saving.
                </span>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : showSuccess ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-in zoom-in duration-300" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{isSubmitting ? 'Saving...' : showSuccess ? 'Saved!' : 'Submit Grades'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 👉 RIGHT SIDE: Recent Activity Feed */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 sticky top-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">Recent Submissions</h3>
            
            <div className="space-y-6">
              {submissions.length > 0 ? (
                submissions.map((log, i) => (
                  <div key={i} className="flex items-start space-x-4 animate-in slide-in-from-bottom-2 duration-300">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20 flex-shrink-0">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">{log.grade}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{log.id}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{log.sub}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{log.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">No recent submissions found.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}