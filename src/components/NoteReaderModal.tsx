import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
  Layers,
  MessageSquare,
  CheckCircle,
  Copy,
  Check,
  Send,
  Download,
  Bookmark,
  ThumbsUp,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Note, NoteComment } from '../types';

interface NoteReaderModalProps {
  note: Note;
  onClose: () => void;
  initialTab?: 'content' | 'quiz' | 'flashcards' | 'ai';
  onAddComment: (noteId: string, comment: NoteComment) => void;
  onToggleBookmark: (noteId: string) => void;
  isBookmarked: boolean;
  onDownload: (note: Note) => void;
}

export const NoteReaderModal: React.FC<NoteReaderModalProps> = ({
  note,
  onClose,
  initialTab = 'content',
  onAddComment,
  onToggleBookmark,
  isBookmarked,
  onDownload,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeSideTab, setActiveSideTab] = useState<'ai' | 'quiz' | 'flashcards' | 'discussion'>(
    initialTab === 'content' ? 'ai' : initialTab
  );

  // Audio Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Copied code feedback
  const [copiedCode, setCopiedCode] = useState(false);

  // AI Assistant state
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponses, setAiResponses] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `Hello! I'm your NoteNest AI Study Companion for "${note.title}". You can ask me to explain any difficult formula, summarize this page, or test you on probable university exam questions.`,
    },
  ]);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Comment input state
  const [newCommentText, setNewCommentText] = useState('');

  const currentPage = note.pages[currentPageIndex] || note.pages[0];

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-To-Speech handler
  const handleToggleAudio = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${currentPage.heading}. ${currentPage.subheading}. ${currentPage.content.replace(/[\$\#\*\_]/g, '')}. Key takeaway: ${currentPage.keyTakeaway}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Copy code snippet
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Submit AI Question
  const handleSendAiQuestion = async (presetText?: string) => {
    const q = presetText || aiQuestion;
    if (!q.trim()) return;

    const newMessages = [...aiResponses, { sender: 'user' as const, text: q }];
    setAiResponses(newMessages);
    if (!presetText) setAiQuestion('');
    setAiLoading(true);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          noteTitle: note.title,
          noteContent: `${currentPage.heading}\n${currentPage.content}`,
          subject: note.subjectName,
        }),
      });

      const data = await response.json();
      setAiResponses([
        ...newMessages,
        {
          sender: 'assistant',
          text: data.answer || 'Completed review of the concept.',
        },
      ]);
    } catch (err) {
      setAiResponses([
        ...newMessages,
        {
          sender: 'assistant',
          text: `Here is the exam focus for "${note.title}": Pay special attention to the mathematical formulations on page ${currentPageIndex + 1}. When answering 16-mark university questions, always include the derivation steps, assumptions, and computational complexity.`,
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Quiz submission & scoring
  const handleSelectQuizAnswer = (qId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleFinishQuiz = () => {
    setShowQuizResults(true);
    // Check if all correct
    let correctCount = 0;
    note.quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount === note.quizQuestions.length) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowQuizResults(false);
  };

  // Post comment
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: NoteComment = {
      id: `c_${Date.now()}`,
      author: 'You (3rd Year AIDS)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      text: newCommentText.trim(),
      pageNumber: currentPageIndex + 1,
      timestamp: 'Just now',
      upvotes: 1,
    };

    onAddComment(note.id, newComment);
    setNewCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-7xl h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Top Control Bar */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex flex-col truncate">
              <div className="flex items-center gap-2 text-xs text-indigo-300">
                <span className="font-semibold">{note.subjectName}</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span>Unit {note.unitNumber}</span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span>Sem {note.semester}</span>
                {note.verifiedByFaculty && (
                  <>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate font-display">
                {note.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Audio Read-Aloud Button */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isSpeaking ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
              title={isSpeaking ? 'Stop Audio Read-Aloud' : 'Read Note Aloud'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
            </button>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 25))}
                disabled={zoomLevel <= 75}
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1.5 text-slate-300">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 25))}
                disabled={zoomLevel >= 150}
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={() => onDownload(note)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
              title="Download Note Summary"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(note.id)}
              className={`p-2 rounded-lg text-xs transition-colors ${
                isBookmarked ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
              title={isBookmarked ? 'Saved to Bookmarks' : 'Save to Bookmarks'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
              aria-label="Close Note Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Workspace Split Layout: 3 Columns on Large Screens */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Table of Contents & Page List (Hidden on tiny screens) */}
          <div className="hidden md:flex w-60 border-r border-slate-200 bg-slate-50 flex-col shrink-0">
            <div className="p-3 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>Pages ({note.pages.length})</span>
              <span className="text-[11px] font-mono text-slate-400">PDF / MD View</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {note.pages.map((p, idx) => (
                <button
                  key={p.pageNumber}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                    currentPageIndex === idx
                      ? 'bg-indigo-600 text-white shadow-sm font-medium'
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 font-mono text-[10px] ${
                      currentPageIndex === idx ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {p.pageNumber}
                  </span>
                  <div className="flex-1 truncate">
                    <div className="font-semibold truncate">{p.heading}</div>
                    <div
                      className={`text-[10px] truncate ${
                        currentPageIndex === idx ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      {p.subheading}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Contributor Credit in sidebar */}
            <div className="p-3 border-t border-slate-200 bg-white">
              <div className="text-[11px] text-slate-400 mb-1">Contributed by:</div>
              <div className="flex items-center gap-2">
                <img
                  src={note.author.avatar}
                  alt={note.author.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="text-xs truncate">
                  <div className="font-semibold text-slate-800 truncate">{note.author.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{note.author.rollNo}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Stage: Document Page Reader */}
          <div className="flex-1 overflow-y-auto bg-slate-100/70 p-4 sm:p-8 flex flex-col items-center">
            <div
              className="bg-white rounded-xl shadow-md border border-slate-200 w-full max-w-3xl min-h-[580px] p-6 sm:p-10 flex flex-col justify-between transition-all"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              <div className="space-y-6">
                {/* Document Page Header */}
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                    <span>
                      {note.subjectName} · {note.fileType.toUpperCase()}
                    </span>
                    <span>
                      Page {currentPage.pageNumber} of {note.pages.length}
                    </span>
                  </div>
                  <h1 className="text-2xl font-extrabold text-slate-900 font-display">
                    {currentPage.heading}
                  </h1>
                  <p className="text-sm font-medium text-indigo-600 mt-1">
                    {currentPage.subheading}
                  </p>
                </div>

                {/* Main Content Body */}
                <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
                  {currentPage.content.split('\n\n').map((paragraph, pIdx) => {
                    // Check if paragraph is LaTeX-like formula block
                    if (paragraph.startsWith('$$') && paragraph.endsWith('$$')) {
                      const formula = paragraph.slice(2, -2).trim();
                      return (
                        <div
                          key={pIdx}
                          className="my-3 p-4 bg-slate-50 rounded-lg border border-slate-200 text-center font-mono text-sm sm:text-base text-slate-900 overflow-x-auto shadow-2xs"
                        >
                          <span className="text-indigo-700 font-semibold">{formula}</span>
                        </div>
                      );
                    }
                    return (
                      <p key={pIdx} className="whitespace-pre-line leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Formula Callout Box if present */}
                {currentPage.formulaBox && (
                  <div className="p-4 bg-indigo-50/70 rounded-xl border border-indigo-200 text-indigo-950">
                    <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>Formula Invariant</span>
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-indigo-900 font-semibold overflow-x-auto py-1">
                      {currentPage.formulaBox}
                    </div>
                  </div>
                )}

                {/* Code Snippet Box if present */}
                {currentPage.codeSnippet && (
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 text-xs">
                    <div className="px-4 py-2 bg-slate-900 flex items-center justify-between border-b border-slate-800 text-slate-400">
                      <span className="font-mono font-medium">{currentPage.codeSnippet.language}</span>
                      <button
                        onClick={() => handleCopyCode(currentPage.codeSnippet!.code)}
                        className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <pre className="p-4 font-mono text-xs overflow-x-auto leading-relaxed text-indigo-200">
                      <code>{currentPage.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Key Exam Takeaway */}
                <div className="p-3.5 rounded-lg bg-amber-50/80 border border-amber-200/90 text-amber-900 text-xs sm:text-sm">
                  <span className="font-bold text-amber-800 mr-1.5">Exam Trap / Takeaway:</span>
                  <span>{currentPage.keyTakeaway}</span>
                </div>
              </div>

              {/* Page Footer Navigation */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={() => setCurrentPageIndex((idx) => Math.max(0, idx - 1))}
                  disabled={currentPageIndex === 0}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1 font-medium transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="font-mono text-slate-400 text-xs">
                  {currentPageIndex + 1} / {note.pages.length}
                </div>

                <button
                  onClick={() => setCurrentPageIndex((idx) => Math.min(note.pages.length - 1, idx + 1))}
                  disabled={currentPageIndex === note.pages.length - 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent flex items-center gap-1 font-medium transition-colors"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Study Companion Deck */}
          <div className="w-80 lg:w-96 border-l border-slate-200 bg-white flex flex-col shrink-0">
            {/* Side Tabs Header */}
            <div className="grid grid-cols-4 border-b border-slate-200 text-xs font-medium">
              <button
                onClick={() => setActiveSideTab('ai')}
                className={`py-3 text-center transition-colors flex flex-col items-center gap-1 ${
                  activeSideTab === 'ai'
                    ? 'border-b-2 border-indigo-600 text-indigo-600 font-semibold bg-indigo-50/40'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Tutor</span>
              </button>

              <button
                onClick={() => setActiveSideTab('quiz')}
                className={`py-3 text-center transition-colors flex flex-col items-center gap-1 ${
                  activeSideTab === 'quiz'
                    ? 'border-b-2 border-indigo-600 text-indigo-600 font-semibold bg-indigo-50/40'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Quiz ({note.quizQuestions.length})</span>
              </button>

              <button
                onClick={() => setActiveSideTab('flashcards')}
                className={`py-3 text-center transition-colors flex flex-col items-center gap-1 ${
                  activeSideTab === 'flashcards'
                    ? 'border-b-2 border-indigo-600 text-indigo-600 font-semibold bg-indigo-50/40'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Flashcards</span>
              </button>

              <button
                onClick={() => setActiveSideTab('discussion')}
                className={`py-3 text-center transition-colors flex flex-col items-center gap-1 ${
                  activeSideTab === 'discussion'
                    ? 'border-b-2 border-indigo-600 text-indigo-600 font-semibold bg-indigo-50/40'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Doubts ({note.comments.length})</span>
              </button>
            </div>

            {/* Tab 1: AI Study Assistant */}
            {activeSideTab === 'ai' && (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Suggested Study Prompts:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => handleSendAiQuestion('Summarize the 3 most critical points for university exams.')}
                      className="px-2 py-1 bg-white border border-slate-200 hover:border-indigo-400 rounded text-[11px] text-slate-700 hover:text-indigo-700 transition-colors"
                    >
                      3-Point Exam Summary
                    </button>
                    <button
                      onClick={() => handleSendAiQuestion('Derive the key mathematical steps in simple words.')}
                      className="px-2 py-1 bg-white border border-slate-200 hover:border-indigo-400 rounded text-[11px] text-slate-700 hover:text-indigo-700 transition-colors"
                    >
                      Explain Derivation
                    </button>
                    <button
                      onClick={() => handleSendAiQuestion('What are common tricky viva questions on this topic?')}
                      className="px-2 py-1 bg-white border border-slate-200 hover:border-indigo-400 rounded text-[11px] text-slate-700 hover:text-indigo-700 transition-colors"
                    >
                      Viva Questions
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {aiResponses.map((msg, mIdx) => (
                    <div
                      key={mIdx}
                      className={`flex flex-col text-xs ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[90%] p-3 rounded-xl leading-relaxed whitespace-pre-line ${
                          msg.sender === 'user'
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/70'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {aiLoading && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                      <Sparkles className="w-4 h-4 animate-spin text-indigo-500" />
                      <span>NoteNest AI is formulating exam response...</span>
                    </div>
                  )}
                </div>

                <div className="p-3 border-t border-slate-200 bg-white">
                  <div className="relative">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendAiQuestion()}
                      placeholder="Ask about this page or formula..."
                      className="w-full pl-3 pr-10 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                    />
                    <button
                      onClick={() => handleSendAiQuestion()}
                      disabled={!aiQuestion.trim() || aiLoading}
                      className="absolute right-1 top-1 p-1.5 text-indigo-600 hover:text-indigo-800 disabled:opacity-40"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive Quiz Mode */}
            {activeSideTab === 'quiz' && (
              <div className="flex-1 flex flex-col h-full overflow-hidden p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Knowledge Check
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Test your understanding of {note.subjectName}
                    </p>
                  </div>
                  {showQuizResults && (
                    <button
                      onClick={handleResetQuiz}
                      className="text-xs font-medium text-indigo-600 hover:underline"
                    >
                      Retry
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto py-3 space-y-5">
                  {note.quizQuestions.map((q, qIndex) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    const selectedIdx = selectedAnswers[q.id];
                    const isCorrect = selectedIdx === q.correctIndex;

                    return (
                      <div key={q.id} className="space-y-2 text-xs border-b border-slate-100 pb-4">
                        <div className="font-semibold text-slate-800 leading-snug">
                          {qIndex + 1}. {q.question}
                        </div>
                        <div className="space-y-1.5 pt-1">
                          {q.options.map((opt, optIndex) => {
                            let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                            if (showQuizResults) {
                              if (optIndex === q.correctIndex) {
                                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                              } else if (selectedIdx === optIndex) {
                                btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                              }
                            } else if (selectedIdx === optIndex) {
                              btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-medium';
                            }

                            return (
                              <button
                                key={optIndex}
                                disabled={showQuizResults}
                                onClick={() => handleSelectQuizAnswer(q.id, optIndex)}
                                className={`w-full text-left p-2 rounded-lg border text-xs transition-colors flex items-start gap-2 ${btnStyle}`}
                              >
                                <span className="font-mono text-slate-400 text-[10px]">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {showQuizResults && (
                          <div
                            className={`p-2.5 rounded-lg text-[11px] mt-2 leading-relaxed ${
                              isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                            }`}
                          >
                            <span className="font-bold mr-1">{isCorrect ? '✓ Correct:' : '✗ Solution:'}</span>
                            <span>{q.explanation}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-200">
                  {!showQuizResults ? (
                    <button
                      onClick={handleFinishQuiz}
                      disabled={Object.keys(selectedAnswers).length < note.quizQuestions.length}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-medium text-xs rounded-lg transition-colors"
                    >
                      Submit Answers ({Object.keys(selectedAnswers).length}/{note.quizQuestions.length})
                    </button>
                  ) : (
                    <div className="text-center py-2 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-slate-800">
                        Score:{' '}
                        {
                          note.quizQuestions.filter((q) => selectedAnswers[q.id] === q.correctIndex)
                            .length
                        }{' '}
                        / {note.quizQuestions.length}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {note.quizQuestions.filter((q) => selectedAnswers[q.id] === q.correctIndex)
                          .length === note.quizQuestions.length
                          ? '🎉 Mastery Achieved! +30 NestCoins'
                          : 'Review wrong answers above and retry!'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Flashcards Deck */}
            {activeSideTab === 'flashcards' && (
              <div className="flex-1 flex flex-col h-full overflow-hidden p-4 justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-indigo-600">Quick Revision Deck</span>
                    <span className="font-mono">
                      Card {currentCardIndex + 1} of {note.flashcards.length}
                    </span>
                  </div>

                  {note.flashcards[currentCardIndex] && (
                    <div
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="mt-4 min-h-[220px] p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-all flex flex-col justify-between shadow-2xs text-center"
                    >
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Topic: {note.flashcards[currentCardIndex].topic}
                      </div>

                      <div className="my-auto">
                        {!isFlipped ? (
                          <div className="text-sm font-bold text-slate-900 leading-snug">
                            {note.flashcards[currentCardIndex].question}
                          </div>
                        ) : (
                          <div className="text-xs sm:text-sm font-medium text-indigo-900 leading-relaxed bg-indigo-50/80 p-3 rounded-lg border border-indigo-100">
                            {note.flashcards[currentCardIndex].answer}
                          </div>
                        )}
                      </div>

                      <div className="text-[10px] text-slate-400">
                        Click card to {isFlipped ? 'show question' : 'reveal answer'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => {
                      setCurrentCardIndex((c) => Math.max(0, c - 1));
                      setIsFlipped(false);
                    }}
                    disabled={currentCardIndex === 0}
                    className="flex-1 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-30"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="flex-1 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-100"
                  >
                    Flip
                  </button>
                  <button
                    onClick={() => {
                      setCurrentCardIndex((c) => Math.min(note.flashcards.length - 1, c + 1));
                      setIsFlipped(false);
                    }}
                    disabled={currentCardIndex === note.flashcards.length - 1}
                    className="flex-1 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: Discussion & Peer Doubts */}
            {activeSideTab === 'discussion' && (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="p-3 border-b border-slate-200 text-xs font-semibold text-slate-600 bg-slate-50">
                  Q&A Discussion on Page {currentPageIndex + 1}
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {note.comments.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">
                      No questions asked yet on this note. Be the first to ask!
                    </div>
                  ) : (
                    note.comments.map((comm) => (
                      <div
                        key={comm.id}
                        className={`p-3 rounded-lg text-xs border ${
                          comm.isFacultyReply
                            ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5 font-semibold">
                            <span>{comm.author}</span>
                            {comm.isFacultyReply && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 rounded">
                                Faculty
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">{comm.timestamp}</span>
                        </div>
                        <p className="leading-relaxed text-slate-700">{comm.text}</p>
                        <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                          <span>Tagged: Page {comm.pageNumber || 1}</span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {comm.upvotes}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handlePostComment} className="p-3 border-t border-slate-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder={`Ask doubt regarding page ${currentPageIndex + 1}...`}
                      className="flex-1 text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 disabled:opacity-40"
                    >
                      Ask
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
