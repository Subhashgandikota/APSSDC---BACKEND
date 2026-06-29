'use client';

import { useState, useEffect } from 'react';
import { Award, CheckCircle2, TrendingUp, BookOpen, Activity, Users, FileSpreadsheet, FileText, BrainCircuit, AlertTriangle, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [role, setRole] = useState(null);
  const [streamData, setStreamData] = useState(Array(40).fill(30));
  const [activeYear, setActiveYear] = useState('Year 2');

  useEffect(() => {
    setRole(localStorage.getItem('apexRole') || 'student');
    const interval = setInterval(() => {
      setStreamData(prev => {
        const lastVal = prev[prev.length - 1];
        const change = (Math.random() - 0.5) * 15;
        return [...prev.slice(1), Math.max(15, Math.min(85, lastVal + change))];
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  if (!role) return null;

  // Graph calculations for Admin
  const pathCoordinates = streamData.map((val, i) => `${(i / (streamData.length - 1)) * 100},${100 - val}`).join(' L ');
  const areaPath = `M 0,100 L ${pathCoordinates} L 100,100 Z`;
  const linePath = `M ${pathCoordinates}`;

  // ==========================================
  // 👑 VIEW 1: ADMIN DASHBOARD (Graph Restored)
  // ==========================================
  if (role === 'admin') {
    return (
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">System Admin Overview</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Full system metrics and real-time server monitoring.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Staff" value="142" trend="Active Accounts" color="text-indigo-600" href="/dashboard/settings" />
          <StatCard title="Total Students" value="2,845" trend="+12% this year" color="text-emerald-500" href="/dashboard/students" />
          <StatCard title="System Health" value="99.9%" trend="All systems nominal" color="text-emerald-500" />
        </div>

        {/* RESTORED: Admin Live Graph */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm overflow-hidden relative group">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-indigo-500" /> Live Cloud Traffic
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">Real-time student portal access requests</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {Math.round(streamData[streamData.length - 1] * 12)} <span className="text-sm font-medium text-slate-500">req/s</span>
              </p>
            </div>
          </div>
          <div className="h-64 w-full relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40 dark:opacity-20 text-[10px] text-slate-400 font-mono z-0">
              <div className="border-t border-slate-200 dark:border-slate-700 w-full pt-1">1000</div>
              <div className="border-t border-slate-200 dark:border-slate-700 w-full pt-1">750</div>
              <div className="border-t border-slate-200 dark:border-slate-700 w-full pt-1">500</div>
              <div className="border-t border-slate-200 dark:border-slate-700 w-full pt-1">250</div>
            </div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full relative z-10 transition-all duration-700 ease-linear">
              <defs>
                <linearGradient id="flowGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(99 102 241)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#flowGradient)" className="transition-all duration-700 ease-linear" />
              <path d={linePath} fill="none" stroke="rgb(99 102 241)" strokeWidth="0.8" className="transition-all duration-700 ease-linear" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 👨‍🏫 VIEW 2: STAFF DASHBOARD
  // ==========================================
  if (role === 'staff') {
    return (
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Faculty Launchpad</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back. Select a module below to manage your classes.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/dashboard/students" className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-lg hover:border-indigo-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Users className="w-7 h-7 text-indigo-600" /></div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">My Students</h2>
            <p className="text-sm text-slate-500">View your assigned batches and student profiles.</p>
          </Link>
          <Link href="/dashboard/results" className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-lg hover:border-emerald-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><FileSpreadsheet className="w-7 h-7 text-emerald-600" /></div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Enter Marks</h2>
            <p className="text-sm text-slate-500">Input internal and external marks for your subjects.</p>
          </Link>
          <Link href="/dashboard/reports" className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-lg hover:border-orange-500/50 transition-all duration-300">
            <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><FileText className="w-7 h-7 text-orange-600" /></div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Generate Reports</h2>
            <p className="text-sm text-slate-500">Compile class performance data and export grade sheets.</p>
          </Link>
        </div>

        <div className="bg-slate-900 dark:bg-black p-1 rounded-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-xl"></div>
          <div className="relative bg-white dark:bg-slate-950 p-6 rounded-xl border border-indigo-500/20">
            <div className="flex items-center mb-6">
              <BrainCircuit className="w-6 h-6 text-indigo-500 mr-3 animate-pulse" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">ApexGrade AI Analytics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-rose-50 dark:bg-rose-500/5 rounded-lg border border-rose-200 dark:border-rose-500/20 flex items-start">
                <AlertTriangle className="w-5 h-5 text-rose-500 mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Rahul Verma (24CSE118)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">AI predicts a <span className="font-bold text-rose-500">85% probability</span> of failing the external exam due to low internals.</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-500/5 rounded-lg border border-blue-200 dark:border-blue-500/20 flex items-start">
                <TrendingUp className="w-5 h-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Sneha Rao (24ECE088)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">AI indicates exceptional trajectory. Recommended for advanced projects.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 👨‍🎓 VIEW 3: STUDENT DASHBOARD
  // ==========================================
  const studentRecords = {
    'Year 2': [
      { subject: 'Signals and Systems', code: 'ECE201', grade: 'A', status: 'Pass' },
      { subject: 'Database Management', code: 'CSE205', grade: 'B+', status: 'Pass' }
    ],
    'Year 1': [
      { subject: 'Engineering Physics', code: 'PHY101', grade: 'O', status: 'Pass' },
      { subject: 'Calculus & Algebra', code: 'MAT101', grade: 'A+', status: 'Pass' }
    ]
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Student Academic Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back. Here is your comprehensive academic record.</p>
      </div>
      
      <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-20 -mr-20 blur-2xl"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <p className="text-indigo-200 font-medium mb-1">Cumulative CGPA</p>
            <h2 className="text-5xl font-extrabold">8.4<span className="text-xl text-indigo-300">/10</span></h2>
          </div>
          <Award className="w-20 h-20 text-indigo-300/50" />
        </div>
      </div>

      {/* RESTORED: Student Module Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
         <Link href="/dashboard/materials" className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/50 transition-colors flex items-center justify-between">
            <div className="flex items-center">
               <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg mr-4">
                 <Download className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 dark:text-white">Course Materials</h3>
                 <p className="text-sm text-slate-500">Download syllabus & lectures</p>
               </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
         </Link>

         <Link href="/dashboard" className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition-colors flex items-center justify-between">
            <div className="flex items-center">
               <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg mr-4">
                 <FileText className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-slate-900 dark:text-white">My Transcripts</h3>
                 <p className="text-sm text-slate-500">Request official documents</p>
               </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
         </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-2 gap-2">
          {['Year 1', 'Year 2', 'Year 3', 'Year 4'].map((year) => (
            <button key={year} onClick={() => setActiveYear(year)} disabled={year === 'Year 3' || year === 'Year 4'}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeYear === year ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm border border-slate-200 dark:border-slate-700' : 
                (year === 'Year 3' || year === 'Year 4') ? 'text-slate-400 opacity-50 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="p-6">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr><th className="px-6 py-4">Subject</th><th className="px-6 py-4 text-center">Grade</th><th className="px-6 py-4 text-right">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
              {studentRecords[activeYear]?.map((record, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 font-bold dark:text-white">{record.subject}</td>
                  <td className="px-6 py-4 text-center font-bold text-indigo-600">{record.grade}</td>
                  <td className="px-6 py-4 text-right text-emerald-500 font-bold">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, color, href }) {
  const CardContent = (
    <div className={`p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm ${href ? 'hover:shadow-md cursor-pointer group' : ''}`}>
      <p className="text-sm font-bold uppercase tracking-wider text-slate-400">{title}</p>
      <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{value}</p>
      <p className={`text-xs font-semibold mt-2 ${color}`}>{trend}</p>
    </div>
  );
  return href ? <Link href={href}>{CardContent}</Link> : CardContent;
}