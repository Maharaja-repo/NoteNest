import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Sparkles,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Bookmark,
  CheckCircle2,
  FileQuestion,
  GraduationCap,
  Award,
  Layers,
  Heart,
  Clock,
} from 'lucide-react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NoteCard } from './components/NoteCard';
import { NoteReaderModal } from './components/NoteReaderModal';
import { UploadModal } from './components/UploadModal';
import { FocusRoomModal } from './components/FocusRoomModal';
import { LeaderboardView } from './components/LeaderboardView';
import { AiTutorView } from './components/AiTutorView';
import { INITIAL_NOTES, INITIAL_SUBJECTS, LEADERBOARD_CONTRIBUTORS } from './data/mockNotes';
import { Note, SemesterNumber, NoteFileType, NoteComment, UserState } from './types';
import { exportNoteAsMarkdown } from './utils/exportGuide';

export default function App() {
  const [currentTab, setCurrentTab] = useState<
    'notes' | 'reader' | 'ai' | 'focus' | 'leaderboard' | 'bookmarks'
  >('notes');

  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [subjects] = useState(INITIAL_SUBJECTS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<'all' | SemesterNumber>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedUnit, setSelectedUnit] = useState<'all' | number>('all');
  const [selectedFileType, setSelectedFileType] = useState<'all' | NoteFileType>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'downloads'>('popular');

  // Modals
  const [activeReaderNote, setActiveReaderNote] = useState<Note | null>(null);
  const [readerInitialTab, setReaderInitialTab] = useState<'content' | 'quiz' | 'flashcards' | 'ai'>('content');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFocusRoomOpen, setIsFocusRoomOpen] = useState(false);

  // User State
  const [userState, setUserState] = useState<UserState>({
    name: 'Maharaja K.',
    rollNo: '22AIDS038',
    nestCoins: 150,
    savedNoteIds: ['note-dl-backprop', 'note-nlp-transformers'],
    upvotedNoteIds: ['note-dl-backprop'],
    completedQuizIds: [],
  });

  // Filtered & Sorted Notes
  const filteredNotes = useMemo(() => {
    let result = notes;

    // Filter by bookmarks view if selected
    if (currentTab === 'bookmarks') {
      result = result.filter((n) => userState.savedNoteIds.includes(n.id));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.subjectName.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.author.name.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by Semester
    if (selectedSemester !== 'all') {
      result = result.filter((n) => n.semester === selectedSemester);
    }

    // Filter by Subject
    if (selectedSubject !== 'all') {
      result = result.filter((n) => n.subjectId === selectedSubject);
    }

    // Filter by Unit
    if (selectedUnit !== 'all') {
      result = result.filter((n) => n.unitNumber === selectedUnit);
    }

    // Filter by File Type
    if (selectedFileType !== 'all') {
      result = result.filter((n) => n.fileType === selectedFileType);
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return b.upvotes - a.upvotes;
    });
  }, [
    notes,
    currentTab,
    userState.savedNoteIds,
    searchQuery,
    selectedSemester,
    selectedSubject,
    selectedUnit,
    selectedFileType,
    sortBy,
  ]);

  // Handlers
  const handleOpenReader = (note: Note, initialTab: 'content' | 'quiz' | 'flashcards' | 'ai' = 'content') => {
    setActiveReaderNote(note);
    setReaderInitialTab(initialTab);
  };

  const handleToggleBookmark = (noteId: string) => {
    setUserState((prev) => {
      const isBookmarked = prev.savedNoteIds.includes(noteId);
      return {
        ...prev,
        savedNoteIds: isBookmarked
          ? prev.savedNoteIds.filter((id) => id !== noteId)
          : [...prev.savedNoteIds, noteId],
      };
    });
  };

  const handleToggleUpvote = (noteId: string) => {
    setUserState((prev) => {
      const isUpvoted = prev.upvotedNoteIds.includes(noteId);
      const newUpvoted = isUpvoted
        ? prev.upvotedNoteIds.filter((id) => id !== noteId)
        : [...prev.upvotedNoteIds, noteId];

      // Update in notes list
      setNotes((prevNotes) =>
        prevNotes.map((n) => {
          if (n.id === noteId) {
            return {
              ...n,
              upvotes: isUpvoted ? n.upvotes - 1 : n.upvotes + 1,
            };
          }
          return n;
        })
      );

      return {
        ...prev,
        upvotedNoteIds: newUpvoted,
      };
    });
  };

  const handleAddNote = (newNote: Note) => {
    setNotes((prev) => [newNote, ...prev]);
    setUserState((prev) => ({
      ...prev,
      nestCoins: prev.nestCoins + 50,
      savedNoteIds: [...prev.savedNoteIds, newNote.id],
    }));
  };

  const handleAddComment = (noteId: string, comment: NoteComment) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id === noteId) {
          return {
            ...n,
            comments: [comment, ...n.comments],
          };
        }
        return n;
      })
    );
  };

  const handleDownload = (note: Note) => {
    // Increment download counter
    setNotes((prev) =>
      prev.map((n) => (n.id === note.id ? { ...n, downloads: n.downloads + 1 } : n))
    );
    exportNoteAsMarkdown(note);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">
      {/* Top Navigation Bar adhering to Top Bar Contract */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenUpload={() => setIsUploadModalOpen(true)}
        userState={userState}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'notes' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedSemester={selectedSemester}
              setSelectedSemester={setSelectedSemester}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              selectedFileType={selectedFileType}
              setSelectedFileType={setSelectedFileType}
              subjects={subjects}
              notesCount={filteredNotes.length}
            />

            {/* Notes Exploration Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {/* Secondary Filter & Sort Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">
                    Showing {filteredNotes.length} curated notes
                  </span>
                  {(selectedSubject !== 'all' ||
                    selectedSemester !== 'all' ||
                    selectedFileType !== 'all' ||
                    searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedSubject('all');
                        setSelectedSemester('all');
                        setSelectedFileType('all');
                        setSelectedUnit('all');
                        setSearchQuery('');
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-medium ml-2 underline"
                    >
                      Reset all filters
                    </button>
                  )}
                </div>

                {/* Unit Selector & Sort Dropdown */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-500 mr-1 hidden sm:inline">Unit:</span>
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5">
                      <button
                        onClick={() => setSelectedUnit('all')}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          selectedUnit === 'all'
                            ? 'bg-slate-900 text-white font-medium'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        All
                      </button>
                      {[1, 2, 3, 4, 5].map((u) => (
                        <button
                          key={u}
                          onClick={() => setSelectedUnit(u)}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            selectedUnit === u
                              ? 'bg-slate-900 text-white font-medium'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          U{u}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="popular">Most Upvoted</option>
                      <option value="rating">Highest Rated</option>
                      <option value="downloads">Most Downloaded</option>
                      <option value="newest">Recently Uploaded</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes Grid */}
              {filteredNotes.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">
                    No notes matching your current filter criteria
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try clearing your search term or select "All Semesters" / "All Subjects".
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSubject('all');
                      setSelectedSemester('all');
                      setSelectedFileType('all');
                      setSelectedUnit('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700"
                  >
                    View All Notes
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                  {filteredNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onOpenReader={handleOpenReader}
                      onToggleBookmark={handleToggleBookmark}
                      onToggleUpvote={handleToggleUpvote}
                      isBookmarked={userState.savedNoteIds.includes(note.id)}
                      isUpvoted={userState.upvotedNoteIds.includes(note.id)}
                      onDownload={handleDownload}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {currentTab === 'ai' && <AiTutorView subjects={subjects} />}

        {currentTab === 'focus' && (
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-xs space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 font-display">
                Dedicated AIDS Focus Nest
              </h1>
              <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
                Launch an uninterrupted 25-minute Pomodoro study sprint with real-time synthesized audio soundscapes (Rain on Roof, Library Hum, Deep Noise) and live study peer activity.
              </p>
              <button
                onClick={() => setIsFocusRoomOpen(true)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                <span>Open Fullscreen Focus Room</span>
              </button>
            </div>
          </div>
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView
            contributors={LEADERBOARD_CONTRIBUTORS}
            onOpenUpload={() => setIsUploadModalOpen(true)}
          />
        )}

        {currentTab === 'bookmarks' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <div className="border-b border-slate-200 pb-5 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  My Saved Study Notes
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Bookmarked for quick revision before Semester 5 & 6 examinations
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md font-semibold">
                {userState.savedNoteIds.length} Saved
              </span>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">No saved notes yet</h3>
                <p className="text-xs text-slate-400">
                  Bookmark any note from the library using the bookmark icon to save it here.
                </p>
                <button
                  onClick={() => setCurrentTab('notes')}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700"
                >
                  Explore Notes Library
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onOpenReader={handleOpenReader}
                    onToggleBookmark={handleToggleBookmark}
                    onToggleUpvote={handleToggleUpvote}
                    isBookmarked={true}
                    isUpvoted={userState.upvotedNoteIds.includes(note.id)}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Note Reader Modal */}
      {activeReaderNote && (
        <NoteReaderModal
          note={activeReaderNote}
          initialTab={readerInitialTab}
          onClose={() => setActiveReaderNote(null)}
          onAddComment={handleAddComment}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={userState.savedNoteIds.includes(activeReaderNote.id)}
          onDownload={handleDownload}
        />
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <UploadModal
          subjects={subjects}
          onClose={() => setIsUploadModalOpen(false)}
          onAddNote={handleAddNote}
        />
      )}

      {/* Focus Room Modal */}
      {isFocusRoomOpen && (
        <FocusRoomModal
          onClose={() => setIsFocusRoomOpen(false)}
          onSessionComplete={() => {
            setUserState((prev) => ({
              ...prev,
              nestCoins: prev.nestCoins + 20,
            }));
          }}
        />
      )}

      {/* Clean Academic Footer (Zero-slop compliant) */}
      <footer className="mt-auto bg-slate-900 border-t border-slate-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-bold font-display tracking-tight text-white">
                  NoteNest
                </span>
                <p className="text-xs text-slate-400">
                  Student Notes Sharing Platform · 3rd Year AIDS Prototype Challenge
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-6">
              <span>Deep Learning</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Machine Learning</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>NLP & Transformers</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Big Data Systems</span>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Designed & Developed for 3rd Year AIDS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
