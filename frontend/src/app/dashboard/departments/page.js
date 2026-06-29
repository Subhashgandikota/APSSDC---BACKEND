'use client';

import { useState, useEffect } from 'react';
import { Building2, TrendingUp, Activity, Users } from 'lucide-react';
import Link from 'next/link'; // 👈 NEW: We imported Next.js Link here!

export default function DepartmentsHub() {
  // 🌊 LIVE STREAM STATE 
  // We stagger the visual heights (85, 65, 45, 25) so they form beautifully layered mountain peaks
  const [streamCS, setStreamCS] = useState(Array(15).fill(85));
  const [streamEC, setStreamEC] = useState(Array(15).fill(65));
  const [streamME, setStreamME] = useState(Array(15).fill(45));
  const [streamCE, setStreamCE] = useState(Array(15).fill(25));

  useEffect(() => {
    const generateNext = (prev, base) => {
      const last = prev[prev.length - 1];
      const change = (Math.random() - 0.5) * 8; // Smooth, gentle fluctuations
      const newVal = Math.max(base - 12, Math.min(base + 12, last + change)); 
      return [...prev.slice(1), newVal];
    };

    const interval = setInterval(() => {
      setStreamCS(p => generateNext(p, 85));
      setStreamEC(p => generateNext(p, 65));
      setStreamME(p => generateNext(p, 45));
      setStreamCE(p => generateNext(p, 25));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // ⛰️ THE MAGIC BEZIER CURVE GENERATOR
  // This turns rigid data points into perfectly smooth, flowing mountain waves
  const makeSmoothPath = (data) => {
    const step = 100 / (data.length - 1);
    let path = `M 0,${100 - data[0]}`;
    for (let i = 1; i < data.length; i++) {
      const prevX = (i - 1) * step;
      const currX = i * step;
      const prevY = 100 - data[i - 1];
      const currY = 100 - data[i];
      const cpX = (prevX + currX) / 2;
      // C = Cubic Bezier Curve (Control Point 1, Control Point 2, End Point)
      path += ` C ${cpX},${prevY} ${cpX},${currY} ${currX},${currY}`;
    }
    return path;
  };

  const departments = [
    { name: 'Computer Science', head: 'Dr. Alan Turing', courses: ['B.Tech CSE', 'B.Tech AI'], students: 1240, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    { name: 'Electronics', head: 'Dr. Ada Lovelace', courses: ['B.Tech ECE', 'B.Tech VLSI'], students: 850, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-500/10' },
    { name: 'Mechanical', head: 'Dr. Henry Ford', courses: ['B.Tech ME', 'M.Tech Thermal'], students: 620, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-500/10' },
    { name: 'Civil Eng', head: 'Dr. Karl Terzaghi', courses: ['B.Tech CE', 'M.Tech Structural'], students: 480, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Departments & Courses</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time academic telemetry and faculty management.</p>
        </div>
        {/* 👈 UPDATED: This is now a Link that routes to your new Add page */}
        <Link href="/dashboard/departments/add" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-sm hidden sm:block">
          + Add Department
        </Link>
      </div>

      {/* ⛰️ SMOOTH FLOWING MOUNTAIN GRAPH */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm overflow-hidden">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Departmental Ascent (CGPA)</h2>
          </div>
          
          <div className="hidden sm:flex space-x-4 text-xs font-bold">
             <span className="text-indigo-600 dark:text-indigo-400">CS: {(streamCS[14] / 10 + 0.5).toFixed(2)}</span>
             <span className="text-purple-600 dark:text-purple-400">EC: {(streamEC[14] / 10 + 2.0).toFixed(2)}</span>
             <span className="text-pink-600 dark:text-pink-400">ME: {(streamME[14] / 10 + 3.1).toFixed(2)}</span>
             <span className="text-amber-500 dark:text-amber-400">CE: {(streamCE[14] / 10 + 4.3).toFixed(2)}</span>
          </div>
        </div>

        {/* SVG Graph Container */}
        <div className="h-72 w-full relative border-b border-slate-100 dark:border-slate-800/50">
          
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40 dark:opacity-20 text-[10px] text-slate-400 font-mono z-0">
            <div className="border-t border-slate-200 dark:border-slate-700 w-full pt-1">10.0</div>
            <div className="border-t border-slate-200 dark:border-slate-700 w-full pt-1">7.5</div>
            <div className="border-t border-slate-200 dark:border-slate-700 w-full pt-1">5.0</div>
            <div className="border-t border-slate-200 dark:border-slate-700 w-full pt-1">2.5</div>
          </div>

          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full relative z-10 overflow-visible">
            
            {/* Gradients for the Mountain Fills */}
            <defs>
              <linearGradient id="gradCS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgb(79 70 229)" stopOpacity="0.4" /><stop offset="100%" stopColor="rgb(79 70 229)" stopOpacity="0.0" /></linearGradient>
              <linearGradient id="gradEC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgb(147 51 234)" stopOpacity="0.4" /><stop offset="100%" stopColor="rgb(147 51 234)" stopOpacity="0.0" /></linearGradient>
              <linearGradient id="gradME" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgb(219 39 119)" stopOpacity="0.4" /><stop offset="100%" stopColor="rgb(219 39 119)" stopOpacity="0.0" /></linearGradient>
              <linearGradient id="gradCE" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgb(245 158 11)" stopOpacity="0.4" /><stop offset="100%" stopColor="rgb(245 158 11)" stopOpacity="0.0" /></linearGradient>
            </defs>

            {/* Layer 1: Civil (Amber) */}
            <path d={`${makeSmoothPath(streamCE)} L 100,100 L 0,100 Z`} fill="url(#gradCE)" className="transition-all duration-1000 ease-linear" />
            <path d={makeSmoothPath(streamCE)} fill="none" stroke="rgb(245 158 11)" strokeWidth="1.2" className="transition-all duration-1000 ease-linear drop-shadow-md" />
            
            {/* Layer 2: Mechanical (Pink) */}
            <path d={`${makeSmoothPath(streamME)} L 100,100 L 0,100 Z`} fill="url(#gradME)" className="transition-all duration-1000 ease-linear" />
            <path d={makeSmoothPath(streamME)} fill="none" stroke="rgb(219 39 119)" strokeWidth="1.2" className="transition-all duration-1000 ease-linear drop-shadow-md" />

            {/* Layer 3: Electronics (Purple) */}
            <path d={`${makeSmoothPath(streamEC)} L 100,100 L 0,100 Z`} fill="url(#gradEC)" className="transition-all duration-1000 ease-linear" />
            <path d={makeSmoothPath(streamEC)} fill="none" stroke="rgb(147 51 234)" strokeWidth="1.2" className="transition-all duration-1000 ease-linear drop-shadow-md" />

            {/* Layer 4: Computer Science (Indigo) */}
            <path d={`${makeSmoothPath(streamCS)} L 100,100 L 0,100 Z`} fill="url(#gradCS)" className="transition-all duration-1000 ease-linear" />
            <path d={makeSmoothPath(streamCS)} fill="none" stroke="rgb(79 70 229)" strokeWidth="1.5" className="transition-all duration-1000 ease-linear drop-shadow-md" />
          </svg>
        </div>
      </div>

      {/* 🏛️ DEPARTMENTS DIRECTORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-3 rounded-xl ${dept.bg} ${dept.color}`}>
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{dept.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Head: {dept.head}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Offered Courses</p>
              <div className="flex flex-wrap gap-2">
                {dept.courses.map((course, cIdx) => (
                  <span key={cIdx} className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700">
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50 text-sm">
              <span className="flex items-center font-medium text-slate-600 dark:text-slate-400">
                <Users className="w-4 h-4 mr-1.5" /> {dept.students} Enrolled
              </span>
              {/* 👈 UPDATED: This is now a Link that routes to your new Manage page */}
              <Link href="/dashboard/departments/manage" className={`${dept.color} font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center`}>
                Manage <TrendingUp className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}