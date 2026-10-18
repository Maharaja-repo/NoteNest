import React from 'react';
import {
  FileText,
  CheckCircle,
  ThumbsUp,
  Eye,
  Download,
  Bookmark,
  Sparkles,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onOpenReader: (note: Note, initialTab?: 'content' | 'quiz' | 'flashcards' | 'ai') => void;
  onToggleBookmark: (noteId: string) => void;
  onToggleUpvote: (noteId: string) => void;
  isBookmarked: boolean;
  isUpvoted: boolean;
  onDownload: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onOpenReader,
  onToggleBookmark,
  onToggleUpvote,
  isBookmarked,
  isUpvoted,
  onDownload,
}) => {
  // File type styling labels
  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case 'handwritten':
        return 'Topper Handwritten Scan';
      case 'cheatsheet':
        return 'Exam Formula Cheatsheet';
      case 'pyq':
        return 'Solved PYQ University Kit';
      case 'lab':
        return 'Practical Lab Manual';
      default:
        return 'Digital Study Note';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div className="p-5 space-y-3.5">
        {/* Unboxed Metadata Header (Zero-Pill Compliance) */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-indigo-700">{note.subjectName}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Unit {note.unitNumber}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Sem {note.semester}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-600 font-medium">{getFileTypeLabel(note.fileType)}</span>
          </div>

          <button
            onClick={() => onToggleBookmark(note.id)}
            className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors focus:outline-none ${
              isBookmarked ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Save Note'}
            aria-label="Bookmark Note"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenReader(note)}
          className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 cursor-pointer transition-colors leading-snug line-clamp-2"
        >
          {note.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {note.description}
        </p>

        {/* Verification & Author Row */}
        <div className="pt-1 flex items-center justify-between text-xs border-t border-slate-100">
          <div className="flex items-center gap-2">
            <img
              src={note.author.avatar}
              alt={note.author.name}
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="flex flex-col">
              <span className="font-medium text-slate-800 flex items-center gap-1">
                {note.author.name}
                {note.author.isTopper && (
                  <span className="text-[10px] text-amber-700 font-semibold" title="Rank 1-5 Student Topper">
                    ★ Topper
                  </span>
                )}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{note.author.rollNo}</span>
            </div>
          </div>

          {note.verifiedByFaculty ? (
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium" title={note.verifiedFacultyName}>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Faculty Verified</span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-400">
              Peer Reviewed
            </div>
          )}
        </div>

        {/* Tags Row - Unboxed quiet text with separators */}
        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 flex-wrap">
          {note.tags.slice(0, 3).map((tag, idx) => (
            <React.Fragment key={tag}>
              <span>#{tag}</span>
              {idx < 2 && <span aria-hidden="true" className="text-slate-300">·</span>}
            </React.Fragment>
          ))}
          {note.tags.length > 3 && (
            <span className="text-slate-400 font-mono">+{note.tags.length - 3}</span>
          )}
        </div>
      </div>

      {/* Footer Strip with Action Buttons */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200/80 rounded-b-xl flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleUpvote(note.id)}
            className={`flex items-center gap-1 transition-colors ${
              isUpvoted ? 'text-indigo-600 font-semibold' : 'hover:text-slate-800'
            }`}
            title="Helpful Note Upvote"
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current' : ''}`} />
            <span className="tabular-nums font-mono">{note.upvotes + (isUpvoted ? 1 : 0)}</span>
          </button>

          <span className="flex items-center gap-1" title="Views">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span className="tabular-nums font-mono">{note.views}</span>
          </span>

          <span className="flex items-center gap-1" title="Pages">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span className="tabular-nums font-mono">{note.pageCount}p</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {note.quizQuestions && note.quizQuestions.length > 0 && (
            <button
              onClick={() => onOpenReader(note, 'quiz')}
              className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors font-medium flex items-center gap-1"
              title="Practice 3-question revision quiz"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Quiz</span>
            </button>
          )}

          <button
            onClick={() => onOpenReader(note, 'content')}
            className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3 h-3" />
            <span>Open</span>
          </button>
        </div>
      </div>
    </div>
  );
};
