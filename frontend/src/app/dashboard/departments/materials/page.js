'use client';

import { FileText, Download, PlayCircle, BookOpen } from 'lucide-react';

export default function MaterialsPage() {
  const materials = [
    { type: 'pdf', title: 'Signals & Systems Syllabus', date: 'Aug 14', icon: FileText, color: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' },
    { type: 'video', title: 'Lecture 01: Fourier Transforms', date: 'Aug 16', icon: PlayCircle, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' },
    { type: 'notes', title: 'Lab Assignment 1 Guide', date: 'Aug 18', icon: BookOpen, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Course Materials</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Access lecture notes, assignments, and video recordings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {materials.map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Posted on {item.date}</p>
            
            <button className="w-full py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 flex justify-center items-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors">
               <Download className="w-4 h-4 mr-2" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}