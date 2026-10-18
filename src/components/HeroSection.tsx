import React from 'react';
import { Search, Sparkles, Filter, CheckCircle2, BookOpen } from 'lucide-react';
import { Subject, SemesterNumber, NoteFileType } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSemester: 'all' | SemesterNumber;
  setSelectedSemester: (sem: 'all' | SemesterNumber) => void;
  selectedSubject: string;
  setSelectedSubject: (subj: string) => void;
  selectedFileType: 'all' | NoteFileType;
  setSelectedFileType: (type: 'all' | NoteFileType) => void;
  subjects: Subject[];
  notesCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSemester,
  setSelectedSemester,
  selectedSubject,
  setSelectedSubject,
  selectedFileType,
  setSelectedFileType,
  subjects,
  notesCount,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-10 pb-12">
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl transform translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Context, Title, Search & Filters */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-300">
              <span className="bg-indigo-950/80 border border-indigo-700/60 text-indigo-200 px-2.5 py-1 rounded text-xs">
                3rd Year AIDS Academic Suite
              </span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Semester 5 & 6 Curriculum</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <span>Autonomous / University Syllabus</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white" style={{ textWrap: 'balance' }}>
              High-yield notes, derivations & solved PYQs for AIDS students.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Stop scrambling before mid-terms and end-sems. Access peer-reviewed topper notes, step-by-step mathematical derivations, lab manuals, and an interactive AI study companion.
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search backpropagation, self-attention, SVM numericals, YOLOv8..."
                className="w-full pl-11 pr-24 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/15 text-sm transition-all shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-24 pr-2 flex items-center text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
              <div className="absolute inset-y-0 right-1.5 flex items-center">
                <span className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-white/10 text-xs text-slate-300 font-mono">
                  {notesCount} notes
                </span>
              </div>
            </div>

            {/* Interactive Filter Tabs (Functional segmented controls) */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Semester:</span>
                <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-lg border border-slate-700/80">
                  <button
                    onClick={() => setSelectedSemester('all')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      selectedSemester === 'all'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    All Semesters
                  </button>
                  <button
                    onClick={() => setSelectedSemester(5)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      selectedSemester === 5
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Semester 5
                  </button>
                  <button
                    onClick={() => setSelectedSemester(6)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      selectedSemester === 6
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Semester 6
                  </button>
                </div>

                <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-lg border border-slate-700/80 ml-auto sm:ml-2">
                  <button
                    onClick={() => setSelectedFileType('all')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                      selectedFileType === 'all'
                        ? 'bg-white/20 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    onClick={() => setSelectedFileType('handwritten')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                      selectedFileType === 'handwritten'
                        ? 'bg-amber-500/30 text-amber-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Handwritten
                  </button>
                  <button
                    onClick={() => setSelectedFileType('cheatsheet')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                      selectedFileType === 'cheatsheet'
                        ? 'bg-emerald-500/30 text-emerald-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Cheatsheets
                  </button>
                  <button
                    onClick={() => setSelectedFileType('pyq')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                      selectedFileType === 'pyq'
                        ? 'bg-indigo-500/30 text-indigo-300 font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Solved PYQs
                  </button>
                </div>
              </div>

              {/* Subject Badges (Interactive filter buttons) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setSelectedSubject('all')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedSubject === 'all'
                      ? 'bg-white text-slate-900 font-semibold'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  All Subjects
                </button>
                {subjects.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubject(sub.id)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                      selectedSubject === sub.id
                        ? 'bg-indigo-500 text-white font-semibold shadow'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Hero Graphic */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800">
              <img
                src="/src/assets/images/notenest_study_hub_1792305260820.jpg"
                alt="NoteNest 3rd Year AIDS digital study collaborative hub"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-80 object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="font-medium text-white">Live Study Room Active</span>
                  </div>
                  <span className="font-mono text-indigo-300">28 AIDS peers online</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  Currently trending: Scaled Dot-Product Attention & ResNet Derivations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Quantitative Strip */}
        <div className="mt-10 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div>
            <div className="text-2xl font-bold font-display text-white tabular-nums">420+</div>
            <div className="text-xs text-slate-400 mt-0.5">Faculty-Verified Notes</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-indigo-400 tabular-nums">850+</div>
            <div className="text-xs text-slate-400 mt-0.5">3rd Year AIDS Students</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-teal-400 tabular-nums">100%</div>
            <div className="text-xs text-slate-400 mt-0.5">Syllabus-Aligned Derivations</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-amber-400 tabular-nums">98.4%</div>
            <div className="text-xs text-slate-400 mt-0.5">University Exam Pass Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
