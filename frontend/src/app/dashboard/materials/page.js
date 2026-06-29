'use client';

import { FileText, Download, PlayCircle, BookOpen, FolderArchive } from 'lucide-react';

export default function MaterialsPage() {
  const materials = [
    { type: 'pdf', title: 'Signals & Systems Syllabus', unit: 'Overview', date: 'Aug 14', icon: FileText, color: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20' },
    { type: 'video', title: 'Lecture 01: Fourier Transforms', unit: 'Unit 1', date: 'Aug 16', icon: PlayCircle, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20' },
    { type: 'video', title: 'Lecture 02: Laplace Analysis', unit: 'Unit 1', date: 'Aug 18', icon: PlayCircle, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20' },
    { type: 'notes', title: 'Lab Assignment 1 Guide', unit: 'Labs', date: 'Aug 20', icon: BookOpen, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' },
    { type: 'zip', title: 'Python DSP Code Examples', unit: 'Labs', date: 'Aug 22', icon: FolderArchive, color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Course Materials</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Access lecture notes, assignments, and video recordings.</p>
        </div>
        
        {/* Course Filter Dropdown */}
        <select className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
          <option>Signals and Systems (ECE201)</option>
          <option>Database Management (CSE205)</option>
          <option>Digital Logic Design (ECE203)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between">
            
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  {item.unit}
                </span>
              </div>
              
              <h3 className="font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Posted on {item.date}</p>
            </div>
            
            <button className="w-full py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 flex justify-center items-center group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all active:scale-95">
               <Download className="w-4 h-4 mr-2" /> Download Resource
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}