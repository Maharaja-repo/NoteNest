import { Subject, Note, ContributorLeaderboardUser } from '../types';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    code: 'AD3501',
    semester: 5,
    unitsCount: 5,
    notesCount: 28,
    description: 'Backpropagation, CNNs, ResNets, RNN/LSTM, Attention Mechanisms and Vision Transformers.',
    color: 'indigo',
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning Techniques',
    code: 'AD3502',
    semester: 5,
    unitsCount: 5,
    notesCount: 34,
    description: 'Supervised & Unsupervised learning, SVM kernels, Decision Trees, Ensemble Random Forests and Bias-Variance.',
    color: 'emerald',
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    code: 'AD3601',
    semester: 6,
    unitsCount: 5,
    notesCount: 22,
    description: 'Tokenization, N-grams, Word2Vec embeddings, Seq2Seq models, BERT, and Large Language Models.',
    color: 'amber',
  },
  {
    id: 'big-data',
    name: 'Big Data Analytics & Systems',
    code: 'AD3503',
    semester: 5,
    unitsCount: 5,
    notesCount: 19,
    description: 'Hadoop HDFS, MapReduce execution flow, Apache Spark RDDs, DataFrames, and Kafka streaming.',
    color: 'blue',
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision & Image Processing',
    code: 'AD3602',
    semester: 6,
    unitsCount: 5,
    notesCount: 17,
    description: 'Edge detection, SIFT/SURF, Region Proposals, Faster R-CNN, YOLOv8, and Semantic Segmentation.',
    color: 'rose',
  },
  {
    id: 'optimization',
    name: 'Optimization Techniques in AI',
    code: 'AD3504',
    semester: 5,
    unitsCount: 5,
    notesCount: 15,
    description: 'Convex optimization, Gradient Descent variants (Momentum, RMSprop, Adam), and Lagrange Multipliers.',
    color: 'teal',
  },
];

export const INITIAL_NOTES: Note[] = [
  {
    id: 'note-dl-backprop',
    title: 'Backpropagation & Gradient Flow Derivation (Topper Handwritten)',
    subjectId: 'deep-learning',
    subjectName: 'Deep Learning',
    unitNumber: 2,
    semester: 5,
    fileType: 'handwritten',
    author: {
      name: 'Kavitha Ramachandran',
      rollNo: '22AIDS041',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      karma: 420,
      badge: 'Gold Contributor',
      isTopper: true,
    },
    verifiedByFaculty: true,
    verifiedFacultyName: 'Dr. S. Sundararajan (Assoc. Prof - AI Dept)',
    uploadDate: 'Oct 14, 2026',
    rating: 4.95,
    ratingsCount: 88,
    upvotes: 142,
    views: 1840,
    downloads: 620,
    pageCount: 4,
    description: 'Complete step-by-step mathematical derivation of backpropagation using multi-variable chain rule with vector jacobians, vanishing gradient analysis, and sample numerical calculation.',
    tags: ['Chain Rule', 'Jacobian Matrix', 'Vanishing Gradients', 'Topper Handwritten', 'Unit 2 Core'],
    keyFormulas: [
      '\\delta_j^{(l)} = \\frac{\\partial L}{\\partial z_j^{(l)}} = \\left( \\sum_k \\delta_k^{(l+1)} w_{kj}^{(l+1)} \\right) \\sigma\'(z_j^{(l)})',
      '\\frac{\\partial L}{\\partial w_{ij}^{(l)}} = a_j^{(l-1)} \\delta_i^{(l)}',
      'w^{(t+1)} = w^{(t)} - \\eta \\nabla_w L',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Computational Graph & Forward Propagation',
        subheading: 'Formalizing layer-wise vector transformations',
        content: `In a standard Multi-Layer Perceptron (MLP), given an input vector $\\mathbf{x} \\in \\mathbb{R}^{d_{in}}$, each dense layer $l \\in \\{1, 2, \\dots, L\\}$ applies a linear affine transformation followed by a non-linear activation function $\\sigma$:

$$\\mathbf{z}^{(l)} = \\mathbf{W}^{(l)} \\mathbf{a}^{(l-1)} + \\mathbf{b}^{(l)}$$
$$\\mathbf{a}^{(l)} = \\sigma(\\mathbf{z}^{(l)})$$

Where $\\mathbf{a}^{(0)} = \\mathbf{x}$. The cost function evaluated at the output layer $L$ against the ground-truth label $\\mathbf{y}$ is represented as $\\mathcal{L}(\\mathbf{a}^{(L)}, \\mathbf{y})$.

To optimize parameters $\\{\\mathbf{W}^{(l)}, \\mathbf{b}^{(l)}\\}$, we need the partial derivatives of $\\mathcal{L}$ with respect to each weight matrix entry $W_{ij}^{(l)}$.`,
        formulaBox: 'Affine: z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)} | Activation: a^{(l)} = \\sigma(z^{(l)})',
        keyTakeaway: 'Always define the forward computational graph explicitly before applying the chain rule in 16-mark university exams.',
      },
      {
        pageNumber: 2,
        heading: 'The Error Term Definition (Delta Rule)',
        subheading: 'Defining local sensitivity vector delta',
        content: `We define the error vector for layer $l$ as the gradient of the loss with respect to the pre-activation vector $\\mathbf{z}^{(l)}$:

$$\\boldsymbol{\\delta}^{(l)} \\equiv \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{z}^{(l)}}$$

By the multivariate chain rule:
$$\\delta_j^{(l)} = \\frac{\\partial \\mathcal{L}}{\\partial z_j^{(l)}} = \\sum_k \\frac{\\partial \\mathcal{L}}{\\partial z_k^{(l+1)}} \\frac{\\partial z_k^{(l+1)}}{\\partial z_j^{(l)}}$$

Since $z_k^{(l+1)} = \\sum_m W_{km}^{(l+1)} a_m^{(l)} + b_k^{(l+1)}$ and $a_m^{(l)} = \\sigma(z_m^{(l)})$, we differentiate:
$$\\frac{\\partial z_k^{(l+1)}}{\\partial z_j^{(l)}} = W_{kj}^{(l+1)} \\sigma'(z_j^{(l)})$$

Substituting this back gives the **Fundamental Backprop Recurrence Relation**:
$$\\boldsymbol{\\delta}^{(l)} = \\left( (\\mathbf{W}^{(l+1)})^T \\boldsymbol{\\delta}^{(l+1)} \\right) \\odot \\sigma'(\\mathbf{z}^{(l)})$$`,
        formulaBox: '\\delta^{(l)} = [(W^{(l+1)})^T \\delta^{(l+1)}] \\odot \\sigma\'(z^{(l)})',
        keyTakeaway: 'The transpose of weight matrix W^(l+1) pulls the future layer error vector backwards to the current layer.',
      },
      {
        pageNumber: 3,
        heading: 'Weight & Bias Gradient Equations & PyTorch Mapping',
        subheading: 'Translating mathematical equations into production tensor ops',
        content: `Once the error $\\boldsymbol{\\delta}^{(l)}$ is computed, the gradient with respect to individual weights and biases simplifies into an outer product:

$$\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}^{(l)}} = \\boldsymbol{\\delta}^{(l)} (\\mathbf{a}^{(l-1)})^T$$
$$\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}^{(l)}} = \\boldsymbol{\\delta}^{(l)}$$

Notice that the gradient for $W_{ij}^{(l)}$ depends strictly on two factors:
1. The incoming activation signal $a_j^{(l-1)}$ from the previous layer.
2. The error signal $\\delta_i^{(l)}$ propagated backward from output.`,
        codeSnippet: {
          language: 'python',
          code: `# Manual backpropagation backward pass check in PyTorch / NumPy
def backward_step(delta_next, W_next, z_curr, a_prev):
    # Derivative of ReLU activation: 1 if z > 0 else 0
    sigma_prime = (z_curr > 0).astype(float)
    delta_curr = (W_next.T @ delta_next) * sigma_prime
    grad_W = delta_curr @ a_prev.T
    grad_b = np.sum(delta_curr, axis=1, keepdims=True)
    return delta_curr, grad_W, grad_b`,
        },
        keyTakeaway: 'For batch size N, always average over batch: grad_W = (1/N) * sum_i(delta_i * a_i^T).',
      },
      {
        pageNumber: 4,
        heading: 'Vanishing Gradient Problem & Mitigation in 3rd Year AIDS',
        subheading: 'Why Sigmoid/Tanh fail in deep networks vs ReLU/GELU',
        content: `For a network of depth $L$, the gradient at the initial layer $1$ involves a product of $L-1$ derivative terms:

$$\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}^{(1)}} \\propto \\prod_{k=1}^{L-1} \\sigma'(\\mathbf{z}^{(k)}) \\cdot \\mathbf{W}^{(k+1)}$$

- For **Sigmoid**: $\\sigma'(z) = \\sigma(z)(1 - \\sigma(z))$. Maximum value occurs at $z=0$ where $\\sigma'(0) = 0.25$. Multiplying fractions $< 0.25$ over 10 layers causes exponential decay $\\approx (0.25)^{10} \\approx 9.5 \\times 10^{-7} \\to 0$.
- For **ReLU**: $\\sigma'(z) = 1$ for all $z > 0$. The gradient passes through unchanged without decay!
- **Residual skip connections (ResNet)**: Adds identity shortcut $\\mathbf{x} + \\mathcal{F}(\\mathbf{x})$, enabling $\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{x}} = \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{y}}(1 + \\frac{\\partial \\mathcal{F}}{\\partial \\mathbf{x}})$, guaranteeing gradient $\\ge 1$.`,
        formulaBox: '\\text{Sigmoid Max Derivative} = 0.25 \\implies (0.25)^L \\to 0 \\text{ (Vanishes)}',
        keyTakeaway: 'In university questions: 1. Explain derivative magnitude bounds, 2. Show exponential product decay, 3. Propose ReLU and ResNet skip connections.',
      },
    ],
    comments: [
      {
        id: 'c1',
        author: 'Arun Kumar (22AIDS012)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        text: 'On page 2, does the Hadamard product symbol circle-dot mean element-wise multiplication?',
        pageNumber: 2,
        timestamp: '2 days ago',
        upvotes: 14,
      },
      {
        id: 'c2',
        author: 'Dr. S. Sundararajan (Faculty)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: 'Yes Arun, circle-dot is the element-wise Schur/Hadamard product because sigma prime acts independently on each neuron scalar pre-activation.',
        pageNumber: 2,
        timestamp: '1 day ago',
        upvotes: 28,
        isFacultyReply: true,
      },
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'What is the maximum theoretical value of the derivative of the standard Sigmoid activation function?',
        options: ['1.0', '0.5', '0.25', '0.0'],
        correctIndex: 2,
        explanation: 'For Sigmoid sigma(z) = 1/(1+e^(-z)), derivative sigma\'(z) = sigma(z)(1 - sigma(z)). At z=0, sigma(0)=0.5, so 0.5 * 0.5 = 0.25.',
      },
      {
        id: 'q2',
        question: 'How do Residual connections in ResNet mathematically eliminate the vanishing gradient problem?',
        options: [
          'By forcing weights to strictly positive values',
          'By adding an identity term (+1) in the chain rule gradient expression',
          'By doubling the learning rate dynamically at each step',
          'By replacing backpropagation with genetic algorithms',
        ],
        correctIndex: 1,
        explanation: 'Because y = F(x) + x, dy/dx = dF/dx + 1. Even if dF/dx vanishes to 0, the +1 term guarantees gradient flow directly to earlier layers.',
      },
      {
        id: 'q3',
        question: 'Which mathematical operation is used between the backpropagated error vector and incoming activation to obtain the weight gradient matrix?',
        options: ['Dot product', 'Outer product', 'Cross product', 'Kronecker delta'],
        correctIndex: 1,
        explanation: 'The weight gradient dL/dW^(l) = delta^(l) * (a^(l-1))^T, which is an outer product producing an (m x n) matrix matching the weight dimensions.',
      },
    ],
    flashcards: [
      {
        id: 'fc1',
        topic: 'Error Vector Delta',
        question: 'What does delta^(l) represent in backpropagation?',
        answer: 'The partial derivative of the scalar loss with respect to pre-activation vector z^(l): dL / dz^(l).',
      },
      {
        id: 'fc2',
        topic: 'Vanishing Gradients',
        question: 'Why does ReLU prevent vanishing gradients for positive inputs?',
        answer: 'Because for any positive activation (z > 0), the gradient derivative of ReLU is exactly 1, passing signals without fractional decay.',
      },
    ],
  },
  {
    id: 'note-nlp-transformers',
    title: 'Transformer Architecture & Scaled Dot-Product Attention (Unit 4 Master Kit)',
    subjectId: 'nlp',
    subjectName: 'Natural Language Processing',
    unitNumber: 4,
    semester: 6,
    fileType: 'cheatsheet',
    author: {
      name: 'Sneha Patel',
      rollNo: '22AIDS078',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      karma: 380,
      badge: 'NLP Specialist',
      isTopper: true,
    },
    verifiedByFaculty: true,
    verifiedFacultyName: 'Prof. Rajesh Khanna (Head - Data Science Lab)',
    uploadDate: 'Oct 11, 2026',
    rating: 4.98,
    ratingsCount: 112,
    upvotes: 189,
    views: 2450,
    downloads: 890,
    pageCount: 3,
    description: 'High-yield exam cheatsheet covering Queries, Keys, Values projection, Scaled Dot-Product formula with variance derivation, Multi-Head Attention, Positional Encodings, and BERT vs GPT differences.',
    tags: ['Transformer', 'Self-Attention', 'Multi-Head Attention', 'Positional Encoding', 'Unit 4 Exam Essential'],
    keyFormulas: [
      '\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{QK^T}{\\sqrt{d_k}} \\right) V',
      '\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h)W^O',
      'PE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Why Transformers Replaced RNNs and LSTMs',
        subheading: 'Parallelization bottleneck and sequential degradation',
        content: `Before the 2017 landmark paper *"Attention Is All You Need"*, sequential models (RNNs/LSTMs) possessed a fatal structural flaw:
$$\\mathbf{h}_t = f(\\mathbf{h}_{t-1}, \\mathbf{x}_t)$$

1. **Strictly Sequential Computation**: To compute state $t$, you MUST wait for state $t-1$. This prevents GPU hardware parallelization during training across long sequence lengths.
2. **Information Bottleneck & Path Length**: The gradient path between token 1 and token 100 has length $O(N)$, causing severe forgetting and vanishing gradients despite gating units.
3. **Transformer Solution**: Self-attention computes relations between **all token pairs directly in $O(1)$ operations**, enabling $100\\%$ parallelization across the sequence dimension.`,
        formulaBox: '\\text{Path length in RNN} = O(N) \\quad \\text{vs} \\quad \\text{Path length in Attention} = O(1)',
        keyTakeaway: 'Always highlight O(1) path length and total training parallelizability as the two prime advantages in university exam questions.',
      },
      {
        pageNumber: 2,
        heading: 'Scaled Dot-Product Attention: The Mathematical Derivation',
        subheading: 'Why do we divide by sqrt(d_k)?',
        content: `Given an input matrix $\\mathbf{X} \\in \\mathbb{R}^{n \\times d_{model}}$, we project into Queries ($\\mathbf{Q}$), Keys ($\\mathbf{K}$), and Values ($\\mathbf{V}$):
$$\\mathbf{Q} = \\mathbf{X} \\mathbf{W}^Q, \\quad \\mathbf{K} = \\mathbf{X} \\mathbf{W}^K, \\quad \\mathbf{V} = \\mathbf{X} \\mathbf{W}^V$$

The similarity between token $i$ and token $j$ is calculated by the inner product $\\mathbf{q}_i \\cdot \\mathbf{k}_j = \\sum_{m=1}^{d_k} q_{im} k_{jm}$.

**The Variance Problem**:
Assume components of $\\mathbf{q}_i$ and $\\mathbf{k}_j$ are independent random variables with zero mean and unit variance ($E=0, \\text{Var}=1$).
Then the dot product $S = \\sum_{m=1}^{d_k} q_{im} k_{jm}$ has:
- Mean: $E[S] = 0$
- Variance: $\\text{Var}(S) = \\sum_{m=1}^{d_k} \\text{Var}(q_{im} k_{jm}) = d_k$

For large dimensions (e.g. $d_k = 64$ or $128$), the standard deviation is $\\sqrt{d_k} = 8$ or $11.3$. Large magnitude values push the Softmax function into saturation regimes where gradients are virtually zero!

Dividing by $\\sqrt{d_k}$ normalizes the variance back to $1.0$, guaranteeing stable gradient flow!`,
        formulaBox: '\\text{Var}(q \\cdot k) = d_k \\implies \\text{Var}\\left( \\frac{q \\cdot k}{\\sqrt{d_k}} \\right) = 1.0',
        keyTakeaway: 'The scaling factor 1/sqrt(d_k) prevents softmax saturation and vanishing backpropagation gradients.',
      },
      {
        pageNumber: 3,
        heading: 'Multi-Head Attention & Positional Encoding',
        subheading: 'Attending to multiple semantic subspaces concurrently',
        content: `Instead of performing a single attention function with $d_{model}$-dimensional queries, keys, and values, Multi-Head Attention projects them $h$ times with learned linear projections:

$$\\text{head}_i = \\text{Attention}(\\mathbf{Q}\\mathbf{W}_i^Q, \\mathbf{K}\\mathbf{W}_i^K, \\mathbf{V}\\mathbf{W}_i^V)$$
$$\\text{MultiHead}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h) \\mathbf{W}^O$$

**Positional Encoding**:
Because self-attention is permutation-invariant (order-agnostic), positional information must be injected:
$$PE_{(pos, 2i)} = \\sin\\left( \\frac{pos}{10000^{2i/d_{model}}} \\right)$$
$$PE_{(pos, 2i+1)} = \\cos\\left( \\frac{pos}{10000^{2i/d_{model}}} \\right)$$
Using sinusoids allows the model to easily learn relative positions via linear combinations: $\\cos(\\alpha + \\beta) = \\cos \\alpha \\cos \\beta - \\sin \\alpha \\sin \\beta$.`,
        codeSnippet: {
          language: 'python',
          code: `import torch
import torch.nn as nn
import math

class ScaledDotProductAttention(nn.Module):
    def __init__(self, d_k):
        super().__init__()
        self.scale = math.sqrt(d_k)
        
    def forward(self, Q, K, V, mask=None):
        scores = torch.matmul(Q, K.transpose(-2, -1)) / self.scale
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attn_weights = torch.softmax(scores, dim=-1)
        return torch.matmul(attn_weights, V), attn_weights`,
        },
        keyTakeaway: 'Sinusoidal positional encoding gives the model inductive bias for infinite sequence interpolation without retraining.',
      },
    ],
    comments: [
      {
        id: 'c3',
        author: 'Vignesh M. (22AIDS019)',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        text: 'This variance explanation is 100x clearer than the textbook. Thank you Sneha!',
        pageNumber: 2,
        timestamp: '3 days ago',
        upvotes: 31,
      },
    ],
    quizQuestions: [
      {
        id: 'q4',
        question: 'Why is Self-Attention permutation-invariant without Positional Encoding?',
        options: [
          'Because Softmax ignores matrix rows',
          'Because inner products and weighted sums operate on set elements independent of token index ordering',
          'Because GPUs shuffle token orders automatically',
          'Because Queries and Keys must always be equal',
        ],
        correctIndex: 1,
        explanation: 'If you permute the input sequence rows in X, the computed attention matrix and output rows are permuted identically. Hence positional encodings must be explicitly added.',
      },
      {
        id: 'q5',
        question: 'In Scaled Dot-Product Attention, what is the role of masking with -1e9 in decoder self-attention?',
        options: [
          'To prevent memory buffer leaks',
          'To prevent tokens from attending to subsequent future tokens (causal masking)',
          'To force weights to become zero during testing',
          'To speed up floating point arithmetic',
        ],
        correctIndex: 1,
        explanation: 'Setting future token attention scores to -infinity (-1e9) ensures softmax output is exactly 0, preventing future information leakage during autoregressive decoding.',
      },
    ],
    flashcards: [
      {
        id: 'fc3',
        topic: 'Attention Scaling',
        question: 'What happens if we remove the 1/sqrt(d_k) factor in attention?',
        answer: 'Variance becomes d_k. For large d_k, dot products grow huge, causing Softmax to saturate and produce near-zero backprop gradients.',
      },
      {
        id: 'fc4',
        topic: 'BERT vs GPT',
        question: 'What is the structural difference between BERT and GPT?',
        answer: 'BERT uses the bidirectional Transformer Encoder (masked language modeling); GPT uses the autoregressive Transformer Decoder with causal masking.',
      },
    ],
  },
  {
    id: 'note-ml-svm',
    title: 'SVMs, Dual Lagrangian & Kernel Trick (Solved Numerical Notes)',
    subjectId: 'machine-learning',
    subjectName: 'Machine Learning Techniques',
    unitNumber: 3,
    semester: 5,
    fileType: 'digital',
    author: {
      name: 'Rithvik Menon',
      rollNo: '22AIDS055',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
      karma: 310,
      badge: 'ML Enthusiast',
      isTopper: false,
    },
    verifiedByFaculty: true,
    verifiedFacultyName: 'Dr. Meenakshi Sundaram (Professor)',
    uploadDate: 'Oct 09, 2026',
    rating: 4.88,
    ratingsCount: 64,
    upvotes: 95,
    views: 1420,
    downloads: 480,
    pageCount: 3,
    description: 'Primal vs Dual formulation derivation, Karush-Kuhn-Tucker (KKT) conditions, Slack variables (C hyperparameter), and Mercer condition for RBF/Polynomial Kernels with university solved numericals.',
    tags: ['SVM', 'Lagrangian Dual', 'KKT Conditions', 'Kernel Trick', 'Unit 3 Numericals'],
    keyFormulas: [
      '\\text{Margin} = \\frac{2}{\\|\\mathbf{w}\\|} \\implies \\min_{\\mathbf{w}, b} \\frac{1}{2} \\|\\mathbf{w}\\|^2 \\quad \\text{s.t.} \\quad y_i(\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1',
      '\\mathcal{L}_D(\\boldsymbol{\\alpha}) = \\sum_{i=1}^N \\alpha_i - \\frac{1}{2} \\sum_{i=1}^N \\sum_{j=1}^N \\alpha_i \\alpha_j y_i y_j (\\mathbf{x}_i \\cdot \\mathbf{x}_j)',
      'K(\\mathbf{x}, \\mathbf{z}) = \\exp\\left( -\\gamma \\|\\mathbf{x} - \\mathbf{z}\\|^2 \\right)',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Maximum Margin Hyperplane Formulation',
        subheading: 'From geometric distance to quadratic optimization',
        content: `Given a linearly separable training dataset $\\{(\\mathbf{x}_i, y_i)\\}_{i=1}^N$ where $y_i \\in \\{-1, +1\\}$, Support Vector Machines aim to identify the unique hyperplane:
$$\\mathbf{w}^T \\mathbf{x} + b = 0$$
which separates the classes with the maximum geometric margin $\\gamma$.

The geometric distance of any point $\\mathbf{x}_i$ to the separating hyperplane is:
$$\\gamma_i = \\frac{y_i (\\mathbf{w}^T \\mathbf{x}_i + b)}{\\|\\mathbf{w}\\|}$$

By scaling $\\mathbf{w}$ such that the closest support vectors satisfy $y_i (\\mathbf{w}^T \\mathbf{x}_i + b) = 1$, the margin width between positive and negative canonical hyperplanes becomes:
$$\\text{Total Margin Width} = \\frac{2}{\\|\\mathbf{w}\\|}$$

Maximizing $\\frac{2}{\\|\\mathbf{w}\\|}$ is equivalent to minimizing $\\frac{1}{2} \\|\\mathbf{w}\\|^2$ subject to $y_i (\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1, \\forall i$.`,
        formulaBox: '\\min_{\\mathbf{w}, b} \\frac{1}{2} \\|\\mathbf{w}\\|^2 \\quad \\text{subject to } y_i(\\mathbf{w}^T \\mathbf{x}_i + b) \\ge 1',
        keyTakeaway: 'The factor 1/2 in 1/2||w||^2 is chosen deliberately so differentiation yields clean w without a constant factor 2.',
      },
      {
        pageNumber: 2,
        heading: 'Lagrangian Dual & KKT Complementary Slackness',
        subheading: 'Why non-support vectors have alpha_i = 0',
        content: `We introduce Lagrange multipliers $\\alpha_i \\ge 0$ to construct the Primal Lagrangian:
$$\\mathcal{L}_P(\\mathbf{w}, b, \\boldsymbol{\\alpha}) = \\frac{1}{2} \\|\\mathbf{w}\\|^2 - \\sum_{i=1}^N \\alpha_i \\left[ y_i(\\mathbf{w}^T \\mathbf{x}_i + b) - 1 \\right]$$

Setting partial derivatives with respect to primal variables to zero:
$$\\frac{\\partial \\mathcal{L}_P}{\\partial \\mathbf{w}} = 0 \\implies \\mathbf{w} = \\sum_{i=1}^N \\alpha_i y_i \\mathbf{x}_i$$
$$\\frac{\\partial \\mathcal{L}_P}{\\partial b} = 0 \\implies \\sum_{i=1}^N \\alpha_i y_i = 0$$

Substituting these back into $\\mathcal{L}_P$ eliminates primal variables, producing the **Dual Objective**:
$$\\max_{\\boldsymbol{\\alpha}} \\sum_{i=1}^N \\alpha_i - \\frac{1}{2} \\sum_{i=1}^N \\sum_{j=1}^N \\alpha_i \\alpha_j y_i y_j (\\mathbf{x}_i \\cdot \\mathbf{x}_j)$$
Subject to: $\\sum_{i=1}^N \\alpha_i y_i = 0$ and $\\alpha_i \\ge 0$.

**KKT Complementary Slackness Condition**:
$$\\alpha_i \\left[ y_i (\\mathbf{w}^T \\mathbf{x}_i + b) - 1 \\right] = 0$$
- If point $i$ is NOT on the margin, $y_i (\\mathbf{w}^T \\mathbf{x}_i + b) > 1$, which forces $\\alpha_i = 0$!
- Only points on the margin boundary have $\\alpha_i > 0$. These are the **Support Vectors**!`,
        formulaBox: '\\alpha_i > 0 \\iff y_i(\\mathbf{w}^T \\mathbf{x}_i + b) = 1 \\quad \\text{(Only Support Vectors matter)}',
        keyTakeaway: 'Sparsity of alpha is the defining property of SVMs: prediction depends strictly on support vectors, making inference robust to outliers.',
      },
      {
        pageNumber: 3,
        heading: 'The Kernel Trick & Mercer Theorem',
        subheading: 'Implicit mapping to infinite dimensional Hilbert spaces',
        content: `In the dual formulation, data points appear ONLY as dot products: $\\mathbf{x}_i \\cdot \\mathbf{x}_j$.

If data is linearly non-separable in original space $\\mathbb{R}^d$, we map it into a higher-dimensional feature space $\\Phi(\\mathbf{x}) \\in \\mathbb{R}^D$ where it becomes linearly separable.

**The Kernel Trick**:
We never need to compute the explicit coordinates $\\Phi(\\mathbf{x})$. We only evaluate a Kernel function $K(\\mathbf{x}, \\mathbf{z}) = \\Phi(\\mathbf{x}) \\cdot \\Phi(\\mathbf{z})$ directly in input space!

Common Kernels:
1. **Linear**: $K(\\mathbf{x}, \\mathbf{z}) = \\mathbf{x}^T \\mathbf{z}$
2. **Polynomial**: $K(\\mathbf{x}, \\mathbf{z}) = (\\mathbf{x}^T \\mathbf{z} + c)^d$
3. **Radial Basis Function (RBF / Gaussian)**:
$$K(\\mathbf{x}, \\mathbf{z}) = \\exp\\left( -\\gamma \\|\\mathbf{x} - \\mathbf{z}\\|^2 \\right)$$
*Note*: By Taylor expansion $e^u = 1 + u + \\frac{u^2}{2!} + \\dots$, the RBF kernel implicitly maps inputs into an **infinite-dimensional** feature space!`,
        formulaBox: 'K(\\mathbf{x}, \\mathbf{z}) = \\exp(-\\gamma \\|\\mathbf{x} - \\mathbf{z}\\|^2) \\implies \\text{Infinite-Dimensional Feature Space}',
        keyTakeaway: 'Mercer theorem states that any continuous, symmetric, positive semi-definite matrix defines a valid kernel.',
      },
    ],
    comments: [
      {
        id: 'c4',
        author: 'Dinesh Karthik (22AIDS029)',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        text: 'Great derivation! In our Semester 5 model exam, they asked how gamma in RBF affects overfitting. Can anyone explain?',
        pageNumber: 3,
        timestamp: '4 days ago',
        upvotes: 18,
      },
      {
        id: 'c5',
        author: 'Rithvik Menon (Author)',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        text: 'High gamma means high curvature (small radius of influence), creating tight islands around points -> Overfitting. Low gamma creates smooth decision boundary -> potential underfitting.',
        pageNumber: 3,
        timestamp: '4 days ago',
        upvotes: 24,
      },
    ],
    quizQuestions: [
      {
        id: 'q6',
        question: 'What is the role of the hyperparameter C in Soft-Margin SVM?',
        options: [
          'It sets the degree of the polynomial kernel',
          'It controls the trade-off between maximizing margin width and penalizing margin slack violations',
          'It normalizes the training data between 0 and 1',
          'It sets the number of support vectors to retain',
        ],
        correctIndex: 1,
        explanation: 'In soft-margin SVM, objective is min 1/2||w||^2 + C * sum(xi_i). Large C strictly penalizes errors (narrow margin, prone to overfitting). Small C permits some violations (wider margin, higher bias).',
      },
    ],
    flashcards: [
      {
        id: 'fc5',
        topic: 'Support Vectors',
        question: 'What happens to alpha_i for points outside the margin?',
        answer: 'By KKT complementary slackness, alpha_i is exactly 0. They exert zero influence on the separating hyperplane.',
      },
    ],
  },
  {
    id: 'note-bigdata-hdfs',
    title: 'Hadoop HDFS Architecture & MapReduce Execution Flow (Unit 1 & 2 PYQs Solved)',
    subjectId: 'big-data',
    subjectName: 'Big Data Analytics & Systems',
    unitNumber: 1,
    semester: 5,
    fileType: 'pyq',
    author: {
      name: 'Harini Balakrishnan',
      rollNo: '22AIDS015',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      karma: 450,
      badge: 'Gold Contributor',
      isTopper: true,
    },
    verifiedByFaculty: true,
    verifiedFacultyName: 'Dr. G. Sivakumar (Prof - Systems Engineering)',
    uploadDate: 'Oct 07, 2026',
    rating: 4.92,
    ratingsCount: 77,
    upvotes: 130,
    views: 1980,
    downloads: 710,
    pageCount: 3,
    description: 'NameNode vs DataNode heartbeat & block report protocols, EditLog and FsImage checkpointing, MapReduce Shuffle & Sort phase mechanics, and past 3 years university question papers solved with diagrams.',
    tags: ['HDFS', 'MapReduce', 'Shuffle and Sort', 'NameNode HA', 'Solved PYQs'],
    keyFormulas: [
      '\\text{HDFS Default Block Size} = 128\\text{MB} \\quad (\\text{prev } 64\\text{MB})',
      '\\text{Replication Factor} = 3 \\quad (\\text{Rack-aware: 1 local, 1 off-rack node 1, 1 off-rack node 2})',
      '\\text{Map Phase Output} = \\text{List}\\langle k_2, v_2 \\rangle \\to \\text{Shuffle/Sort} \\to \\text{Reduce}\\langle k_2, \\text{List}\\langle v_2 \\rangle \\rangle',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'HDFS Master-Worker Architecture',
        subheading: 'NameNode metadata management & Secondary NameNode role',
        content: `The Hadoop Distributed File System (HDFS) adopts a master-worker paradigm designed to run on commodity hardware:

1. **NameNode (Master)**:
   - Maintains the filesystem namespace tree and block metadata mapping ($/user/data/log.csv \\to \\{B_1, B_2, B_3\\}$).
   - Stores metadata entirely in RAM for sub-millisecond retrieval.
   - Persists state across crashes using two disk structures:
     - **FsImage**: Complete point-in-time snapshot of the namespace.
     - **EditLog**: Transaction journal recording modifications made since FsImage creation.
2. **DataNodes (Workers)**:
   - Store and retrieve raw physical 128MB data blocks on local Linux ext4/xfs disks.
   - Send periodic **Heartbeats** (every 3 seconds) and **Block Reports** (every 6 hours) to the NameNode.
3. **Secondary NameNode (Helper, NOT a hot standby!)**:
   - Performs periodic **Checkpointing**: Merges current FsImage with EditLog to prevent EditLog from bloating uncontrollably.`,
        formulaBox: '\\text{FsImage}_{new} = \\text{FsImage}_{old} + \\text{EditLog} \\quad (\\text{Checkpointing by SecNameNode})',
        keyTakeaway: 'Critical Exam Trap: Secondary NameNode is NOT an automatic failover backup. In Hadoop 2.x/3.x, High Availability uses Quorum Journal Manager (QJM) with Zookeeper.',
      },
      {
        pageNumber: 2,
        heading: 'Rack Awareness & Data Placement Policy',
        subheading: 'Balancing network bandwidth and fault tolerance',
        content: `Default HDFS replication factor is 3. To balance read/write throughput against catastrophic switch failure, Hadoop employs the **Rack Awareness Algorithm**:

- **Replica 1**: Placed on the local node where the writer client is running (or a random node if client is external to cluster).
- **Replica 2**: Placed on a completely different rack (Rack B), guarding against entire rack power/switch outage.
- **Replica 3**: Placed on the same remote rack (Rack B) but on a different DataNode.

This 2-rack policy cuts intra-rack network hopping during replication pipelines while preserving fault-tolerance against switch failures.`,
        formulaBox: '\\text{Replica Placement: } [\\text{Rack 1: Node A}] \\quad [\\text{Rack 2: Node B}] \\quad [\\text{Rack 2: Node C}]',
        keyTakeaway: 'Draw the 2-rack diagram with 3 DataNodes in 8-mark questions to earn full credits.',
      },
      {
        pageNumber: 3,
        heading: 'MapReduce Execution Pipeline & Shuffle Phase',
        subheading: 'The inner mechanics of the Shuffle & Sort engine',
        content: `MapReduce transforms input datasets through three sequential phases:

$$\\text{Input} \\to \\text{Map} \\to \\text{Shuffle \\& Sort} \\to \\text{Reduce} \\to \\text{Output}$$

**The Shuffle Phase**:
1. **In-Memory Buffer Spill**: Map tasks write key-value pairs to a circular memory buffer (default 100MB). When buffer occupancy hits $80\\%$, a background thread spills sorted data to disk.
2. **Partitioning**: The default HashPartitioner maps keys to reducers:
$$\\text{Reducer ID} = \\text{hash}(key) \\pmod{\\text{numReduceTasks}}$$
3. **Merge Sort**: Spilled on-disk segments are merged into a single sorted, partitioned file.
4. **Copy & Sort on Reducer**: Reducers fetch their corresponding partition over HTTP and merge sorted streams before invoking \`reduce(key, Iterable<values>)\`.`,
        codeSnippet: {
          language: 'java',
          code: `// Standard MapReduce WordCount Reducer implementation
public static class IntSumReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
    private IntWritable result = new IntWritable();

    public void reduce(Text key, Iterable<IntWritable> values, Context context) 
        throws IOException, InterruptedException {
        int sum = 0;
        for (IntWritable val : values) {
            sum += val.get();
        }
        result.set(sum);
        context.write(key, result);
    }
}`,
        },
        keyTakeaway: 'The Shuffle and Sort phase is the most expensive phase in MapReduce due to disk I/O and network transfer.',
      },
    ],
    comments: [
      {
        id: 'c6',
        author: 'Swaminathan (22AIDS090)',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        text: 'The explanation of the 80% buffer spill threshold saved me on the last mid-term!',
        pageNumber: 3,
        timestamp: '5 days ago',
        upvotes: 21,
      },
    ],
    quizQuestions: [
      {
        id: 'q7',
        question: 'What is the default block size in modern Apache Hadoop 3.x installations?',
        options: ['64 KB', '4 MB', '128 MB', '1 GB'],
        correctIndex: 2,
        explanation: 'Modern Hadoop defaults to 128 MB blocks to minimize seek time relative to sequential transfer transfer time.',
      },
    ],
    flashcards: [
      {
        id: 'fc6',
        topic: 'NameNode Metadata',
        question: 'What are the two persistent files maintained for NameNode recovery?',
        answer: 'FsImage (complete snapshot of namespace) and EditLog (journal of recent mutations since FsImage).',
      },
    ],
  },
  {
    id: 'note-cv-yolo',
    title: 'Object Detection: R-CNN, Faster R-CNN vs YOLOv8 Architecture',
    subjectId: 'computer-vision',
    subjectName: 'Computer Vision & Image Processing',
    unitNumber: 4,
    semester: 6,
    fileType: 'digital',
    author: {
      name: 'Aditya Varma',
      rollNo: '22AIDS003',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      karma: 290,
      badge: 'Vision Pro',
      isTopper: false,
    },
    verifiedByFaculty: false,
    uploadDate: 'Oct 04, 2026',
    rating: 4.82,
    ratingsCount: 45,
    upvotes: 82,
    views: 1190,
    downloads: 390,
    pageCount: 3,
    description: 'Two-stage vs One-stage object detectors, Region Proposal Network (RPN) anchor boxes, Non-Maximum Suppression (NMS), IoU calculations, and YOLO single-pass grid cell regression.',
    tags: ['YOLOv8', 'Faster R-CNN', 'IoU', 'Non-Maximum Suppression', 'Object Detection'],
    keyFormulas: [
      '\\text{IoU} = \\frac{\\text{Area of Overlap}}{\\text{Area of Union}} = \\frac{B_p \\cap B_g}{B_p \\cup B_g}',
      '\\text{YOLO Grid Loss} = \\lambda_{\\text{coord}} \\mathcal{L}_{\\text{box}} + \\mathcal{L}_{\\text{obj}} + \\lambda_{\\text{noobj}} \\mathcal{L}_{\\text{noobj}} + \\mathcal{L}_{\\text{class}}',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Two-Stage vs One-Stage Detectors',
        subheading: 'Trading inference latency for dense proposal accuracy',
        content: `Object detection requires solving two tasks simultaneously:
1. **Localization**: Determining bounding box coordinates $(x, y, w, h)$.
2. **Classification**: Assigning category probability vector to the localized box.

- **Two-Stage Detectors (R-CNN, Fast R-CNN, Faster R-CNN)**:
  - Stage 1: Propose candidate object regions using Region Proposal Networks (RPN).
  - Stage 2: Crop features via RoI Pooling/RoIAlign and classify each region.
  - *Trade-off*: High mAP precision, but high latency ($\approx 5-15$ FPS), unsuitable for real-time edge devices.
- **One-Stage Detectors (SSD, YOLO family)**:
  - Directly predict class probabilities and bounding box coordinates from whole images in a single forward evaluation pass!
  - *Trade-off*: Ultra-fast inference ($>60-140$ FPS) at comparable mAP precision.`,
        formulaBox: '\\text{Two-Stage: RPN} \\to \\text{RoIAlign} \\to \\text{Head} \\quad \\text{vs} \\quad \\text{One-Stage: Image} \\to \\text{Dense Grid Output}',
        keyTakeaway: 'Remember: Faster R-CNN replaced selective search with RPN, making region proposals GPU-accelerated.',
      },
      {
        pageNumber: 2,
        heading: 'YOLO (You Only Look Once) Grid Cell Mechanics',
        subheading: 'Single-shot regression with anchor-free head',
        content: `In YOLO, the input image is divided into an $S \\times S$ grid. If an object\'s center falls within a grid cell, that specific cell is responsible for detecting the object.

Each grid cell predicts:
- $B$ bounding box candidates: $(t_x, t_y, t_w, t_h)$ along with an objectness confidence score $P(\\text{Object}) \\times \\text{IoU}$.
- $C$ conditional class probabilities $P(\\text{Class}_i | \\text{Object})$.

**Non-Maximum Suppression (NMS)**:
Because multiple neighboring grid cells and anchor priors fire for the same physical object:
1. Discard boxes with objectness score $< \\tau_{\\text{conf}}$ (e.g. 0.25).
2. Pick the box with highest remaining score, output it as final prediction.
3. Suppress all other overlapping boxes having $\\text{IoU} > \\tau_{\\text{iou}}$ (e.g. 0.45).
4. Repeat iteratively until no candidates remain.`,
        formulaBox: '\\text{NMS Criterion: If } \\text{IoU}(B_{\\text{best}}, B_j) > 0.45 \\implies \\text{Discard } B_j',
        keyTakeaway: 'NMS is a post-processing heuristic that removes redundant overlapping candidate bounding boxes.',
      },
      {
        pageNumber: 3,
        heading: 'IoU Calculation Numerical & Code Sample',
        subheading: 'Intersection over Union step-by-step',
        content: `Given predicted box $B_p = [x_1, y_1, x_2, y_2]$ and ground truth box $B_g = [x'_1, y'_1, x'_2, y'_2]$:

$$\\text{Intersection Box} = [\\max(x_1, x'_1), \\max(y_1, y'_1), \\min(x_2, x'_2), \\min(y_2, y'_2)]$$
$$W_I = \\max(0, x_{2I} - x_{1I}), \\quad H_I = \\max(0, y_{2I} - y_{1I})$$
$$\\text{Area}_I = W_I \\times H_I$$
$$\\text{IoU} = \\frac{\\text{Area}_I}{\\text{Area}_p + \\text{Area}_g - \\text{Area}_I}$$

If $\\text{IoU} \\ge 0.5$, the prediction is generally counted as a True Positive (TP) in PASCAL VOC benchmarks.`,
        codeSnippet: {
          language: 'python',
          code: `def calculate_iou(boxA, boxB):
    # box format: [x1, y1, x2, y2]
    xA = max(boxA[0], boxB[0])
    yA = max(boxA[1], boxB[1])
    xB = min(boxA[2], boxB[2])
    yB = min(boxA[3], boxB[3])

    interArea = max(0, xB - xA) * max(0, yB - yA)
    boxAArea = (boxA[2] - boxA[0]) * (boxA[3] - boxA[1])
    boxBArea = (boxB[2] - boxB[0]) * (boxB[3] - boxB[1])

    iou = interArea / float(boxAArea + boxBArea - interArea + 1e-6)
    return iou`,
        },
        keyTakeaway: 'Adding 1e-6 in the denominator prevents division by zero when bounding boxes degenerate.',
      },
    ],
    comments: [
      {
        id: 'c7',
        author: 'Priya Dharshini (22AIDS063)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        text: 'The NMS algorithm step list is super crisp. Great for our 2-mark viva questions.',
        pageNumber: 2,
        timestamp: '1 week ago',
        upvotes: 11,
      },
    ],
    quizQuestions: [
      {
        id: 'q8',
        question: 'What is the purpose of Non-Maximum Suppression (NMS) in object detection pipelines?',
        options: [
          'To increase image resolution',
          'To eliminate duplicate overlapping bounding boxes predicting the same object',
          'To normalize color intensities',
          'To train the convolutional kernels',
        ],
        correctIndex: 1,
        explanation: 'NMS removes multiple overlapping candidate bounding boxes for the same target object based on an IoU overlap threshold.',
      },
    ],
    flashcards: [
      {
        id: 'fc7',
        topic: 'IoU Threshold',
        question: 'What is the standard IoU threshold for counting a detection as a True Positive in PASCAL VOC?',
        answer: 'IoU >= 0.5 (or 50% overlap).',
      },
    ],
  },
  {
    id: 'note-opt-adam',
    title: 'Optimization in AI: SGD, Momentum, RMSprop & Adam Formula Sheet',
    subjectId: 'optimization',
    subjectName: 'Optimization Techniques in AI',
    unitNumber: 3,
    semester: 5,
    fileType: 'cheatsheet',
    author: {
      name: 'Naveen Kumar',
      rollNo: '22AIDS049',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
      karma: 260,
      badge: 'Math Whiz',
      isTopper: false,
    },
    verifiedByFaculty: true,
    verifiedFacultyName: 'Dr. T. Ramanathan (Professor)',
    uploadDate: 'Oct 01, 2026',
    rating: 4.90,
    ratingsCount: 52,
    upvotes: 91,
    views: 1310,
    downloads: 510,
    pageCount: 2,
    description: 'Concise formula cheat sheet tracking evolution of first-order optimizers: SGD with Nesterov momentum, AdaGrad learning rate decay, RMSprop exponential moving average, and Adam bias corrections.',
    tags: ['Optimization', 'Adam Optimizer', 'Gradient Descent', 'Learning Rate', 'Formula Sheet'],
    keyFormulas: [
      'm_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t \\quad (\\text{1st moment - Mean})',
      'v_t = \\beta_2 v_{t-1} + (1 - \\beta_2) g_t^2 \\quad (\\text{2nd moment - Uncentered Variance})',
      '\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t} \\quad (\\text{Bias Corrections})',
      '\\theta_{t+1} = \\theta_t - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Evolution of Gradient Optimization Algorithms',
        subheading: 'From standard SGD to Adaptive Moments',
        content: `Standard Gradient Descent struggles with:
1. Ravines / Pathological Curvature: where surfaces curve much more steeply in one dimension than another.
2. Saddle Points: where gradient is zero but surface is neither a local minimum nor maximum.

- **Stochastic Gradient Descent (SGD)**:
$$\\theta_{t+1} = \\theta_t - \\eta \\nabla_\\theta \\mathcal{L}(\\theta_t)$$
Suffers from high variance oscillations.

- **SGD with Classical Momentum**:
$$v_t = \\gamma v_{t-1} + \\eta \\nabla_\\theta \\mathcal{L}(\\theta_t)$$
$$\\theta_{t+1} = \\theta_t - v_t$$
Accumulates velocity in persistent directions while damping orthogonal oscillations.

- **RMSprop (Root Mean Square Propagation)**:
Resolves AdaGrad's radically diminishing learning rate by maintaining an exponentially decaying average of squared gradients:
$$v_t = \\beta v_{t-1} + (1 - \\beta) g_t^2$$
$$\\theta_{t+1} = \\theta_t - \\frac{\\eta}{\\sqrt{v_t + \\epsilon}} g_t$$`,
        formulaBox: '\\text{Adam} = \\text{RMSprop (Adaptive Learning Rate)} + \\text{Momentum (Directional Velocity)}',
        keyTakeaway: 'Adam combines the benefits of both Momentum (first moment of gradients) and RMSprop (second moment of gradients).',
      },
      {
        pageNumber: 2,
        heading: 'Adam (Adaptive Moment Estimation) Complete Formulation',
        subheading: 'Why bias correction terms (1 - beta^t) are mathematically vital',
        content: `Adam initializes $m_0 = 0$ and $v_0 = 0$. Since vectors are initialized at zero, the estimates are biased towards zero, especially during early time steps ($t=1, 2, 3$).

**The Bias Correction Derivation**:
Expanding $v_t$:
$$v_t = (1 - \\beta_2) \\sum_{i=1}^t \\beta_2^{t-i} g_i^2$$
Taking expectations on both sides:
$$\\mathbb{E}[v_t] = \\mathbb{E}\\left[ (1 - \\beta_2) \\sum_{i=1}^t \\beta_2^{t-i} g_i^2 \\right] = \\mathbb{E}[g_t^2] (1 - \\beta_2) \\sum_{i=1}^t \\beta_2^{t-i} = \\mathbb{E}[g_t^2] (1 - \\beta_2^t)$$

Therefore, dividing by $(1 - \\beta_2^t)$ normalizes the expectation:
$$\\mathbb{E}[\\hat{v}_t] = \\mathbb{E}\\left[ \\frac{v_t}{1 - \\beta_2^t} \\right] = \\mathbb{E}[g_t^2]$$

Default hyperparameters recommended in original Kingma & Ba paper:
- Learning rate $\\eta = 0.001$
- $\\beta_1 = 0.9$
- $\\beta_2 = 0.999$
- $\\epsilon = 10^{-8}$`,
        formulaBox: '\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}',
        keyTakeaway: 'As t -> infinity, beta^t -> 0 and the bias correction factor (1 - beta^t) approaches 1.0 automatically.',
      },
    ],
    comments: [],
    quizQuestions: [
      {
        id: 'q9',
        question: 'Why does Adam include the bias correction factor (1 - beta^t)?',
        options: [
          'To prevent memory overflow',
          'To correct for initialization bias towards zero in early training iterations',
          'To enforce L2 regularization on weights',
          'To double the batch size dynamically',
        ],
        correctIndex: 1,
        explanation: 'Since first and second moments are initialized as zero vectors, they are biased toward zero at t=1, 2. The (1 - beta^t) denominator compensates for this.',
      },
    ],
    flashcards: [
      {
        id: 'fc8',
        topic: 'Adam Hyperparameters',
        question: 'What are the standard default values for beta_1 and beta_2 in Adam?',
        answer: 'beta_1 = 0.9 (momentum factor), beta_2 = 0.999 (RMSprop variance factor).',
      },
    ],
  },
  {
    id: 'note-nlp-lab',
    title: 'NLP Lab Manual: Tokenization, POS Tagging, NER with HuggingFace & PyTorch',
    subjectId: 'nlp',
    subjectName: 'Natural Language Processing',
    unitNumber: 2,
    semester: 6,
    fileType: 'lab',
    author: {
      name: 'Pooja Venkatesh',
      rollNo: '22AIDS060',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      karma: 340,
      badge: 'Lab Pro',
      isTopper: true,
    },
    verifiedByFaculty: true,
    verifiedFacultyName: 'Dr. C. Malathy (Lab In-charge)',
    uploadDate: 'Sep 28, 2026',
    rating: 4.96,
    ratingsCount: 59,
    upvotes: 114,
    views: 1650,
    downloads: 640,
    pageCount: 3,
    description: 'Official 3rd Year AIDS NLP practical lab exercises: BPE / WordPiece tokenizer from scratch, Spacy POS pipelines, Named Entity Recognition fine-tuning with RoBERTa on CoNLL-2003, with viva voce questions.',
    tags: ['NLP Lab', 'HuggingFace', 'PyTorch', 'POS Tagging', 'Named Entity Recognition'],
    keyFormulas: [
      '\\text{BPE Merge Criterion} = \\arg\\max_{(c_1, c_2)} \\text{Freq}(c_1, c_2)',
      '\\text{F1 Score} = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}',
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Lab Exercise 1: Byte-Pair Encoding (BPE) Tokenizer',
        subheading: 'Subword tokenization mechanism used in modern LLMs',
        content: `Subword tokenization bridges the gap between Word-level (huge vocabulary, out-of-vocabulary OOV errors) and Character-level (long sequences, weak semantic representation).

**BPE Algorithm**:
1. Initialize vocabulary with all unique individual characters in the corpus.
2. Represent every word in the training corpus as a sequence of characters followed by an end-of-word token \`</w>\`.
3. Iteratively count frequencies of all adjacent pairs of symbols.
4. Merge the most frequent symbol pair $(A, B) \\to AB$ and append the new symbol to vocabulary.
5. Repeat until vocabulary reaches desired size $V$ (e.g., 32,000 or 50,000).`,
        codeSnippet: {
          language: 'python',
          code: `import collections

def get_stats(vocab):
    pairs = collections.defaultdict(int)
    for word, freq in vocab.items():
        symbols = word.split()
        for i in range(len(symbols)-1):
            pairs[symbols[i], symbols[i+1]] += freq
    return pairs

def merge_vocab(pair, v_in):
    v_out = {}
    bigram = ' '.join(pair)
    replacement = ''.join(pair)
    for word in v_in:
        w_out = word.replace(bigram, replacement)
        v_out[w_out] = v_in[word]
    return v_out`,
        },
        keyTakeaway: 'BPE handles unseen morphological compound words gracefully without throwing out-of-vocabulary exceptions.',
      },
      {
        pageNumber: 2,
        heading: 'Lab Exercise 2: Sequence Labeling & NER Fine-Tuning',
        subheading: 'BIO tagging scheme and Cross-Entropy loss over token slots',
        content: `Named Entity Recognition (NER) frames token classification under the **BIO Scheme**:
- **B-PER**: Beginning of a Person entity.
- **I-PER**: Inside of a Person entity.
- **O**: Outside of any recognized entity.

Model architecture:
Input sentence $\\to$ Transformer Encoder (e.g. RoBERTa) $\\to$ Token representations $\\mathbf{h}_1, \\dots, \\mathbf{h}_T \\in \\mathbb{R}^{d}$ $\\to$ Linear Classifier with Softmax over $|\\mathcal{Y}|$ entity classes.`,
        formulaBox: '\\mathcal{L}_{\\text{NER}} = - \\sum_{t=1}^T \\log P(y_t | \\mathbf{x}_{1:T})',
        keyTakeaway: 'Always align subword wordpieces back to the original word first token when calculating token-level entity spans.',
      },
    ],
    comments: [],
    quizQuestions: [
      {
        id: 'q10',
        question: 'Under the BIO tagging scheme in NER, what does "I-LOC" denote?',
        options: [
          'Initial Location',
          'Inside of an ongoing Location entity mention',
          'Ignored Location',
          'International Location identifier',
        ],
        correctIndex: 1,
        explanation: 'B denotes Beginning of an entity, I denotes Inside (continuation of multi-word entity), and O denotes Outside.',
      },
    ],
    flashcards: [
      {
        id: 'fc9',
        topic: 'BPE Tokenizer',
        question: 'Why is BPE superior to whitespace word splitting?',
        answer: 'It retains compact vocabulary while decomposing rare or unseen words into familiar subword morphs, eliminating OOV tokens.',
      },
    ],
  },
];

export const LEADERBOARD_CONTRIBUTORS: ContributorLeaderboardUser[] = [
  {
    rank: 1,
    name: 'Harini Balakrishnan',
    rollNo: '22AIDS015',
    department: '3rd Year AIDS',
    notesUploaded: 14,
    karmaPoints: 450,
    badge: '🏆 Topper of the Month',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  },
  {
    rank: 2,
    name: 'Kavitha Ramachandran',
    rollNo: '22AIDS041',
    department: '3rd Year AIDS',
    notesUploaded: 12,
    karmaPoints: 420,
    badge: '🌟 Deep Learning Ace',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
  {
    rank: 3,
    name: 'Sneha Patel',
    rollNo: '22AIDS078',
    department: '3rd Year AIDS',
    notesUploaded: 10,
    karmaPoints: 380,
    badge: '⚡ NLP Scholar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  {
    rank: 4,
    name: 'Pooja Venkatesh',
    rollNo: '22AIDS060',
    department: '3rd Year AIDS',
    notesUploaded: 9,
    karmaPoints: 340,
    badge: '🧪 Lab Maestro',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  },
  {
    rank: 5,
    name: 'Rithvik Menon',
    rollNo: '22AIDS055',
    department: '3rd Year AIDS',
    notesUploaded: 8,
    karmaPoints: 310,
    badge: '🎯 Numerical Solver',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
  },
  {
    rank: 6,
    name: 'Aditya Varma',
    rollNo: '22AIDS003',
    department: '3rd Year AIDS',
    notesUploaded: 7,
    karmaPoints: 290,
    badge: '👁️ Vision Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
];
