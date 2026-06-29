'use client';

import { useState } from 'react';
import { UserPlus, UploadCloud, CheckCircle2, Book, FileCheck, Calendar, Phone, Mail, Fingerprint, AlertCircle, Loader2 } from 'lucide-react';
import { apiRequest } from '@/utils/api';

export default function AddStudentPortal() {
  const [tab, setTab] = useState('single');
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);

  // Controlled Form States
  const [firstName, setFirstName] = useState('Arjun');
  const [lastName, setLastName] = useState('Reddy');
  const [email, setEmail] = useState('arjun.reddy@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [course, setCourse] = useState('B.Tech AI & ML');
  const [batchYear, setBatchYear] = useState('Year 1');
  const [generatedId, setGeneratedId] = useState('');
  const [error, setError] = useState(null);

  const handleFakeUpload = () => {
    setIsUploading(true);
    setTimeout(() => { setIsUploading(false); setUploadDone(true); }, 2500);
  };

  const handleRegister = async () => {
    setError(null);
    setIsUploading(true);

    // Auto-generate roll no if empty (e.g. 26CSE102)
    const finalRollNo = rollNo.trim() || '26' + department.substring(0, 3).toUpperCase() + Math.floor(100 + Math.random() * 900);

    try {
      const response = await apiRequest('/students/add', {
        method: 'POST',
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          rollNo: finalRollNo,
          subject: `${department} - ${course}`,
          marks: 75 // Default initial marks
        })
      });

      setGeneratedId(response.rollNo);
      setStep(4);
    } catch (err) {
      setError(err.message || 'Failed to register student. Please check database connection.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Enroll Students</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Enroll individually or upload a CSV database.</p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 w-full sm:w-80">
        <button onClick={() => setTab('single')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${tab === 'single' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>Single Form</button>
        <button onClick={() => setTab('bulk')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${tab === 'bulk' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>Bulk Import</button>
      </div>

      {tab === 'bulk' ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mt-8">
          {uploadDone ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Database Parsed!</h2>
              <p className="text-slate-500 mt-2">Successfully enrolled 1,240 new students via CSV.</p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={handleFakeUpload}>
              {isUploading ? (
                <div className="animate-pulse">
                   <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                   <p className="text-slate-600 font-bold">Validating Data Rows...</p>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Click or Drag CSV File Here</h3>
                  <p className="text-sm text-slate-500 mt-2">Must include headers: First Name, Last Name, Dept, Course.</p>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Progress Tracker */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mt-8 mb-6">
            <div className="flex items-center justify-between relative px-4">
              <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-slate-100 dark:bg-slate-800 z-0 rounded-full"></div>
              <div className="absolute left-10 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 z-0 rounded-full transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : 'calc(100% - 5rem)' }}></div>
              {[ { num: 1, icon: UserPlus, label: 'Personal Info' }, { num: 2, icon: Book, label: 'Academic Setup' }, { num: 3, icon: FileCheck, label: 'Review Details' } ].map((s) => (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors ${step >= s.num ? 'bg-indigo-600 border-indigo-100 dark:border-indigo-900 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className={`absolute -bottom-6 text-xs font-bold whitespace-nowrap ${step >= s.num ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/30 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-medium flex items-center">
              <AlertCircle className="w-5 h-5 text-rose-500 mr-2 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-h-[400px] flex flex-col justify-between">
            {step === 4 ? (
               <div className="text-center py-12 my-auto">
                 <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto mb-6 animate-bounce" />
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Enrollment Complete!</h2>
                 <p className="text-slate-500 mt-2">Student ID <strong>{generatedId}</strong> has been generated.</p>
                 <button onClick={() => {
                   setFirstName('');
                   setLastName('');
                   setRollNo('');
                   setStep(1);
                 }} className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors">Enroll Another Student</button>
               </div>
            ) : (
              <div className="space-y-8 flex-1">
                
                {/* STEP 1: PERSONAL INFO */}
                {step === 1 && (
                  <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                    <h2 className="text-xl font-bold dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">Primary Demographics</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date of Birth</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="date" className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Gender</label>
                        <select className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Blood Group</label>
                        <select className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none">
                          <option>A+</option><option>O+</option><option>B+</option><option>AB+</option><option>O-</option>
                        </select>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4 pt-4">Contact Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Primary Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="student@example.com" className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+91 98765 43210" className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: ACADEMIC SETUP */}
                {step === 2 && (
                  <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                    <h2 className="text-xl font-bold dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">Enrollment & Course Placement</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Student ID (Hall Ticket No.)</label>
                      <div className="relative">
                        <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Auto-generated if left blank" className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono" />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Leave blank to allow system to auto-generate based on Year and Department.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Assign Department</label>
                        <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                          <option>Computer Science</option><option>Electronics</option><option>Mechanical</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Select Course Program</label>
                        <select value={course} onChange={(e) => setCourse(e.target.value)} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                          <option>B.Tech AI & ML</option><option>B.Tech Core CSE</option><option>M.Tech Data Science</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Batch / Admission Year</label>
                        <select value={batchYear} onChange={(e) => setBatchYear(e.target.value)} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                          <option>Year 1</option><option>Year 2</option><option>Year 3</option><option>Year 4</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Admission Quota</label>
                        <select className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                          <option>Merit / Government</option><option>Management</option><option>International</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: REVIEW DETAILS */}
                {step === 3 && (
                  <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                    <h2 className="text-xl font-bold dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">Review & Confirm</h2>
                    
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{firstName} {lastName}</h3>
                          <p className="text-sm text-slate-500">New Enrollment Application</p>
                        </div>
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg font-bold">
                          PENDING
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-y-4 text-sm">
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 mb-1">Department</p>
                          <p className="font-semibold text-slate-900 dark:text-white">{department}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 mb-1">Course</p>
                          <p className="font-semibold text-slate-900 dark:text-white">{course}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 mb-1">Batch Year</p>
                          <p className="font-semibold text-slate-900 dark:text-white">{batchYear}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 mb-1">Account Credentials</p>
                          <p className="font-semibold text-emerald-600 dark:text-emerald-400">Will be emailed to student</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg">
                       <input type="checkbox" className="mt-1 mr-3 w-4 h-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500" defaultChecked />
                       <p className="text-sm text-amber-800 dark:text-amber-200">
                         <strong>Final Confirmation:</strong> I verify that all submitted documents and prerequisites for this student have been physically verified by the administration.
                       </p>
                    </div>
                  </div>
                )}

                {/* Form Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-800 mt-auto">
                  <button onClick={() => setStep(step - 1)} disabled={step === 1 || isUploading} className={`px-6 py-2.5 rounded-lg font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50'}`}>
                    Back
                  </button>
                  <button 
                    onClick={() => {
                      if (step === 3) {
                        handleRegister();
                      } else {
                        setStep(step + 1);
                      }
                    }} 
                    disabled={isUploading}
                    className="flex items-center px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors shadow-md active:scale-95"
                  >
                    {isUploading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : null}
                    {step === 3 ? 'Confirm & Register' : 'Next Step'}
                  </button>
                </div>

              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}