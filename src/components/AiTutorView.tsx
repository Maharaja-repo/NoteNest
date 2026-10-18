import React, { useState } from 'react';
import { Sparkles, Send, BookOpen, Lightbulb, CheckCircle2, Copy, Check } from 'lucide-react';
import { Subject } from '../types';

interface AiTutorViewProps {
  subjects: Subject[];
}

export const AiTutorView: React.FC<AiTutorViewProps> = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || 'Deep Learning');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `Welcome to the NoteNest 3rd Year AIDS AI Study Hub!
I can derive mathematical formulas, explain complex neural architectures, provide PyTorch implementations, or highlight frequent university exam questions.

Select a subject or pick one of the recommended syllabus topics below to get started.`,
    },
  ]);

  const recommendedPrompts = [
    {
      subject: 'Deep Learning',
      text: 'Derive the backpropagation chain rule for weights with Jacobian matrices.',
    },
    {
      subject: 'Natural Language Processing',
      text: 'Why do we divide by sqrt(d_k) in Scaled Dot-Product Attention in Transformers?',
    },
    {
      subject: 'Machine Learning Techniques',
      text: 'Explain KKT conditions and the Lagrangian Dual in Support Vector Machines.',
    },
    {
      subject: 'Big Data Analytics',
      text: 'Explain the internal MapReduce Shuffle & Sort pipeline and circular buffer spill.',
    },
    {
      subject: 'Optimization Techniques in AI',
      text: 'Why does Adam optimizer require the (1 - beta^t) bias correction term?',
    },
    {
      subject: 'Computer Vision',
      text: 'How does Non-Maximum Suppression (NMS) and IoU work in YOLOv8?',
    },
  ];

  const handleAsk = async (textToSend?: string) => {
    const q = textToSend || query;
    if (!q.trim()) return;

    const newHistory = [...chatHistory, { sender: 'user' as const, text: q }];
    setChatHistory(newHistory);
    if (!textToSend) setQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          subject: selectedSubject,
          noteTitle: 'General 3rd Year AIDS Syllabus',
        }),
      });

      const data = await res.json();
      setChatHistory([
        ...newHistory,
        {
          sender: 'assistant',
          text: data.answer || 'Completed inquiry analysis.',
        },
      ]);
    } catch (e) {
      setChatHistory([
        ...newHistory,
        {
          sender: 'assistant',
          text: `Here is the syllabus breakdown for ${selectedSubject}: Review the foundational mathematical equations, computational graph layers, and potential edge-case numerical questions.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
          <span>Interactive Study Companion</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Semester 5 & 6 Syllabus</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
          AIDS Engineering AI Tutor
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Instant step-by-step mathematical proofs, architecture walkthroughs, and exam preparation tailored to university requirements.
        </p>
      </div>

      {/* Recommended Question Grid */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
        <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
          <span>High-Yield University Exam Questions (Click to Ask):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {recommendedPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedSubject(item.subject);
                handleAsk(item.text);
              }}
              className="p-2.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-lg text-left text-xs transition-colors hover:shadow-xs group"
            >
              <div className="text-[10px] font-semibold text-indigo-600 group-hover:text-indigo-800">
                {item.subject}
              </div>
              <div className="text-slate-700 group-hover:text-slate-900 line-clamp-2 mt-0.5 leading-snug">
                {item.text}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Stream Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[520px]">
        {/* Top Controls: Subject Selection */}
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Active Subject Context:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Grounded in 3rd Year Syllabus
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
              <Sparkles className="w-4 h-4 animate-spin text-indigo-500" />
              <span>NoteNest AI is computing derivation and syllabus guidelines...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder={`Ask any doubt regarding ${selectedSubject}...`}
              className="w-full pl-4 pr-12 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            <button
              onClick={() => handleAsk()}
              disabled={!query.trim() || loading}
              className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
