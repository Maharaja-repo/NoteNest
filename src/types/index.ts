export type SemesterNumber = 5 | 6;

export type NoteFileType = 'handwritten' | 'cheatsheet' | 'digital' | 'pyq' | 'lab';

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: SemesterNumber;
  unitsCount: number;
  notesCount: number;
  description: string;
  color: string;
}

export interface NotePage {
  pageNumber: number;
  heading: string;
  subheading: string;
  content: string;
  formulaBox?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  keyTakeaway: string;
}

export interface NoteComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  pageNumber?: number;
  timestamp: string;
  upvotes: number;
  isFacultyReply?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

export interface NoteAuthor {
  name: string;
  rollNo: string;
  avatar: string;
  karma: number;
  badge: string;
  isTopper: boolean;
}

export interface Note {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  unitNumber: number;
  semester: SemesterNumber;
  fileType: NoteFileType;
  author: NoteAuthor;
  verifiedByFaculty: boolean;
  verifiedFacultyName?: string;
  uploadDate: string;
  rating: number;
  ratingsCount: number;
  upvotes: number;
  views: number;
  downloads: number;
  pageCount: number;
  description: string;
  tags: string[];
  keyFormulas: string[];
  pages: NotePage[];
  comments: NoteComment[];
  quizQuestions: QuizQuestion[];
  flashcards: Flashcard[];
}

export interface ContributorLeaderboardUser {
  rank: number;
  name: string;
  rollNo: string;
  department: string;
  notesUploaded: number;
  karmaPoints: number;
  badge: string;
  avatar: string;
}

export interface UserState {
  name: string;
  rollNo: string;
  nestCoins: number;
  savedNoteIds: string[];
  upvotedNoteIds: string[];
  completedQuizIds: string[];
}
