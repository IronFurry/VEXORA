import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react';

export const AskVexora = ({ onJoinQueue, onViewSalon }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  const sampleQueries = [
    {
      userQuery: "Mala haircut karaycha aahe. Majhya jawal lavkar konta salon available aahe?",
      lang: "Marathi / Marathi Latin",
      response: "I found 3 salons nearby. Looks & Co. has the shortest queue with an estimated wait of 8 minutes.",
      salon: "Looks & Co.",
      metrics: "★ 4.8 · 0.8 km · 2 waiting"
    },
    {
      userQuery: "Are there any slots available for beard trim and styling within 1 km right now?",
      lang: "English",
      response: "Urban Cuts on Highline Square has zero wait time right now. Chair 4 is immediately available.",
      salon: "Urban Cuts",
      metrics: "★ 4.7 · 1.6 km · Available now"
    }
  ];

  const current = sampleQueries[activeQueryIndex];

  return (
    <section className="section-spacing">
      <div className="container">
        {/* Editorial Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '64px' }}>
          <span className="eyebrow">NATURAL LANGUAGE & VOICE</span>
          <h2 className="section-headline">
            Just tell VEXORA what you need.
          </h2>
          <p className="section-description">
            Find a nearby salon, compare waiting times or join a queue using natural language or voice. Multilingual conversational AI tuned specifically for local barber and salon terminology.
          </p>
        </div>

        {/* Minimalist AI Terminal / Chat Shell */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-white)',
          boxShadow: 'var(--shadow-dashboard)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '18px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '18px',
                height: '18px',
                background: 'var(--bg-black)',
                color: 'var(--text-white)',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.68rem',
                fontWeight: 700
              }}>
                AI
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.88rem' }}>
                ASK VEXORA
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                · MULTILINGUAL VOICE INFERENCE
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setActiveQueryIndex(0)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '3px',
                  border: '1px solid var(--border-subtle)',
                  background: activeQueryIndex === 0 ? 'var(--bg-black)' : 'var(--bg-white)',
                  color: activeQueryIndex === 0 ? 'var(--text-white)' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                Query 1 (Marathi)
              </button>
              <button
                onClick={() => setActiveQueryIndex(1)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '3px',
                  border: '1px solid var(--border-subtle)',
                  background: activeQueryIndex === 1 ? 'var(--bg-black)' : 'var(--bg-white)',
                  color: activeQueryIndex === 1 ? 'var(--text-white)' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                Query 2 (English)
              </button>
            </div>
          </div>

          {/* Conversation Body */}
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* User Message */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                maxWidth: '75%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '18px 24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)'
                  }}>
                    VOICE INPUT · {current.lang}
                  </span>
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                    <span style={{ width: '2px', height: '10px', background: 'var(--text-muted)' }} />
                    <span style={{ width: '2px', height: '14px', background: 'var(--text-primary)' }} />
                    <span style={{ width: '2px', height: '8px', background: 'var(--text-muted)' }} />
                  </div>
                </div>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.5 }}>
                  "{current.userQuery}"
                </p>
              </div>
            </div>

            {/* VEXORA AI Response */}
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                maxWidth: '85%',
                background: 'var(--bg-white)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '24px 28px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    letterSpacing: '0.12em'
                  }}>
                    VEXORA AI
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)'
                  }}>
                    · 0.18s RESPONSE LATENCY
                  </span>
                </div>

                <p style={{
                  fontSize: '1.08rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  marginBottom: '20px'
                }}>
                  {current.response}
                </p>

                {/* Recommendation pill */}
                <div style={{
                  padding: '14px 18px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                      {current.salon}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                      {current.metrics}
                    </div>
                  </div>
                  <span className="badge-mono badge-black" style={{ fontSize: '0.68rem' }}>
                    RECOMMENDED
                  </span>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => onViewSalon(current.salon)}
                    className="btn-secondary btn-sm"
                  >
                    View Salon
                  </button>
                  <button
                    onClick={() => onJoinQueue(current.salon)}
                    className="btn-primary btn-sm"
                  >
                    Join Queue
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Prompt Bar */}
          <div style={{
            padding: '18px 28px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flex: 1,
              color: 'var(--text-muted)',
              fontSize: '0.9rem'
            }}>
              <button
                onClick={() => setIsRecording(!isRecording)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-medium)',
                  background: isRecording ? 'var(--bg-black)' : 'var(--bg-white)',
                  color: isRecording ? 'var(--text-white)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
                title={isRecording ? 'Listening...' : 'Click to speak'}
              >
                <Mic size={16} strokeWidth={1.75} />
              </button>
              <span>{isRecording ? 'Listening in Marathi / Hindi / English...' : 'Ask: "Fastest salon for beard trim near Kothrud?"'}</span>
            </div>

            <button className="btn-secondary btn-sm" style={{ padding: '8px 14px' }}>
              <Send size={13} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
