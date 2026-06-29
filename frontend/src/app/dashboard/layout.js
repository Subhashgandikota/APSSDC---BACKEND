'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  LayoutDashboard, Users, GraduationCap, Settings, LogOut, 
  Sun, Moon, BookOpen, FileSpreadsheet, UserCircle, 
  Building2, UserPlus, Bell
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState('student');
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedRole = localStorage.getItem('apexRole');
    if (savedRole) setRole(savedRole);
  }, []);

  const adminNav = [
    { name: 'System Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Departments', href: '/dashboard/departments', icon: Building2 },
    { name: 'Add Student', href: '/dashboard/students/add', icon: UserPlus },
    { name: 'All Students', href: '/dashboard/students', icon: Users },
    { name: 'System Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const staffNav = [
    { name: 'Class Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Students', href: '/dashboard/students', icon: Users },
    { name: 'Enter Marks', href: '/dashboard/results', icon: FileSpreadsheet },
    { name: 'Generate Reports', href: '/dashboard/reports', icon: BookOpen }, 
  ];

  const studentNav = [
    { name: 'My Profile', href: '/dashboard', icon: UserCircle },
    { name: 'Course Materials', href: '/dashboard/materials', icon: BookOpen },
  ];

  const navItems = role === 'admin' ? adminNav : role === 'staff' ? staffNav : studentNav;

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* LEFT SIDEBAR (Hidden during PDF generation using print:hidden) */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-col hidden md:flex z-10 shadow-lg print:hidden">
        <div className="h-20 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 shadow-md ${
            role === 'admin' ? 'bg-indigo-600 shadow-indigo-600/20' : 
            role === 'staff' ? 'bg-emerald-600 shadow-emerald-600/20' : 
            'bg-orange-500 shadow-orange-500/20'
          }`}>
             <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">ApexGrade</h2>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{role} PORTAL</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto hidden-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm border border-indigo-100 dark:border-indigo-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 font-medium'}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Link href="/" onClick={() => { localStorage.setItem('lastApexRole', localStorage.getItem('apexRole')); localStorage.removeItem('apexRole'); }} className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Secure Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* HEADER (print:hidden) */}
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-end px-8 z-20 space-x-4 print:hidden">
          
          {/* 🔔 1. REAL-TIME NOTIFICATION CENTER */}
          {mounted && (
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-top-4 z-50">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">System Notifications</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">System Update</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Cloud server backup completed successfully at 02:00 AM.</p>
                    </div>
                    {role === 'staff' && (
                      <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-xl">
                        <p className="text-xs font-bold text-rose-600 dark:text-rose-400">Action Required</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Database Management marks are due in 48 hours.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {mounted && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
        </header>
        
        {/* Render child pages natively or perfectly sized for paper during printing */}
        <div className="flex-1 overflow-y-auto p-8 relative print:p-0 print:overflow-visible">
          {children}
        </div>
      </main>
    </div>
  );
}