import React from 'react';
import { BookOpen, Sparkles, Plus, Clock, Award, Bookmark } from 'lucide-react';
import { UserState } from '../types';

interface HeaderProps {
  currentTab: 'notes' | 'reader' | 'ai' | 'focus' | 'leaderboard' | 'bookmarks';
  setCurrentTab: (tab: 'notes' | 'reader' | 'ai' | 'focus' | 'leaderboard' | 'bookmarks') => void;
  onOpenUpload: () => void;
  userState: UserState;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenUpload,
  userState,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single Brand wordmark element */}
          <button
            onClick={() => setCurrentTab('notes')}
            className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-700 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                NoteNest
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setCurrentTab('notes')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentTab === 'notes'
                  ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Notes Library
            </button>
            <button
              onClick={() => setCurrentTab('ai')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                currentTab === 'ai'
                  ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              AI Study Tutor
            </button>
            <button
              onClick={() => setCurrentTab('focus')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                currentTab === 'focus'
                  ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Focus Room
            </button>
            <button
              onClick={() => setCurrentTab('leaderboard')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                currentTab === 'leaderboard'
                  ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-slate-400" />
              Leaderboard
            </button>
            <button
              onClick={() => setCurrentTab('bookmarks')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                currentTab === 'bookmarks'
                  ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-slate-400" />
              Saved ({userState.savedNoteIds.length})
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100/80 text-xs font-medium text-indigo-700">
              <span>NestCoins:</span>
              <span className="font-bold tabular-nums text-indigo-900">{userState.nestCoins}</span>
            </div>

            <button
              onClick={onOpenUpload}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Share Notes</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
