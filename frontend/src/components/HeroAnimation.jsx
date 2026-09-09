import React from 'react';

/* ─── Customer SVG: Normal Realistic Smartphone (iPhone 16 Pro Style) ─── */
const CustomerSVG = () => (
  <svg viewBox="0 0 420 640" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', overflow: 'visible' }}>

    {/* ── PHONE HARDWARE BUTTONS (sides) ── */}
    {/* Left: Action Button */}
    <rect x="56" y="112" width="3.5" height="26" rx="1.75" fill="#27272a" />
    {/* Left: Volume Up */}
    <rect x="56" y="152" width="3.5" height="44" rx="1.75" fill="#27272a" />
    {/* Left: Volume Down */}
    <rect x="56" y="208" width="3.5" height="44" rx="1.75" fill="#27272a" />
    {/* Right: Power / Side Button */}
    <rect x="360.5" y="160" width="3.5" height="58" rx="1.75" fill="#27272a" />

    {/* ── PHONE BODY / CHASSIS ── */}
    {/* Outer drop shadow & matte titanium frame */}
    <rect x="60" y="20" width="300" height="600" rx="48"
      fill="#18181b" stroke="#09090b" strokeWidth="2.5"
      style={{ filter: 'drop-shadow(0 26px 52px rgba(0,0,0,0.14))' }} />

    {/* Inner subtle titanium rim */}
    <rect x="62.5" y="22.5" width="295" height="595" rx="45.5"
      fill="#27272a" stroke="#3f3f46" strokeWidth="0.75" />

    {/* Black bezel border */}
    <rect x="67" y="27" width="286" height="586" rx="42" fill="#000000" />

    {/* ── SCREEN DISPLAY (edge-to-edge) ── */}
    <rect x="71" y="31" width="278" height="578" rx="38" fill="#ffffff" />

    {/* Screen background tone */}
    <rect x="71" y="31" width="278" height="578" rx="38" fill="#fafafa" />

    {/* ── DYNAMIC ISLAND ── */}
    <rect x="160" y="43" width="100" height="25" rx="12.5" fill="#000000" />
    {/* Front camera lens */}
    <circle cx="178" cy="55.5" r="4.5" fill="#141416" />
    <circle cx="179.5" cy="54" r="1.5" fill="#52525b" />
    {/* Ambient sensor */}
    <circle cx="236" cy="55.5" r="3.5" fill="#18181b" />

    {/* ── STATUS BAR ── */}
    {/* Time */}
    <text x="96" y="60" fill="#0a0a0a"
      style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', fontWeight: 700, letterSpacing: '-0.02em' }}>
      9:41
    </text>
    {/* Cellular signal bars */}
    <g transform="translate(284, 52)">
      <rect x="0" y="6" width="2.5" height="4" rx="0.5" fill="#0a0a0a" />
      <rect x="4" y="4" width="2.5" height="6" rx="0.5" fill="#0a0a0a" />
      <rect x="8" y="2" width="2.5" height="8" rx="0.5" fill="#0a0a0a" />
      <rect x="12" y="0" width="2.5" height="10" rx="0.5" fill="#0a0a0a" />
    </g>
    {/* Wi-Fi Icon */}
    <g transform="translate(303, 51)">
      <path d="M0 2 C3 0 7 0 10 2 M2 5 C4.5 3.5 7.5 3.5 10 5 M5 8 C5.8 7.2 7.2 7.2 8 8"
        stroke="#0a0a0a" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </g>
    {/* Battery Icon */}
    <rect x="318" y="52" width="18" height="9.5" rx="3" stroke="#0a0a0a" strokeWidth="1.1" fill="none" />
    <rect x="320" y="54" width="11" height="5.5" rx="1.5" fill="#0a0a0a" />
    <path d="M337 55 L337 58.5" stroke="#0a0a0a" strokeWidth="1" strokeLinecap="round" />

    {/* ── APP NAVIGATION HEADER ── */}
    <g transform="translate(86, 78)">
      {/* Vexora App Logo */}
      <text x="0" y="16" fill="#0a0a0a"
        style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em' }}>
        VEXORA
      </text>
      {/* Location Pin & Name */}
      <path d="M120 7 C120 3 125 0.5 125 7 C125 11 120 15 120 11 Z"
        stroke="#0a0a0a" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      <circle cx="122.5" cy="6.5" r="1.2" fill="#0a0a0a" />
      <text x="129" y="10" fill="#0a0a0a"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', fontWeight: 600 }}>
        Indiranagar, BLR
      </text>
      <path d="M198 7 L201 10 L204 7" stroke="#71717a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Bell Notification Icon */}
      <g transform="translate(232, 2)">
        <path d="M6 3 C6 2 7 1 8 1 C9 1 10 2 10 3 C12 5 13 8 13 11 L3 11 C3 8 4 5 6 3 Z"
          stroke="#0a0a0a" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
        <path d="M6.5 13 C6.5 14 7.2 14.5 8 14.5 C8.8 14.5 9.5 14 9.5 13"
          stroke="#0a0a0a" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <circle cx="12" cy="3" r="2.5" fill="#0a0a0a" stroke="#ffffff" strokeWidth="1" />
      </g>
    </g>

    {/* ── SEARCH BAR ── */}
    <rect x="85" y="106" width="250" height="34" rx="10" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1" />
    {/* Magnifier */}
    <circle cx="102" cy="123" r="5" stroke="#71717a" strokeWidth="1.2" fill="none" />
    <line x1="106" y1="127" x2="110" y2="131" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    <text x="116" y="127" fill="#a1a1aa"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '8.5px', letterSpacing: '0.02em' }}>
      Search salons, haircuts, beard...
    </text>
    {/* Filter Icon at right */}
    <line x1="316" y1="119" x2="324" y2="119" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="318" cy="119" r="1.5" fill="#71717a" />
    <line x1="316" y1="127" x2="324" y2="127" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="322" cy="127" r="1.5" fill="#71717a" />

    {/* ── CATEGORY PILLS ── */}
    {[{label:'All',active:true,x:85,w:36},{label:'Haircut',active:false,x:127,w:54},{label:'Beard',active:false,x:187,w:48},{label:'Styling',active:false,x:241,w:52},{label:'Spa',active:false,x:299,w:36}].map((p,i) => (
      <g key={i}>
        <rect x={p.x} y="148" width={p.w} height="20" rx="6"
          fill={p.active ? '#0a0a0a' : '#f4f4f5'} />
        <text x={p.x + p.w/2} y="161.5" textAnchor="middle"
          fill={p.active ? '#ffffff' : '#71717a'}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', fontWeight: 600, letterSpacing: '0.04em' }}>
          {p.label}
        </text>
      </g>
    ))}

    {/* Section label */}
    <text x="86" y="184" fill="#71717a"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
      Nearby Salons · Live Queue
    </text>

    {/* ── SALON CARD 1 — ACTIVE QUEUE (Looks & Co.) ── */}
    <rect x="85" y="192" width="250" height="114" rx="14"
      fill="#0a0a0a" />
    {/* Card Inner Glow/Divider line */}
    <line x1="97" y1="236" x2="323" y2="236" stroke="#27272a" strokeWidth="0.75" />

    {/* Salon Title */}
    <text x="97" y="213" fill="#ffffff"
      style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.02em' }}>
      Looks &amp; Co. Studio
    </text>
    {/* Live Pulse Dot */}
    <circle cx="317" cy="209" r="4" fill="#ffffff"
      style={{ animation: 'svg-pulse-dot 1.8s infinite ease-in-out' }} />

    {/* Subhead info */}
    <text x="97" y="228" fill="#a1a1aa"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.04em' }}>
      0.4 km away · Indiranagar · ★ 4.9 (480)
    </text>

    {/* Wait Badge */}
    <rect x="97" y="246" width="76" height="18" rx="5" fill="#ffffff" fillOpacity="0.16" />
    <text x="135" y="258" textAnchor="middle" fill="#ffffff"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.06em' }}>
      ~8 MIN WAIT
    </text>

    {/* Live Queue count */}
    <text x="180" y="258" fill="#d4d4d8"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', letterSpacing: '0.04em' }}>
      3 clients ahead
    </text>

    {/* Action Button */}
    <rect x="97" y="272" width="226" height="24" rx="7" fill="#ffffff" />
    <text x="210" y="287.5" textAnchor="middle" fill="#0a0a0a"
      style={{ fontFamily: 'var(--font-heading)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.04em' }}>
      You are #07 · Live Ticket Active →
    </text>

    {/* ── SALON CARD 2 (Fade District) ── */}
    <rect x="85" y="314" width="250" height="76" rx="12" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1" />
    <text x="97" y="335" fill="#0a0a0a"
      style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700 }}>
      Fade District Barber
    </text>
    <text x="97" y="350" fill="#71717a"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.04em' }}>
      0.9 km · 12th Main · ★ 4.8 (310)
    </text>
    {/* Wait Chip */}
    <rect x="97" y="360" width="72" height="18" rx="4" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="0.75" />
    <text x="133" y="372" textAnchor="middle" fill="#0a0a0a"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', fontWeight: 600 }}>
      ~16 min wait
    </text>
    {/* Join button */}
    <rect x="253" y="348" width="70" height="28" rx="6" fill="#0a0a0a" />
    <text x="288" y="365" textAnchor="middle" fill="#ffffff"
      style={{ fontFamily: 'var(--font-heading)', fontSize: '8.5px', fontWeight: 600 }}>
      Join Queue
    </text>

    {/* ── SALON CARD 3 (Barber Republic) ── */}
    <rect x="85" y="398" width="250" height="76" rx="12" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1" />
    <text x="97" y="419" fill="#0a0a0a"
      style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700 }}>
      Barber Republic
    </text>
    <text x="97" y="434" fill="#71717a"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.04em' }}>
      1.4 km · 100 Feet Rd · ★ 4.9 (520)
    </text>
    {/* Wait Chip */}
    <rect x="97" y="444" width="72" height="18" rx="4" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="0.75" />
    <text x="133" y="456" textAnchor="middle" fill="#0a0a0a"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', fontWeight: 600 }}>
      ~24 min wait
    </text>
    {/* Join button */}
    <rect x="253" y="432" width="70" height="28" rx="6" fill="#0a0a0a" />
    <text x="288" y="449" textAnchor="middle" fill="#ffffff"
      style={{ fontFamily: 'var(--font-heading)', fontSize: '8.5px', fontWeight: 600 }}>
      Join Queue
    </text>

    {/* ── BOTTOM APP TAB BAR ── */}
    <line x1="71" y1="520" x2="349" y2="520" stroke="#e4e4e7" strokeWidth="0.75" />
    <rect x="71" y="521" width="278" height="52" fill="#ffffff" />

    {/* Tab 1: Explore (Active) */}
    <g transform="translate(104, 532)">
      <circle cx="8" cy="8" r="6.5" stroke="#0a0a0a" strokeWidth="1.3" fill="none" />
      <polygon points="8,4 10,8 8,12 6,8" fill="#0a0a0a" />
      <text x="8" y="24" textAnchor="middle" fill="#0a0a0a"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', fontWeight: 700 }}>
        Explore
      </text>
    </g>

    {/* Tab 2: Queue (Badge 1) */}
    <g transform="translate(162, 532)">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="#71717a" strokeWidth="1.3" fill="none" />
      <line x1="5" y1="7" x2="11" y2="7" stroke="#71717a" strokeWidth="1" />
      <circle cx="14" cy="3" r="3.5" fill="#0a0a0a" />
      <text x="14" y="5.5" textAnchor="middle" fill="#ffffff"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '5.5px', fontWeight: 700 }}>
        1
      </text>
      <text x="8" y="24" textAnchor="middle" fill="#71717a"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', fontWeight: 500 }}>
        Queue
      </text>
    </g>

    {/* Tab 3: Appointments */}
    <g transform="translate(222, 532)">
      <rect x="2" y="3" width="12" height="11" rx="2" stroke="#71717a" strokeWidth="1.3" fill="none" />
      <line x1="2" y1="6.5" x2="14" y2="6.5" stroke="#71717a" strokeWidth="0.8" />
      <text x="8" y="24" textAnchor="middle" fill="#71717a"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', fontWeight: 500 }}>
        Bookings
      </text>
    </g>

    {/* Tab 4: Profile */}
    <g transform="translate(282, 532)">
      <circle cx="8" cy="6" r="3.5" stroke="#71717a" strokeWidth="1.3" fill="none" />
      <path d="M2 15 C2 12 4.5 11 8 11 C11.5 11 14 12 14 15" stroke="#71717a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <text x="8" y="24" textAnchor="middle" fill="#71717a"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', fontWeight: 500 }}>
        Account
      </text>
    </g>

    {/* ── HOME INDICATOR BAR ── */}
    <rect x="160" y="594" width="100" height="4.5" rx="2.25" fill="#000000" />
  </svg>
);

/* ─── Salon SVG: Clean Operations Center ─── */
const SalonSVG = () => (
  <svg viewBox="0 0 520 640" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', overflow: 'visible' }}>

    {/* ── TOP OPS BANNER ── */}
    <rect x="130" y="46" width="260" height="38" rx="8"
      stroke="#0a0a0a" strokeWidth="1.4" fill="#ffffff"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.05))' }} />
    <circle cx="148" cy="65" r="4" fill="#0a0a0a"
      style={{ animation: 'svg-pulse-dot 1.8s infinite ease-in-out' }} />
    <text x="160" y="69" fill="#0a0a0a"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.12em' }}>
      SALON OPERATIONS OS · LIVE
    </text>

    {/* ── STATION TELEMETRY ROW ── */}
    {[{st:'STATION 01',status:'OCCUPIED · CUT',x:80,active:true},
      {st:'STATION 02',status:'OCCUPIED · SHAVE',x:210,active:true},
      {st:'STATION 03',status:'READY · CHAIR 3',x:340,active:false}].map((s,i) => (
      <g key={i}>
        <rect x={s.x} y="98" width="105" height="34" rx="6"
          stroke={s.active ? '#0a0a0a' : '#e4e4e7'} strokeWidth={s.active ? 1.2 : 1}
          fill={s.active ? '#ffffff' : '#fafafa'} />
        <text x={s.x + 10} y="112" fill="#71717a"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '6.5px', letterSpacing: '0.08em' }}>
          {s.st}
        </text>
        <text x={s.x + 10} y="124" fill={s.active ? '#0a0a0a' : '#a1a1aa'}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', fontWeight: 700, letterSpacing: '0.04em' }}>
          {s.status}
        </text>
      </g>
    ))}

    {/* ── BARBER CHAIR (center piece) ── */}
    {/* Chair base */}
    <rect x="218" y="470" width="84" height="12" rx="4" stroke="#0a0a0a" strokeWidth="1.8" fill="#f9f9f9" />
    <rect x="238" y="448" width="44" height="24" rx="2" stroke="#0a0a0a" strokeWidth="1.6" fill="#ffffff" />
    <rect x="250" y="388" width="20" height="64" rx="2" stroke="#0a0a0a" strokeWidth="1.6" fill="#fafafa" />
    <path d="M200 460 Q220 450 238 448" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <path d="M320 460 Q300 450 282 448" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" fill="none" />

    {/* Seat */}
    <path d="M204 388 Q204 374 218 370 L302 370 Q316 374 316 388 L310 410 Q310 414 306 414 L214 414 Q210 414 210 410 Z"
      stroke="#0a0a0a" strokeWidth="1.8" fill="#ffffff" />
    <path d="M210 410 Q230 420 260 422 Q290 420 310 410" stroke="#d4d4d8" strokeWidth="1" fill="none" />

    {/* Backrest */}
    <path d="M218 370 L214 290 Q214 278 225 274 L295 274 Q306 278 306 290 L302 370"
      stroke="#0a0a0a" strokeWidth="1.8" fill="#ffffff" />
    <path d="M222 324 Q260 320 298 324" stroke="#e4e4e7" strokeWidth="1" fill="none" />
    <path d="M222 304 Q260 300 298 304" stroke="#e4e4e7" strokeWidth="1" fill="none" />
    <path d="M222 344 Q260 340 298 344" stroke="#e4e4e7" strokeWidth="1" fill="none" />

    {/* Headrest */}
    <path d="M235 274 L232 254 Q232 246 240 244 L280 244 Q288 246 288 254 L285 274"
      stroke="#0a0a0a" strokeWidth="1.8" fill="#fafafa" />

    {/* Armrests */}
    <path d="M214 360 Q194 358 188 366 L186 390 Q186 398 194 398 L208 398"
      stroke="#0a0a0a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <path d="M306 360 Q326 358 332 366 L334 390 Q334 398 326 398 L312 398"
      stroke="#0a0a0a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <rect x="180" y="392" width="34" height="10" rx="5" stroke="#0a0a0a" strokeWidth="1.5" fill="#ffffff" />
    <rect x="308" y="392" width="34" height="10" rx="5" stroke="#0a0a0a" strokeWidth="1.5" fill="#ffffff" />

    {/* ── ANIMATED SCISSORS (upper right) ── */}
    <g style={{ animation: 'shear-top 3s infinite ease-in-out', transformOrigin: '428px 210px' }}>
      <path d="M428 210 L388 190" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="438" cy="210" rx="12" ry="9" transform="rotate(-25 438 210)"
        stroke="#0a0a0a" strokeWidth="1.6" fill="#ffffff" />
      <ellipse cx="438" cy="210" rx="7" ry="5.5" transform="rotate(-25 438 210)"
        stroke="#0a0a0a" strokeWidth="1" fill="none" />
    </g>
    <g style={{ animation: 'shear-bottom 3s infinite ease-in-out', transformOrigin: '428px 210px' }}>
      <path d="M428 210 L390 230" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="438" cy="220" rx="12" ry="9" transform="rotate(15 438 220)"
        stroke="#0a0a0a" strokeWidth="1.6" fill="#ffffff" />
      <ellipse cx="438" cy="220" rx="7" ry="5.5" transform="rotate(15 438 220)"
        stroke="#0a0a0a" strokeWidth="1" fill="none" />
    </g>
    <circle cx="428" cy="210" r="3.5" stroke="#0a0a0a" strokeWidth="1.5" fill="#ffffff" />
    <circle cx="428" cy="210" r="1.5" fill="#0a0a0a" />

    {/* ── QUEUE COLUMN (left side) ── */}
    <text x="74" y="174" textAnchor="middle" fill="#71717a"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.14em', fontWeight: 600 }}>
      QUEUE DISPATCH
    </text>
    <line x1="36" y1="182" x2="112" y2="182" stroke="#e4e4e7" strokeWidth="0.75" />

    {[{y:208,n:'#104',active:true,status:'In Chair'},
      {y:282,n:'#105',active:false,status:'Waiting'},
      {y:356,n:'#106',active:false,status:'En Route'},
      {y:430,n:'#107',active:false,status:'Booked'}].map(({y,n,active,status},i) => (
      <g key={i}>
        <circle cx="74" cy={y} r="18"
          stroke={active ? '#0a0a0a' : '#d4d4d8'} strokeWidth={active ? 1.6 : 1.2}
          fill={active ? '#ffffff' : '#fafafa'} />
        <circle cx="74" cy={y-6} r="7"
          stroke={active ? '#0a0a0a' : '#a1a1aa'} strokeWidth={active ? 1.2 : 1} fill="none" />
        <path d={`M60 ${y+8} Q60 ${y} 74 ${y} Q88 ${y} 88 ${y+8}`}
          stroke={active ? '#0a0a0a' : '#a1a1aa'} strokeWidth={active ? 1.2 : 1} fill="none" strokeLinecap="round" />
        <rect x="52" y={y+20} width="44" height="15" rx="4"
          stroke={active ? '#0a0a0a' : '#d4d4d8'} strokeWidth={active ? 1.2 : 1}
          fill={active ? '#0a0a0a' : '#f4f4f5'} />
        <text x="74" y={y+31} textAnchor="middle" fill={active ? '#ffffff' : '#71717a'}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '7.5px', letterSpacing: '0.05em' }}>
          {n}
        </text>
      </g>
    ))}
    <line x1="74" y1="226" x2="74" y2="264" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="74" y1="300" x2="74" y2="338" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="74" y1="374" x2="74" y2="412" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 3" />

    {/* ── REVENUE & CAPACITY METRIC CARD (right side) ── */}
    <rect x="340" y="470" width="138" height="64" rx="8"
      stroke="#0a0a0a" strokeWidth="1.4" fill="#ffffff"
      style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.06))' }} />
    <text x="354" y="490" fill="#71717a"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.12em' }}>
      TODAY'S REVENUE
    </text>
    <text x="354" y="512" fill="#0a0a0a"
      style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700 }}>
      ₹18,650
    </text>
    <text x="354" y="526" fill="#a1a1aa"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.08em' }}>
      92% CAPACITY · 5 STYLISTS
    </text>

    {/* ── COMB (gliding micro-animation) ── */}
    <g style={{ animation: 'comb-glide 6s infinite ease-in-out' }} transform="translate(345, 395)">
      <rect x="0" y="0" width="84" height="10" rx="2.5" stroke="#0a0a0a" strokeWidth="1.4" fill="#ffffff" />
      {[...Array(17)].map((_, i) => (
        <line key={i} x1={6 + i*4.5} y1="10" x2={6 + i*4.5} y2="26" stroke="#0a0a0a" strokeWidth="1.1" />
      ))}
    </g>
  </svg>
);

/* ─── Main export ─── */
export const HeroAnimation = ({ currentRole }) => {
  const isCustomer = currentRole === 'customer';

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: isCustomer ? '440px' : '560px',
      height: '630px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
    }}>
      {isCustomer ? <CustomerSVG /> : <SalonSVG />}
    </div>
  );
};
