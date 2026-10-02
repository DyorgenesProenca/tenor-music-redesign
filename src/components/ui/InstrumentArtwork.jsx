import { useState } from 'react'

const instrumentArt = {
  saxofones: (
    <g>
      <path d="M283 58v42c0 16 21 21 22 39 1 12-9 21-22 33-24 22-36 52-37 89v66c0 41 19 67 49 67 29 0 49-24 45-51-3-20-20-30-12-49 7-18 30-27 43-45 27-39 18-81-12-107-24-21-31-41-29-64" />
      <path d="M283 58h33m-34 39h31m-44 83h52m-62 41h63m-66 42h66m-67 42h64m-52 45c-6 31 7 54 29 54 23 0 37-20 30-42-5-15-22-24-16-43" />
      <path d="M269 195v118m19-131v137m20-141v128m19-116v94" />
      <circle cx="266" cy="218" r="5" /><circle cx="307" cy="225" r="5" /><circle cx="274" cy="263" r="5" /><circle cx="314" cy="273" r="5" />
    </g>
  ),
  trompetes: (
    <g>
      <path d="M112 213h172l42-37h70l-3 92h-67l-42-36H112z" />
      <path d="M397 176c37 7 59 21 59 47s-22 39-59 45m-285-55h178m-178 19h178" />
      <path d="M224 232v70m31-70v70m31-70v70m-72 1h82m-71 0v24m31-24v24m30-24v24" />
      <circle cx="224" cy="229" r="7" /><circle cx="255" cy="229" r="7" /><circle cx="286" cy="229" r="7" />
    </g>
  ),
  trombones: (
    <g>
      <path d="M137 151h155v38H137zm155 19h81m-81 19h81m-155-38-38-27h-45m45 46-38 27h-45" />
      <path d="M373 170h42c31 0 49 14 49 42v100c0 27-16 42-42 42h-98m49-184v184m-48-74h48m-101-111v174c0 26 16 39 39 39h23" />
      <path d="M91 151l-26-19m26 65-26 26" />
    </g>
  ),
  teclas: (
    <g>
      <path d="M91 157h338v207H91z" />
      <path d="M91 316h338m-300-159v159m38-159v159m38-159v159m38-159v159m38-159v159m38-159v159m38-159v159m38-159v159" />
      <path d="M129 157v91h22v-91m54 0v91h22v-91m54 0v91h22v-91m54 0v91h22v-91" />
      <circle cx="127" cy="285" r="5" /><circle cx="164" cy="285" r="5" /><circle cx="202" cy="285" r="5" /><circle cx="240" cy="285" r="5" />
    </g>
  ),
  cordas: (
    <g>
      <path d="M263 115v114m0-114 44-44m-44 44-39-38" />
      <path d="M263 220c-19-44-74-43-89 1-10 29 4 50 19 70-17 15-24 34-19 53 7 29 33 41 58 27 13-7 22-19 31-34 9 15 18 27 31 34 25 14 51 2 58-27 5-19-2-38-19-53 15-20 29-41 19-70-15-44-70-45-89-1z" />
      <path d="M255 113v229m8-229v229m-54-157 47 19m56-19-47 19m-59 70 50-20m64 20-50-20" />
    </g>
  ),
  madeiras: (
    <g>
      <path d="M226 87h57v266h-57z" />
      <path d="M226 117h57m-57 28h57m-57 29h57m-57 29h57m-57 29h57m-57 29h57m-57 29h57m-57 29h57" />
      <circle cx="241" cy="131" r="5" /><circle cx="267" cy="160" r="5" /><circle cx="241" cy="191" r="5" /><circle cx="267" cy="220" r="5" /><circle cx="241" cy="249" r="5" /><circle cx="267" cy="279" r="5" /><circle cx="241" cy="308" r="5" />
      <path d="M226 87l28-34 29 34m-57 266 28 31 29-31" />
    </g>
  ),
  tubas: (
    <g>
      <path d="M247 99h59v67c0 19 26 22 40 10l30-26m-100 22v88c0 34 30 58 59 47 27-10 32-42 14-60m-55 13v49c0 29-13 48-38 48s-43-17-43-42v-38m44-68v56c0 16-10 26-24 26s-24-10-24-26" />
      <path d="M247 99h59l37-36h72l-44 86h-70m-88 148h66m-43 38h57" />
      <circle cx="263" cy="226" r="7" /><circle cx="285" cy="226" r="7" /><circle cx="307" cy="226" r="7" />
    </g>
  ),
  acessorios: (
    <g>
      <path d="M144 169h232v167H144z" />
      <path d="M183 169v-25c0-18 12-30 29-30h96c17 0 29 12 29 30v25m-154 18h232m-123-18v149" />
      <path d="M191 236c26-23 53-23 78 0v64c-25 23-52 23-78 0zm126-4 25 24-25 24-25-24z" />
      <circle cx="365" cy="313" r="5" /><circle cx="155" cy="313" r="5" />
    </g>
  ),
}

const artworkKind = {
  clarinetes: 'madeiras',
  flautas: 'madeiras',
  violoes: 'cordas',
  outros: 'acessorios',
}

export default function InstrumentArtwork({ kind, photo, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false)
  const art = instrumentArt[artworkKind[kind] || kind] || instrumentArt.saxofones

  return (
    <div className={`instrument-art relative isolate overflow-hidden ${className}`}>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_38%,rgba(255,184,0,.19),transparent_54%),linear-gradient(145deg,#27241c_0%,#171719_53%,#0d0d0f_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[14%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <svg viewBox="0 0 520 440" aria-hidden="true" className="instrument-art__drawing absolute inset-0 m-auto h-[94%] w-[94%] drop-shadow-[0_20px_26px_rgba(0,0,0,.45)]">
        <ellipse cx="266" cy="369" rx="138" ry="24" fill="rgba(0,0,0,.34)" />
        <g fill="rgba(255,184,0,.035)" stroke="#d7ad58" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          {art}
        </g>
        <g fill="none" stroke="#fff0be" strokeWidth="2.5" strokeLinecap="round" opacity=".68">
          <path d="M158 174h35M310 100h22M213 351h40" />
        </g>
      </svg>
      {photo && !failed && <img src={photo} alt={alt} onError={() => setFailed(true)} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
      {(!photo || failed) && <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-ink/65 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.18em] text-bone/55 backdrop-blur">Imagem ilustrativa</span>}
    </div>
  )
}
