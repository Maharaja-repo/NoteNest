import React, { useState } from 'react';
import { X, Upload, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Subject, Note, NoteFileType, SemesterNumber } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onAddNote: (newNote: Note) => void;
  subjects: Subject[];
}

export const UploadModal: React.FC<UploadModalProps> = ({
  onClose,
  onAddNote,
  subjects,
}) => {
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || 'deep-learning');
  const [unitNumber, setUnitNumber] = useState<number>(1);
  const [semester, setSemester] = useState<SemesterNumber>(5);
  const [fileType, setFileType] = useState<NoteFileType>('handwritten');
  const [authorName, setAuthorName] = useState('Maharaja K.');
  const [rollNo, setRollNo] = useState('22AIDS038');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('Unit 1, Exam Kit, Derivation');
  const [isGeneratingAiTags, setIsGeneratingAiTags] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // Auto-fill mock file on drop/select
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFileName(file.name);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  // AI Tagging helper simulation
  const handleAutoExtract = () => {
    setIsGeneratingAiTags(true);
    setTimeout(() => {
      setIsGeneratingAiTags(false);
      const chosenSubject = subjects.find((s) => s.id === subjectId)?.name || 'AI Course';
      setDescription(
        `Curated study note for ${chosenSubject} Unit ${unitNumber}. Includes essential theorem formulations, algorithm pseudocode, and model question answers verified for semester end examinations.`
      );
      setTagsInput(`Unit ${unitNumber}, ${chosenSubject}, Exam High-Yield, Topper Verified`);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const chosenSubject = subjects.find((s) => s.id === subjectId) || subjects[0];
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: title.trim(),
      subjectId: chosenSubject.id,
      subjectName: chosenSubject.name,
      unitNumber,
      semester,
      fileType,
      author: {
        name: authorName.trim() || 'AIDS Student',
        rollNo: rollNo.trim() || '22AIDS099',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        karma: 50,
        badge: 'Contributor',
        isTopper: false,
      },
      verifiedByFaculty: false,
      uploadDate: 'Just now',
      rating: 5.0,
      ratingsCount: 1,
      upvotes: 1,
      views: 1,
      downloads: 0,
      pageCount: 3,
      description:
        description.trim() ||
        `Comprehensive peer study note for ${chosenSubject.name} Unit ${unitNumber} by ${authorName}.`,
      tags: tags.length > 0 ? tags : ['AIDS 3rd Year', 'Unit Prep'],
      keyFormulas: [
        '\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{task}} + \\lambda \\Omega(\\theta)',
      ],
      pages: [
        {
          pageNumber: 1,
          heading: `${title} - Part 1: Core Theorems`,
          subheading: `Conceptual foundation for ${chosenSubject.name} Unit ${unitNumber}`,
          content: `This note covers the primary concepts and mathematical invariants for ${title}.

1. **Theoretical Foundations**:
Key definitions, problem framing, and analytical assumptions required for the 3rd Year AIDS syllabus.

2. **Core Equations**:
$$\\mathbf{y} = f(\\mathbf{W} \\mathbf{x} + \\mathbf{b})$$

3. **Engineering Applications**:
How this architecture scales across large distributed data pipelines and GPU accelerators.`,
          formulaBox: '\\text{Loss}(\\theta) = \\frac{1}{N} \\sum_{i=1}^N \\ell(f(x_i), y_i)',
          keyTakeaway: 'Always define the input dimensions and loss function in university 16-mark answers.',
        },
        {
          pageNumber: 2,
          heading: `${title} - Part 2: Algorithm & Numerical Walkthrough`,
          subheading: 'Step-by-step mathematical calculation',
          content: `Step-by-step numerical example solving standard university model question paper problems.

Follow the 4-step framework:
1. State given parameters and initial weights
2. Execute forward pass matrix arithmetic
3. Calculate residual error gradient
4. Update parameters using learning rate step`,
          keyTakeaway: 'Check matrix dimension compatibility before multiplying tensor matrices.',
        },
      ],
      comments: [],
      quizQuestions: [
        {
          id: `q_${Date.now()}`,
          question: `What is the primary objective of studying ${title} in 3rd Year AIDS?`,
          options: [
            'To understand core mathematical mechanics and scalability',
            'To ignore computational complexity',
            'To bypass data preprocessing completely',
            'To replace GPU hardware with CPU',
          ],
          correctIndex: 0,
          explanation:
            'Academic engineering standards require understanding both the mathematical underpinnings and empirical scalability.',
        },
      ],
      flashcards: [
        {
          id: `fc_${Date.now()}`,
          topic: chosenSubject.name,
          question: `What is the key takeaway of ${title}?`,
          answer:
            'Mastering the foundational mathematical equations, computational complexity bounds, and practical trade-offs.',
        },
      ],
    };

    onAddNote(newNote);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // Fallback
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display">Share Notes with AIDS Peers</h2>
              <p className="text-xs text-indigo-300">Earn +50 NestCoins & help your batchmates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Drag & Drop Target */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-xl p-5 text-center transition-colors ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50/50'
                : selectedFileName
                ? 'border-emerald-400 bg-emerald-50/30'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.md,.jpg,.png"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <Upload className={`w-8 h-8 mx-auto mb-2 ${selectedFileName ? 'text-emerald-600' : 'text-slate-400'}`} />
              {selectedFileName ? (
                <div className="text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Selected file: {selectedFileName}</span>
                </div>
              ) : (
                <>
                  <div className="text-xs font-semibold text-slate-700">
                    Drag and drop your PDF, handwritten scan or markdown notes
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    or click to browse files (PDF, DOCX, MD, Scans)
                  </div>
                </>
              )}
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Note Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Backpropagation Chain Rule Derivation & Solved Numericals"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Grid of Subject, Semester, Unit, File Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
              <select
                value={subjectId}
                onChange={(e) => {
                  setSubjectId(e.target.value);
                  const s = subjects.find((sub) => sub.id === e.target.value);
                  if (s) setSemester(s.semester);
                }}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name} ({sub.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value) as SemesterNumber)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              >
                <option value={5}>Semester 5 (3rd Year Odd)</option>
                <option value={6}>Semester 6 (3rd Year Even)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Unit Number</label>
              <select
                value={unitNumber}
                onChange={(e) => setUnitNumber(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              >
                {[1, 2, 3, 4, 5].map((u) => (
                  <option key={u} value={u}>
                    Unit {u}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Material Type</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as NoteFileType)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
              >
                <option value="handwritten">Topper Handwritten Scans</option>
                <option value="cheatsheet">Formula / Quick Cheatsheet</option>
                <option value="digital">Digital Formatted Notes</option>
                <option value="pyq">Solved University PYQs</option>
                <option value="lab">Practical Lab Manual</option>
              </select>
            </div>
          </div>

          {/* Author info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number</label>
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>

          {/* Description & Auto AI Extract */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Description / Key Topics</label>
              <button
                type="button"
                onClick={handleAutoExtract}
                disabled={isGeneratingAiTags}
                className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
              >
                <Sparkles className="w-3 h-3" />
                <span>{isGeneratingAiTags ? 'Generating...' : 'Auto-Generate Tags & Summary'}</span>
              </button>
            </div>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of topics covered in this note..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Backprop, Jacobian, Unit 2, Anna University"
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Publish Note (+50 NestCoins)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
