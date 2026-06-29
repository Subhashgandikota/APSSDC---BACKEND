'use client';

import { useState } from 'react';
import { Search, Filter, BookOpen, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ManageDepartment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('All');

  // Interactive Mock Data
  const students = [
    { id: '24CSE101', name: 'Arjun Reddy', course: 'B.Tech CSE', year: 'Year 4', cgpa: '9.2' },
    { id: '24CSE142', name: 'Priya Sharma', course: 'B.Tech AI & ML', year: 'Year 2', cgpa: '8.7' },
    { id: '24CSE205', name: 'Karthik Iyer', course: 'B.Tech CSE', year: 'Year 1', cgpa: '7.9' },
    { id: '24CSE310', name: 'Neha Patel', course: 'M.Tech Data Science', year: 'Year 2', cgpa: '9.5' },
    { id: '24CSE118', name: 'Rahul Verma', course: 'B.Tech CSE', year: 'Year 3', cgpa: '8.1' },
  ];

  // The Live Search & Filter Logic!
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter === 'All' || student.year === yearFilter;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/departments" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Computer Science</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Department management and student roster.</p>
          </div>
        </div>
      </div>

      {/* 📚 COURSE MANAGEMENT SECTION */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Courses</h2>
          
          {/* 👈 THIS IS THE UPDATED LINK! */}
          <Link href="/dashboard/departments/manage/add-course" className="flex items-center px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
            <Plus className="w-4 h-4 mr-1" /> Add Course
          </Link>
          
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['B.Tech CSE', 'B.Tech AI & ML', 'M.Tech Data Science'].map((course, i) => (
            <div key={i} className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-slate-400" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">{course}</span>
              </div>
              <span className="text-xs px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md font-medium">Active</span>
            </div>
          ))}
        </div>
      </div>

      {/* 👨‍🎓 ENROLLED STUDENTS ROSTER */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Toolbar: Search & Filter */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white w-full sm:w-auto">Enrolled Students</h2>
          
          <div className="flex space-x-3 w-full sm:w-auto">
            {/* Live Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search name or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm text-slate-900 dark:text-white"
              />
            </div>
            
            {/* Live Sort/Filter Dropdown */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select 
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="pl-10 pr-8 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Years</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Course</th>
                <th className="px-6 py-4 font-medium">Batch Year</th>
                <th className="px-6 py-4 font-medium">CGPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{student.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{student.id}</div>
                    </td>
                    <td className="px-6 py-4">{student.course}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-semibold">{student.year}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-indigo-600 dark:text-indigo-400">{student.cgpa}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No students found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}