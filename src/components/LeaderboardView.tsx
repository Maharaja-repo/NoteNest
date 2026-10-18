import React from 'react';
import { Award, Sparkles, TrendingUp, BookOpen, Star, ShieldCheck } from 'lucide-react';
import { ContributorLeaderboardUser } from '../types';

interface LeaderboardViewProps {
  contributors: ContributorLeaderboardUser[];
  onOpenUpload: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  contributors,
  onOpenUpload,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <span>Academic Recognition</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>3rd Year AIDS Batch</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Contributor Hall of Fame
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Celebrating the top students sharing verified handwritten notes, solved derivations, and lab assignments to lift the entire department.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Upload Note & Earn Rank</span>
        </button>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {contributors.slice(0, 3).map((student, idx) => {
          const podiumColor =
            idx === 0
              ? 'border-amber-400 bg-gradient-to-b from-amber-50/60 to-white'
              : idx === 1
              ? 'border-slate-300 bg-gradient-to-b from-slate-50 to-white'
              : 'border-orange-300 bg-gradient-to-b from-orange-50/50 to-white';

          const crown = idx === 0 ? '🥇 1st' : idx === 1 ? '🥈 2nd' : '🥉 3rd';

          return (
            <div
              key={student.rollNo}
              className={`rounded-2xl border p-6 flex flex-col items-center text-center shadow-xs transition-transform hover:-translate-y-1 ${podiumColor}`}
            >
              <div className="text-xs font-extrabold font-mono uppercase tracking-wider text-slate-600 mb-3">
                {crown} Rank
              </div>

              <div className="relative mb-3">
                <img
                  src={student.avatar}
                  alt={student.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-md"
                />
              </div>

              <h3 className="text-base font-bold text-slate-900 font-display">
                {student.name}
              </h3>
              <div className="text-xs font-mono text-slate-400 mb-2">{student.rollNo}</div>

              <div className="text-xs font-medium text-indigo-700 mb-4">
                {student.badge}
              </div>

              <div className="w-full pt-3 border-t border-slate-200/80 grid grid-cols-2 text-xs text-slate-600">
                <div>
                  <div className="font-bold text-slate-900 tabular-nums font-mono text-sm">
                    {student.notesUploaded}
                  </div>
                  <div className="text-[10px] text-slate-400">Notes Published</div>
                </div>
                <div>
                  <div className="font-bold text-indigo-600 tabular-nums font-mono text-sm">
                    {student.karmaPoints}
                  </div>
                  <div className="text-[10px] text-slate-400">NestCoins</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <span>Rank & Student</span>
          <div className="flex items-center gap-8">
            <span className="hidden sm:inline">Department</span>
            <span>Notes</span>
            <span>Karma</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {contributors.map((user) => (
            <div
              key={user.rollNo}
              className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 font-mono font-bold text-slate-400 text-center">
                  #{user.rank}
                </span>
                <img
                  src={user.avatar}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span>{user.name}</span>
                    <span className="text-[11px] text-slate-400 font-normal">({user.badge})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{user.rollNo}</div>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <span className="hidden sm:inline text-slate-500">{user.department}</span>
                <span className="font-mono text-slate-800 font-medium tabular-nums w-8 text-right">
                  {user.notesUploaded}
                </span>
                <span className="font-mono text-indigo-600 font-bold tabular-nums w-12 text-right">
                  {user.karmaPoints}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
