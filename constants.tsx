
import React from 'react';

export const COLORS = {
  CYAN: '#00FFFF',
  MAGENTA: '#FF00FF',
  YELLOW: '#FFFF00',
  BLACK: '#000000',
  HIVIS_GREEN: '#39FF14',
  PAPER: '#f5f5f0',
};

export const PROJECTS = [
  {
    id: 1,
    title: 'NORMAL AI',
    fileSize: '45MB',
    date: '2025',
    status: 'ONGOING' as const,
    description: 'AI-POWERED BRAND DESIGN FOR FAST-MOVING FOUNDERS. ENGINEERED BACKEND APIS TO GENERATE CONSISTENT VISUAL OUTPUTS USING GPT-IMAGE-1 WITH DYNAMIC STYLE CONDITIONING.',
    tags: ['LLMS', 'SUPABASE', 'NEXT.JS', 'VERCEL'],
    image: '/assets/normal-ai.png',
    link: 'https://trynormal.ai'
  },
  {
    id: 2,
    title: 'SPOTLIGHT APP',
    fileSize: '120MB',
    date: '2024',
    status: 'COMPLETED' as const,
    description: 'IOS SOCIAL NETWORKING APP. DEVELOPED USING REACT NATIVE AND SUPABASE. DESIGNED SCALABLE POSTGRESQL ARCHITECTURE WITH OPTIMIZED INDEXING STRATEGIES.',
    tags: ['IOS', 'REACT NATIVE', 'POSTGRES', 'MOBILE'],
    image: '/assets/spotlight.png',
    isVertical: true
  },
  {
    id: 3,
    title: 'HOVERMIND',
    fileSize: '12MB',
    date: '2025',
    status: 'COMPLETED' as const,
    description: 'AI POWERED BROWSER EXTENSION. SELECT TEXT TO RECEIVE INSTANT CONTEXTUAL EXPLANATIONS POWERED BY FASTAPI AND GPT-3.5 TURBO.',
    tags: ['CHROME', 'TYPESCRIPT', 'FASTAPI', 'LLM'],
    image: '/assets/hovermind.png'
  }
];

export const EXPERIENCE = [
  {
    version: 'v2026.1',
    status: 'CURRENT BUILD',
    role: 'AI DESIGNER',
    company: 'WARP',
    bullets: [
      'DEFINING NEXT-GEN GENERATIVE UNDERSTANDING IN LOGISTICS.',
      'BRIDGING THE GAP BETWEEN TERMINAL WORKFLOWS AND AI.',
      'SHIPPING HIGH-VELOCITY MIDDLE-MILE SYSTEMS.'
    ]
  },
  {
    version: 'v2026.0',
    status: 'STABLE RELEASE',
    role: 'MACHINE LEARNING ENGINEER',
    company: 'IMAGING GENETICS CENTER [APR 2024 - JAN 2026]',
    bullets: [
      'ENGINEERED 3D VAE FOR MULTI-SITE MRI DATA HARMONIZATION.',
      "OPTIMIZED DENSENET ARCHITECTURES FOR ALZHEIMER'S PROGNOSIS.",
      'ACHIEVED 1.303 MAE ACCURACY ON HYBRID NEUROIMAGING MODELS.'
    ]
  },
  {
    version: 'v2025.2',
    status: 'BETA BRANCH',
    role: 'FOUNDER & LEAD ENGINEER',
    company: 'NORMAL AI',
    bullets: [
      'BUILT MCP-BASED CONTEXT SERVERS FOR BRAND MEMORY.',
      'DEPLOYED DYNAMIC STYLE-CONDITIONING PIPELINES ON NEXT.JS.',
      'INTEGRATED SUPABASE REALTIME FOR PERSISTENT USER SESSIONS.'
    ]
  }
];

export const ASSETS = [
  { name: 'tattoo_flash_01.jpg', url: 'https://picsum.photos/seed/art1/400/500' },
  { name: 'glitch_shader_test.png', url: 'https://picsum.photos/seed/art2/400/400' },
  { name: 'generative_landscape_0x2.png', url: 'https://picsum.photos/seed/art3/500/300' },
  { name: 'brutalist_poster_v1.jpg', url: 'https://picsum.photos/seed/art4/400/600' },
  { name: 'experimental_mesh.obj', url: 'https://picsum.photos/seed/art5/400/400' },
  { name: 'cmyk_distortion_log.png', url: 'https://picsum.photos/seed/art6/400/550' },
];
