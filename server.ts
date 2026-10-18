import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI SDK on server-side
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// AI Study Assistant endpoint
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { question, noteTitle, noteContent, subject } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (ai) {
      try {
        const prompt = `You are NoteNest AI, an expert academic tutor for 3rd Year Artificial Intelligence & Data Science (AIDS) university students.
The student is studying the note: "${noteTitle}" in the subject "${subject}".
Context of the note:
"""
${noteContent ? noteContent.slice(0, 4000) : 'General 3rd Year AIDS engineering syllabus.'}
"""

Student's question: "${question}"

Provide a clear, precise, and academically rigorous answer suitable for engineering exam prep. Include mathematical formulas, step-by-step logic, or code snippets if relevant. Keep it structured and easy to read.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const reply = response.text || 'Unable to generate response.';
        return res.json({ answer: reply, source: 'gemini' });
      } catch (geminiError: any) {
        console.error('Gemini API call failed, using academic fallback:', geminiError?.message);
      }
    }

    // Contextual academic fallback if Gemini key is not configured or rate-limited
    const lowerQ = question.toLowerCase();
    let fallbackAnswer = `Based on 3rd Year AIDS syllabus standards for **${subject || 'Data Science'}**:`;

    if (lowerQ.includes('loss') || lowerQ.includes('cost')) {
      fallbackAnswer += `\n\n### Cross-Entropy vs MSE Loss in Neural Networks
- **Binary Cross-Entropy (BCE)**: Used for binary classification with Sigmoid output. Formula: $L = -\\frac{1}{N} \\sum [y \\log(\\hat{y}) + (1-y)\\log(1-\\hat{y})]$.
- **Categorical Cross-Entropy (CCE)**: Used with Softmax for multi-class classification.
- **Why avoid MSE for classification**: Sigmoid with MSE leads to gradient saturation (vanishing gradients) because derivative $\\sigma'(z) \\to 0$ for extreme values, causing very slow backpropagation convergence.`;
    } else if (lowerQ.includes('transformer') || lowerQ.includes('attention')) {
      fallbackAnswer += `\n\n### Scaled Dot-Product Attention Mechanics
Attention formula:
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
- **Why divide by $\\sqrt{d_k}$**: For large key dimensions $d_k$, the dot products grow large in magnitude, pushing the Softmax function into regions with extremely small gradients. Scaling by $\\sqrt{d_k}$ preserves stable variance and prevents vanishing gradients.
- **Multi-Head Attention**: Projects Queries, Keys, and Values $h$ times with learned linear projections to attend to information from different representation subspaces jointly.`;
    } else if (lowerQ.includes('cnn') || lowerQ.includes('kernel') || lowerQ.includes('pooling')) {
      fallbackAnswer += `\n\n### CNN Feature Extraction Hierarchy
1. **Low-level layers**: Learn Gabor-like filters (edges, color gradients, corner orientations).
2. **Mid-level layers**: Assemble edges into motifs and textures (stripes, curves, mesh grids).
3. **High-level layers**: Detect semantic object parts (wheels, eyes, text blocks).
- **Max Pooling**: Injects translation invariance and shrinks spatial dimensions $(W \\times H)$, lowering parameter count while retaining dominant activations.`;
    } else if (lowerQ.includes('overfitting') || lowerQ.includes('regularization')) {
      fallbackAnswer += `\n\n### Combatting Overfitting in Deep Models
1. **L1/L2 Regularization (Weight Decay)**: Penalizes large weight matrices to favor smoother decision boundaries.
2. **Dropout ($p=0.3 - 0.5$)**: Randomly zeros out neuron activations during training, forcing redundant representations.
3. **Early Stopping**: Halts training when validation loss stops decreasing for $k$ epochs.
4. **Data Augmentation**: Flips, crops, affine transformations, or mixup for image datasets.`;
    } else {
      fallbackAnswer += `\n\n**Key Concept Summary**:
- **Core Principle**: ${noteTitle} focuses on building modular mathematical and algorithmic representations that generalize well on unseen test distributions.
- **Exam Tip**: When answering 16-mark university questions on this topic, always draw the architecture diagram, state the objective function, and list 2 advantages and 2 limitations.
- **Complexity**: Time complexity generally scales with dataset size $O(N)$ or matrix multiplications $O(N \\cdot D^2)$.`;
    }

    return res.json({ answer: fallbackAnswer, source: 'curated-syllabus' });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Server error' });
  }
});

// AI Note Summarizer endpoint
app.post('/api/ai/summarize', async (req, res) => {
  try {
    const { noteTitle, content, subject } = req.body;

    if (ai) {
      try {
        const prompt = `Summarize this academic engineering note for 3rd Year AIDS students studying ${subject}: "${noteTitle}".
Content:
"""
${content ? content.slice(0, 4000) : ''}
"""
Provide:
1. Executive 3-point takeaway
2. Core Mathematical Equations or Algorithms
3. High-Probability Exam Questions (5 marks & 16 marks format)`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        return res.json({ summary: response.text, source: 'gemini' });
      } catch (err: any) {
        console.error('Gemini summarize error:', err?.message);
      }
    }

    // Default structured summary
    const fallbackSummary = `### High-Yield Exam Summary: ${noteTitle}
**Subject**: ${subject} · 3rd Year AIDS Curriculum

#### 1. Core Principles & Takeaways
- Fundamental mathematical formulation and algorithmic pipeline.
- Trade-offs between computational overhead and empirical convergence accuracy.
- Optimal hyperparameter selection heuristics for benchmark datasets.

#### 2. Key Formulae / Invariants
- Optimization Criterion: $\\min_\\theta \\mathcal{L}(\\theta) + \\lambda \\mathcal{R}(\\theta)$
- Gradient Update Rule: $\\theta_{t+1} = \\theta_t - \\eta \\nabla_\\theta \\mathcal{L}(\\theta_t)$

#### 3. Top University Exam Questions
- **Part A (2 Marks)**: State the difference between parametric and non-parametric modeling in this context.
- **Part B (16 Marks)**: Derive the step-by-step mathematical formulation and sketch the architecture block diagram.`;

    return res.json({ summary: fallbackSummary, source: 'syllabus-fallback' });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Internal error' });
  }
});

// Mount Vite or static server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`NoteNest server running on port ${port}`);
});
