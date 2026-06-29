'use client';

import { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AddCoursePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/dashboard/departments/manage" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Add New Course</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Append a new curriculum to the Computer Science department.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {isDone ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Course Published!</h2>
            <p className="text-slate-500 mt-2 mb-6">The curriculum is now active and accepting student enrollments.</p>
            <Link href="/dashboard/departments/manage" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium">Return to Department Manage</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Course Name</label>
                <input type="text" placeholder="e.g. B.Tech Cyber Security" required className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Course Code</label>
                <input type="text" placeholder="e.g. CS-CYB" required className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Duration (Years)</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white">
                  <option>4 Years</option>
                  <option>2 Years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Total Intakes (Capacity)</label>
                <input type="number" placeholder="e.g. 60" required className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Lead Instructor (Faculty ID)</label>
              <input type="text" placeholder="Assign primary faculty" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" />
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="flex items-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors">
                <BookOpen className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Publishing...' : 'Publish Course'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}