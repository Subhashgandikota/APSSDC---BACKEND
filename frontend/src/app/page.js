'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Cloud, Server, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/utils/api';

export default function LoginPage() {
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const router = useRouter(); 

  useEffect(() => {
    setMounted(true);
    // 👈 NEW: Check if they logged in previously, and move the cursor to that tab!
    const previousRole = localStorage.getItem('lastApexRole');
    if (previousRole) {
      setRole(previousRole);
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Theme Toggle Button */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all shadow-lg"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      )}

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 border-r border-slate-300 dark:border-slate-800/50 transition-colors duration-300">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10 text-center space-y-6 max-w-md">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white dark:bg-indigo-500/10 rounded-2xl border border-slate-200 dark:border-indigo-500/20 backdrop-blur-md shadow-xl">
              <Cloud className="w-16 h-16 text-indigo-600 dark:text-indigo-500" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 dark:bg-gradient-to-r dark:from-white dark:to-slate-400 dark:bg-clip-text dark:text-transparent">
            ApexGrade Cloud
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Enterprise-grade academic result management. Secure, scalable, and instantly accessible.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL - Login Card */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 relative">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-colors duration-300">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Please sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/30 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-medium text-center animate-in fade-in duration-300">
              {error}
            </div>
          )}

          {/* Role Tabs */}
          <div className="flex p-1 mb-8 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors duration-300">
            {['admin', 'staff', 'student'].map((tab) => (
              <button
                key={tab}
                onClick={() => setRole(tab)}
                className={`flex-1 py-2 text-sm font-medium rounded-md capitalize transition-all duration-200 ${
                  role === tab 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* LOGIN FORM */}
          <form className="space-y-5" onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);

            const formData = new FormData(e.currentTarget);
            const username = formData.get('username')?.trim();

            if (!username) {
              setError('Username/ID is required');
              setLoading(false);
              return;
            }

            try {
              // 1. Fire authentication request to backend
              await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username }),
              });

              // 2. Gives them actual access to the dashboard
              localStorage.setItem('apexRole', role); 
              // 3. Leaves a sticky note behind so the UI remembers their tab
              localStorage.setItem('lastApexRole', role); 
              // 4. Teleports to the dashboard
              router.push('/dashboard'); 
            } catch (err) {
              setError(err.message || 'Login failed. Please check backend connection.');
            } finally {
              setLoading(false);
            }
          }}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                {role === 'student' ? 'Hall Ticket Number' : role === 'admin' ? 'Admin Email' : 'Faculty ID'}
              </label>
              <input 
                type="text" 
                name="username"
                required
                placeholder={`Enter your ${role === 'student' ? 'ID' : 'credentials'}...`}
                className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}