import React, { useState } from 'react';
import spotlightImg from '../assets/images/phone.png';
import hoverMindDemo from '../assets/images/HoverMind_demo.mov';

export default function Projects() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="projects-list">
      {/* Spotlight Project: image left, card right */}
      <div className="spotlight-flex-row">
        <div className="spotlight-flex-img-wrap">
          <img src={spotlightImg} alt="Spotlight App" className="spotlight-flex-img" />
        </div>
        <div className="project-card">
          <h2>Spotlight – IOS Social Networking App</h2>
          <ul>
            <li>Developed an IOS application using React Native for frontend and Supabase as backend for authentication, real-time database management, and cloud storage</li>
            <li>Designed a scalable PostgreSQL database architecture with optimized indexing and querying strategies to support high user engagement</li>
            <li>Implemented asynchronous API calls for seamless data fetching and improved app performance, reducing load times and ensuring a fluid user experience</li>
          </ul>
        </div>
      </div>

      {/* HoverMind Project: card left, demo video right */}
      <div className="spotlight-flex-row">
        <div className="project-card">
          <h2>HoverMind – AI Powered Browser Extension</h2>
          <ul>
            <li>Developed a neat little Chrome extension that enables users to select any text on a webpage and receive AI-generated explanations for technical terms and functions, improving understanding of complex content</li>
            <li>Built frontend using React and TypeScript, with UI inspired by modern tooltips and modal design for minimal distraction and clear comprehension</li>
            <li>Integrated a backend powered by FastAPI and LLM inference (GPT-3.5 Turbo) to generate concise, contextual explanations in real-time</li>
          </ul>
        </div>
        <div className="spotlight-flex-img-wrap" style={{ position: 'relative' }}>
          <video 
            src={hoverMindDemo} 
            alt="HoverMind Demo" 
            className="spotlight-flex-img hover-expand-video" 
            autoPlay 
            loop 
            muted 
            playsInline
            onClick={() => setModalOpen(true)}
            style={{ cursor: 'pointer' }}
          />
          <div className="hover-demo-label">Click to view demo</div>
        </div>
      </div>

      {/* Modal for demo video */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>&times;</button>
            <video 
              src={hoverMindDemo} 
              alt="HoverMind Demo Large" 
              className="modal-video" 
              autoPlay 
              loop 
              muted 
              playsInline
              controls
              style={{ width: '100%', height: 'auto', borderRadius: '1.2rem' }}
            />
          </div>
        </div>
      )}

      {/* Other Projects */}
      <div className="project-card">
        <h2>Real-Time Stock Trading app</h2>
        <ul>
          <li>Developed a full-stack web application for online stock trading, enabling users to buy and sell stocks in real-time. Implemented various features, including stock search, portfolio management, and real-time market data updates</li>
          <li>Engineered frontend leveraging Angular for user interface and TypeScript for programming logic</li>
          <li>Constructed backend REST APIs using Node.js and Express framework to display real-time stock data and handle stock transactions using the Finnhub API service</li>
        </ul>
      </div>
      <div className="project-card">
        <h2>Efficient Fine-Tuning of LLMs for Medical Chatbot Applications</h2>
        <ul>
          <li>Fine-tuned the DeepSeek 8B and Llama 3 8B models using LoRA on the medical-o1-reasoning-SFT-25k dataset to generate clinically relevant, short-form answers for medical chatbot use cases</li>
          <li>Designed an evaluation pipeline incorporating BLEU, BERTScore F1, and LLM-as-a-judge (GPT-4) to assess factual accuracy, reasoning, and clinical safety</li>
          <li>Benchmarked fine-tuned models against leading LLMs (LLaMA 3, Gemini 2 Flash, GPT-4), achieving a 31% improvement in BLEU score, and a 1% boost in BERTScore F1, demonstrating enhanced semantic relevance in medical responses</li>
        </ul>
      </div>
    </div>
  );
} 