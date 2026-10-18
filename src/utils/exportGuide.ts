import { Note } from '../types';

export function exportNoteAsMarkdown(note: Note): void {
  let content = `# ${note.title}\n`;
  content += `**Subject**: ${note.subjectName} (${note.semester}th Semester - Unit ${note.unitNumber})\n`;
  content += `**Author**: ${note.author.name} (${note.author.rollNo})\n`;
  content += `**Verified**: ${note.verifiedByFaculty ? `Yes (${note.verifiedFacultyName})` : 'Peer-reviewed'}\n`;
  content += `**Rating**: ${note.rating} / 5.0 (${note.ratingsCount} reviews)\n`;
  content += `**Date**: ${note.uploadDate}\n\n`;
  content += `## Overview\n${note.description}\n\n`;

  content += `## Key Mathematical Invariants & Formulas\n`;
  note.keyFormulas.forEach((f, idx) => {
    content += `${idx + 1}. \`\`\`${f}\`\`\`\n`;
  });
  content += `\n`;

  content += `## Study Material & Derivations\n\n`;
  note.pages.forEach((p) => {
    content += `### Page ${p.pageNumber}: ${p.heading}\n`;
    content += `*${p.subheading}*\n\n`;
    content += `${p.content}\n\n`;
    if (p.formulaBox) {
      content += `> **Formula Box**: ${p.formulaBox}\n\n`;
    }
    if (p.codeSnippet) {
      content += `\`\`\`${p.codeSnippet.language}\n${p.codeSnippet.code}\n\`\`\`\n\n`;
    }
    content += `**Exam Takeaway**: ${p.keyTakeaway}\n\n`;
    content += `---\n\n`;
  });

  if (note.quizQuestions && note.quizQuestions.length > 0) {
    content += `## Practice Quiz Questions\n\n`;
    note.quizQuestions.forEach((q, idx) => {
      content += `**Q${idx + 1}: ${q.question}**\n`;
      q.options.forEach((opt, oIdx) => {
        content += `- [${oIdx === q.correctIndex ? 'x' : ' '}] ${opt}\n`;
      });
      content += `*Explanation*: ${q.explanation}\n\n`;
    });
  }

  content += `\n*Exported from NoteNest – 3rd Year AIDS Student Notes Platform*\n`;

  // Create blob and trigger download
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${note.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_study_notes.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
