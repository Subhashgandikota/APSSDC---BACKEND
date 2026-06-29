'use client';

import { useState, useEffect } from 'react';
import { User, Bell, Shield, Key, Users } from 'lucide-react';

export default function SettingsPage() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem('apexRole') || 'student');
  }, []);

  if (!role) return <div className="p-8 text-slate-500">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">System Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account and application preferences.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Profile Section */}
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile Information</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <input type="text" defaultValue={role === 'student' ? 'Arjun Reddy' : 'Apex Admin'} 
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address / ID</label>
              <input type="text" defaultValue={role === 'student' ? '24ECE101' : 'admin@apexgrade.edu'} 
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* 👑 ADMIN ONLY: User Password Management */}
        {role === 'admin' && (
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-indigo-50/50 dark:bg-indigo-500/5">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Manage User Passwords</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Admin Privileges: Reset passwords for staff and students.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="text" placeholder="Enter Staff or Student ID..." 
                className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
              />
              <input type="text" placeholder="Enter New Password..." 
                className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-900 dark:text-white"
              />
              <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                Force Reset
              </button>
            </div>
          </div>
        )}

        {/* Security Section (Visible to everyone) */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">My Security</h2>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/50">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg">
                <Key className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">My Password</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Update your personal password</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Update
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}