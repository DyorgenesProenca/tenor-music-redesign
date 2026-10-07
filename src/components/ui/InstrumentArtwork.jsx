import { useEffect, useState } from 'react'

const positionUtilities = new Set(['absolute', 'fixed', 'relative', 'static', 'sticky'])

export default function InstrumentArtwork({ photo, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false)
  const hasPositionClass = className.split(/\s+/).some((name) => positionUtilities.has(name))
  const positionClass = hasPositionClass ? '' : 'relative'

  useEffect(() => {
    setFailed(false)
  }, [photo])

  const handleImageLoad = () => setFailed(false)

  return (
    <div className={`instrument-art ${positionClass} isolate overflow-hidden ${className}`}>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_38%,rgba(255,184,0,.19),transparent_54%),linear-gradient(145deg,#27241c_0%,#171719_53%,#0d0d0f_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[14%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <svg viewBox="0 0 520 440" aria-hidden="true" className="instrument-art__drawing absolute inset-0 m-auto h-[94%] w-[94%] drop-shadow-[0_20px_26px_rgba(0,0,0,.45)]">
        <g>
          <path d="M220 322V145l115-28v174" fill="none" stroke="#d7ad58" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M220 145l115-28v39l-115 28zm0 42 115-28v28l-115 28z" fill="rgba(255,184,0,.12)" stroke="#d7ad58" strokeWidth="4" strokeLinejoin="round" />
          <g fill="rgba(255,184,0,.12)" stroke="#d7ad58" strokeWidth="7">
            <ellipse cx="184" cy="330" rx="36" ry="22" transform="rotate(-22 184 330)" />
            <ellipse cx="299" cy="302" rx="36" ry="22" transform="rotate(-22 299 302)" />
          </g>
          <g fill="none" stroke="#fff0be" strokeWidth="3" strokeLinecap="round" opacity=".68">
            <path d="M168 330c7-7 15-11 23-12" />
            <path d="M283 302c7-7 15-11 23-12" />
          </g>
        </g>
      </svg>
      {photo && !failed && <img key={photo} src={photo} alt={alt} onLoad={handleImageLoad} onError={() => setFailed(true)} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
      {(!photo || failed) && <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-ink/65 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.18em] text-bone/55 backdrop-blur">Imagem ilustrativa</span>}
    </div>
  )
}
