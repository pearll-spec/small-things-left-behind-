import React from 'react';
import { KeepsakeId } from '../types/story';

interface KeepsakeIllustrationProps {
  keepsakeId: KeepsakeId;
  keepsakeName: string;
  backInscription: string;
  backDetail: string;
  isFlipped?: boolean;
  isReacting?: boolean;
  starCollected?: boolean;
  onCollectStar?: (e: React.MouseEvent) => void;
  compact?: boolean;
}

const INK = '#15100E';

export const KeepsakeIllustration: React.FC<KeepsakeIllustrationProps> = ({
  keepsakeId,
  keepsakeName,
  backInscription,
  backDetail,
  isFlipped = false,
  isReacting = false,
  starCollected = false,
  onCollectStar,
  compact = false,
}) => {
  const renderFrontArtwork = () => {
    switch (keepsakeId) {
      case 'blossom-diary':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Linen notebook cover */}
            <rect x="44" y="24" width="132" height="122" rx="4" fill="#3D4C63" stroke={INK} strokeWidth="2.8" />
            <rect x="44" y="24" width="16" height="122" rx="2" fill="#233B5C" stroke={INK} strokeWidth="2.8" />
            {/* Cream page edges */}
            <path d="M176 29 L182 33 L182 141 L176 146 Z" fill="#EFEAE0" stroke={INK} strokeWidth="2" />
            {/* Paper label */}
            <rect x="78" y="42" width="76" height="32" rx="2" fill="#F6F2EA" stroke={INK} strokeWidth="2" />
            <line x1="88" y1="54" x2="142" y2="54" stroke={INK} strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="94" y1="63" x2="136" y2="63" stroke={INK} strokeWidth="1.3" strokeOpacity="0.45" />
            {/* Twine & leather clasp */}
            <path
              d={isReacting ? 'M170 84 Q192 78 184 96' : 'M164 85 L182 85'}
              stroke="#E59D35"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="176" cy="85" r="5" fill="#B84935" stroke={INK} strokeWidth="2" />
            {/* Pressed chamomile flower */}
            <g transform={isReacting ? 'translate(116 112) rotate(12) scale(1.08)' : 'translate(116 112)'}>
              <path d="M0 0 Q-4 18 -10 28" stroke="#476B49" strokeWidth="2.4" fill="none" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <ellipse
                  key={deg}
                  cx="0"
                  cy="-13"
                  rx="4.2"
                  ry="9.5"
                  fill="#F6F2EA"
                  stroke={INK}
                  strokeWidth="1.5"
                  transform={`rotate(${deg})`}
                />
              ))}
              <circle cx="0" cy="0" r="6" fill="#E59D35" stroke={INK} strokeWidth="1.6" />
            </g>
          </svg>
        );

      case 'doorframe-marks':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Painted cream wood trim strip tilted slightly */}
            <g transform={isReacting ? 'rotate(-1.5 110 85)' : 'rotate(-4 110 85)'}>
              <rect x="76" y="14" width="68" height="142" rx="2" fill="#EFEAE0" stroke={INK} strokeWidth="2.8" />
              <line x1="84" y1="16" x2="84" y2="154" stroke="#191614" strokeOpacity="0.16" strokeWidth="1.5" />
              <line x1="136" y1="16" x2="136" y2="154" stroke="#191614" strokeOpacity="0.16" strokeWidth="1.5" />
              {/* Pencil notches */}
              {[34, 52, 68, 88, 108, 126].map((y, idx) => (
                <g key={y}>
                  <line
                    x1="88"
                    y1={y}
                    x2={idx === 0 ? 124 : 112}
                    y2={y}
                    stroke={idx === 0 ? '#B84935' : INK}
                    strokeWidth={idx === 0 ? '2.4' : '1.8'}
                  />
                  <circle cx={idx === 0 ? 128 : 117} cy={y} r="1.5" fill={INK} opacity="0.5" />
                </g>
              ))}
              {/* Masking tape piece */}
              <rect x="92" y="25" width="44" height="14" fill="#E59D35" fillOpacity="0.45" stroke={INK} strokeWidth="1.2" />
            </g>
          </svg>
        );

      case 'mason-jar':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Jar body */}
            <path
              d="M72 48 L148 48 L156 62 L156 138 Q156 148 144 148 L76 148 Q64 148 64 138 L64 62 Z"
              fill="#CFE0DF"
              fillOpacity="0.32"
              stroke={INK}
              strokeWidth="2.8"
            />
            {/* Glass highlights */}
            <path d="M74 68 L74 134" stroke="#F6F2EA" strokeOpacity="0.65" strokeWidth="3" strokeLinecap="round" />
            <path d="M144 74 L144 128" stroke="#F6F2EA" strokeOpacity="0.3" strokeWidth="2" strokeLinecap="round" />
            {/* Rusted tin lid with 7 nail holes */}
            <rect x="70" y="30" width="80" height="18" rx="3" fill="#9A6B4A" stroke={INK} strokeWidth="2.6" />
            {[79, 89, 99, 109, 119, 129, 139].map((x, i) => (
              <circle key={x} cx={x} cy={i % 2 === 0 ? 37 : 41} r="1.7" fill={INK} />
            ))}
            {/* Fireflies glowing inside */}
            {[
              { cx: 95, cy: 96, r: 4.5 },
              { cx: 122, cy: 84, r: 3.8 },
              { cx: 112, cy: 116, r: 5 },
              { cx: 88, cy: 122, r: 3.2 },
            ].map((dot, idx) => (
              <g key={idx}>
                <circle
                  cx={dot.cx}
                  cy={dot.cy}
                  r={isReacting ? dot.r * 2.6 : dot.r * 1.9}
                  fill="#E59D35"
                  fillOpacity={isReacting ? 0.55 : 0.32}
                />
                <circle cx={dot.cx} cy={dot.cy} r={dot.r} fill="#FFE28A" stroke={INK} strokeWidth="1.2" />
              </g>
            ))}
          </svg>
        );

      case 'bicycle-bell':
        return (
          <svg
            viewBox="0 0 220 170"
            className={`w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)] ${
              isReacting ? 'animate-bell-ring' : ''
            }`}
          >
            {/* Clamp mount */}
            <rect x="92" y="108" width="36" height="28" rx="4" fill="#46423F" stroke={INK} strokeWidth="2.6" />
            <circle cx="110" cy="122" r="7" fill="#1E1A18" stroke={INK} strokeWidth="2" />
            {/* Thumb striker lever */}
            <path d="M148 96 L176 112 L170 120 L144 104 Z" fill="#C48B3B" stroke={INK} strokeWidth="2.4" />
            {/* Chrome dome */}
            <path d="M58 98 C58 50, 162 50, 162 98 Z" fill="#DDD7CC" stroke={INK} strokeWidth="2.8" />
            {/* Specular highlight */}
            <path d="M74 82 C82 62, 102 58, 114 60" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
            {/* Brass bolt cap */}
            <circle cx="110" cy="56" r="7" fill="#E59D35" stroke={INK} strokeWidth="2.2" />
            {/* Sound waves on react */}
            {isReacting && (
              <>
                <path d="M46 66 Q38 82 46 96" stroke="#E59D35" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M174 66 Q182 82 174 96" stroke="#E59D35" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              </>
            )}
          </svg>
        );

      case 'mixtape':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Cassette shell */}
            <rect x="34" y="38" width="152" height="94" rx="6" fill="#2A2421" stroke={INK} strokeWidth="2.8" />
            {/* Paper label */}
            <rect x="46" y="48" width="128" height="54" rx="2" fill="#EFEAE0" stroke={INK} strokeWidth="2" />
            <rect x="46" y="48" width="128" height="13" fill="#B84935" stroke={INK} strokeWidth="1.6" />
            {/* Handwritten line on label */}
            <line x1="56" y1="70" x2="128" y2="70" stroke={INK} strokeOpacity="0.45" strokeWidth="1.5" />
            {/* Tape window */}
            <rect x="66" y="75" width="88" height="22" rx="10" fill="#191614" stroke={INK} strokeWidth="2" />
            {/* Left & Right reels */}
            {[84, 136].map((cx) => (
              <g
                key={cx}
                style={{ transformOrigin: `${cx}px 86px` }}
                className={isReacting ? 'animate-spin-reel' : ''}
              >
                <circle cx={cx} cy="86" r="9" fill="#F6F2EA" stroke={INK} strokeWidth="1.8" />
                <line x1={cx - 6} y1="86" x2={cx + 6} y2="86" stroke={INK} strokeWidth="1.8" />
                <line x1={cx} y1="80" x2={cx} y2="92" stroke={INK} strokeWidth="1.8" />
              </g>
            ))}
            {/* Bottom trapezoid */}
            <path d="M62 132 L72 114 L148 114 L158 132 Z" fill="#1E1A18" stroke={INK} strokeWidth="2.2" />
            <circle cx="84" cy="123" r="3" fill="#EFEAE0" />
            <circle cx="136" cy="123" r="3" fill="#EFEAE0" />
          </svg>
        );

      case 'paper-boat':
        return (
          <svg
            viewBox="0 0 220 170"
            className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]"
          >
            <g transform={isReacting ? 'rotate(-5 110 100) translate(0 -4)' : 'rotate(0)'}>
              {/* Back sail */}
              <polygon points="110,28 74,102 146,102" fill="#EFEAE0" stroke={INK} strokeWidth="2.6" />
              {/* Newsprint lines */}
              <line x1="94" y1="68" x2="124" y2="68" stroke={INK} strokeOpacity="0.28" strokeWidth="1.5" />
              <line x1="88" y1="78" x2="132" y2="78" stroke={INK} strokeOpacity="0.28" strokeWidth="1.5" />
              <circle cx="112" cy="88" r="7" fill="none" stroke="#B84935" strokeWidth="1.8" />
              {/* Hull */}
              <polygon points="32,96 188,96 160,136 60,136" fill="#E3DAC8" stroke={INK} strokeWidth="2.8" />
              <polygon points="110,96 188,96 160,136 110,136" fill="#D2C7B2" stroke={INK} strokeWidth="2.2" />
              <polygon points="110,48 76,102 144,102" fill="#F6F2EA" stroke={INK} strokeWidth="2.2" />
            </g>
          </svg>
        );

      case 'polaroid-camera':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Camera body */}
            <rect x="46" y="38" width="128" height="96" rx="8" fill="#EFEAE0" stroke={INK} strokeWidth="2.8" />
            {/* Rainbow / ochre archival stripe */}
            <rect x="103" y="96" width="14" height="38" fill="#B84935" />
            <rect x="108" y="96" width="4" height="38" fill="#E59D35" />
            {/* Lower black base */}
            <rect x="46" y="106" width="128" height="28" rx="4" fill="#231E1B" stroke={INK} strokeWidth="2.8" />
            <rect x="74" y="116" width="72" height="7" rx="2" fill="#0E0A08" />
            {/* Lens barrel */}
            <circle cx="110" cy="76" r="24" fill="#231E1B" stroke={INK} strokeWidth="2.8" />
            <circle cx="110" cy="76" r="14" fill="#233B5C" stroke={INK} strokeWidth="2" />
            <circle cx="105" cy="71" r="4" fill="#F6F2EA" opacity="0.7" />
            {/* Viewfinder & flash */}
            <rect x="58" y="48" width="22" height="18" rx="3" fill="#191614" stroke={INK} strokeWidth="2" />
            <circle cx="152" cy="58" r="8" fill={isReacting ? '#FFE28A' : '#B84935'} stroke={INK} strokeWidth="2" />
          </svg>
        );

      case 'payphone-token':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Ruled index card */}
            <rect
              x="44"
              y="36"
              width="132"
              height="96"
              rx="3"
              fill="#F6F2EA"
              stroke={INK}
              strokeWidth="2.6"
              transform="rotate(-3 110 84)"
            />
            <line x1="56" y1="58" x2="164" y2="53" stroke="#233B5C" strokeOpacity="0.35" strokeWidth="1.4" />
            <line x1="56" y1="74" x2="164" y2="69" stroke="#233B5C" strokeOpacity="0.25" strokeWidth="1.2" />
            <line x1="56" y1="90" x2="164" y2="85" stroke="#233B5C" strokeOpacity="0.25" strokeWidth="1.2" />
            {/* Brass token */}
            <g transform={isReacting ? 'translate(110 84) scale(1.07)' : 'translate(110 84)'}>
              <circle cx="0" cy="0" r="30" fill="#E59D35" stroke={INK} strokeWidth="2.8" />
              <circle cx="0" cy="0" r="23" fill="none" stroke={INK} strokeWidth="1.5" strokeDasharray="3 3" />
              <rect x="-4" y="-12" width="8" height="24" rx="2" fill="#191614" />
            </g>
            {/* Translucent tape */}
            <rect x="92" y="42" width="36" height="12" fill="#EFEAE0" fillOpacity="0.72" stroke={INK} strokeWidth="1.2" />
          </svg>
        );

      case 'kintsugi-mug':
        return (
          <svg
            viewBox="0 0 220 170"
            className={`w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)] ${
              isReacting ? 'animate-mug-hop' : ''
            }`}
          >
            {/* Handle */}
            <path d="M148 64 C178 64, 178 118, 146 118" fill="none" stroke="#EFEAE0" strokeWidth="12" strokeLinecap="round" />
            <path d="M148 64 C178 64, 178 118, 146 118" fill="none" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
            {/* Mug body */}
            <path
              d="M66 48 L152 48 L146 132 Q144 142 132 142 L86 142 Q74 142 72 132 Z"
              fill="#EFEAE0"
              stroke={INK}
              strokeWidth="2.8"
            />
            {/* Tea rim */}
            <ellipse cx="109" cy="48" rx="43" ry="10" fill="#473325" stroke={INK} strokeWidth="2.6" />
            {/* Gold Kintsugi crack veins */}
            <path
              d="M94 58 L104 82 L96 106 L112 138"
              fill="none"
              stroke="#E59D35"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M104 82 L124 94 L132 112" fill="none" stroke="#E59D35" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        );

      case 'ticket-stub':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            <g transform={isReacting ? 'rotate(3 110 85) scale(1.03)' : 'rotate(-4 110 85)'}>
              {/* Punched cardboard stub */}
              <path
                d="M40 52 L176 52 L176 74 A8 8 0 0 0 176 94 L176 118 L40 118 L40 94 A8 8 0 0 0 40 74 Z"
                fill="#E8DFCE"
                stroke={INK}
                strokeWidth="2.8"
              />
              {/* Violet harbor stamp */}
              <rect x="54" y="64" width="108" height="42" fill="none" stroke="#233B5C" strokeWidth="2" strokeDasharray="4 2" />
              <text x="108" y="84" textAnchor="middle" fill="#233B5C" fontSize="14" fontWeight="700" fontFamily="serif">
                18:40 · PIER 3
              </text>
              <text x="108" y="99" textAnchor="middle" fill="#B84935" fontSize="9.5" fontWeight="600" letterSpacing="1.5">
                ALDER HARBOR
              </text>
            </g>
          </svg>
        );

      case 'unsent-letter':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Cream envelope */}
            <rect x="38" y="42" width="144" height="92" rx="3" fill="#F6F2EA" stroke={INK} strokeWidth="2.8" />
            {/* Flap */}
            <path
              d={isReacting ? 'M38 42 L110 18 L182 42' : 'M38 42 L110 92 L182 42'}
              fill="#EFEAE0"
              stroke={INK}
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            {/* Crimson wax seal */}
            <circle cx="110" cy={isReacting ? 88 : 92} r="14" fill="#B84935" stroke={INK} strokeWidth="2.4" />
            <circle cx="110" cy={isReacting ? 88 : 92} r="9" fill="none" stroke="#F6F2EA" strokeOpacity="0.45" strokeWidth="1.2" />
          </svg>
        );

      case 'sash-window':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Sash frame */}
            <rect x="46" y="20" width="128" height="130" rx="3" fill="#463325" stroke={INK} strokeWidth="2.8" />
            <rect x="58" y="32" width="104" height="106" fill="#233B5C" stroke={INK} strokeWidth="2.2" />
            {/* Misted glass vs cleared circle */}
            <rect
              x="58"
              y="32"
              width="104"
              height="106"
              fill="#CFE0DF"
              fillOpacity={isReacting ? 0.25 : 0.62}
            />
            <circle cx="110" cy="84" r={isReacting ? 34 : 18} fill="#0E0A08" fillOpacity="0.35" stroke="#F6F2EA" strokeOpacity="0.4" strokeWidth="1.5" />
            {/* Porch mailbox silhouette glimpsed below */}
            <rect x="96" y="92" width="28" height="22" rx="2" fill="#E59D35" fillOpacity="0.7" stroke={INK} strokeWidth="1.6" />
            {/* Cross mullions */}
            <line x1="110" y1="32" x2="110" y2="138" stroke="#463325" strokeWidth="4" />
            <line x1="58" y1="84" x2="162" y2="84" stroke="#463325" strokeWidth="4" />
          </svg>
        );

      case 'music-box':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Walnut box base */}
            <rect x="50" y="74" width="120" height="62" rx="4" fill="#5A3924" stroke={INK} strokeWidth="2.8" />
            {/* Open lid */}
            <polygon
              points={isReacting ? '50,74 68,26 188,26 170,74' : '50,74 62,38 182,38 170,74'}
              fill="#6E472D"
              stroke={INK}
              strokeWidth="2.8"
            />
            {/* Velvet interior & brass cylinder */}
            <polygon points="58,74 162,74 152,62 68,62" fill="#8C3629" stroke={INK} strokeWidth="2" />
            <rect x="82" y="64" width="56" height="12" rx="3" fill="#E59D35" stroke={INK} strokeWidth="2" />
            {/* Winding key */}
            <path d="M170 104 L188 104" stroke="#E59D35" strokeWidth="4" strokeLinecap="round" />
            <circle cx="192" cy="100" r="5" fill="none" stroke="#E59D35" strokeWidth="3" />
            <circle cx="192" cy="109" r="5" fill="none" stroke="#E59D35" strokeWidth="3" />
          </svg>
        );

      case 'field-watch':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Leather straps */}
            <rect x="92" y="14" width="36" height="36" rx="3" fill="#5A3924" stroke={INK} strokeWidth="2.6" />
            <rect x="92" y="120" width="36" height="36" rx="3" fill="#5A3924" stroke={INK} strokeWidth="2.6" />
            {/* Brass bezel */}
            <circle cx="110" cy="85" r="42" fill="#C99242" stroke={INK} strokeWidth="2.8" />
            <circle cx="110" cy="85" r="34" fill="#F6F2EA" stroke={INK} strokeWidth="2.2" />
            {/* Crown */}
            <rect x="152" y="79" width="10" height="12" rx="2" fill="#E59D35" stroke={INK} strokeWidth="2" />
            {/* Tick marks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="110"
                y1="54"
                x2="110"
                y2="59"
                stroke={INK}
                strokeWidth="1.6"
                transform={`rotate(${deg} 110 85)`}
              />
            ))}
            {/* Hands stopped at 7:14 */}
            <line x1="110" y1="85" x2="96" y2="104" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
            <line
              x1="110"
              y1="85"
              x2="136"
              y2="82"
              stroke={isReacting ? '#B84935' : INK}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="110" cy="85" r="3.5" fill="#B84935" stroke={INK} strokeWidth="1.5" />
          </svg>
        );

      case 'snow-globe':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Glass sphere */}
            <circle cx="110" cy="74" r="48" fill="#233B5C" stroke={INK} strokeWidth="2.8" />
            {/* Miniature lighthouse */}
            <polygon points="103,96 117,96 114,58 106,58" fill="#F6F2EA" stroke={INK} strokeWidth="2" />
            <circle cx="110" cy="54" r="5" fill="#E59D35" />
            {/* Hairline crack in glass */}
            <path d="M134 42 L124 62 L130 78 L120 94" fill="none" stroke="#F6F2EA" strokeOpacity="0.8" strokeWidth="1.8" />
            {/* Swirl flakes */}
            {[
              [84, 58],
              [96, 44],
              [126, 52],
              [90, 82],
              [132, 84],
              [108, 72],
            ].map(([x, y], i) => (
              <circle
                key={i}
                cx={isReacting ? x + (i % 2 === 0 ? 5 : -5) : x}
                cy={isReacting ? y - 6 : y}
                r="2.4"
                fill="#F6F2EA"
              />
            ))}
            {/* Wooden base */}
            <path d="M72 116 L148 116 L156 142 L64 142 Z" fill="#463325" stroke={INK} strokeWidth="2.8" />
            {/* Tiny wildflowers on base */}
            <circle cx="102" cy="129" r="3" fill="#F6F2EA" />
            <circle cx="116" cy="127" r="3" fill="#E59D35" />
          </svg>
        );

      case 'keepsake-box':
        return (
          <svg viewBox="0 0 220 170" className="w-full h-full drop-shadow-[0_10px_14px_rgba(14,10,8,0.45)]">
            {/* Cedar box */}
            <rect x="40" y="64" width="140" height="74" rx="4" fill="#6E442A" stroke={INK} strokeWidth="2.8" />
            <rect
              x="36"
              y={isReacting ? 42 : 52}
              width="148"
              height="20"
              rx="3"
              fill="#845233"
              stroke={INK}
              strokeWidth="2.8"
            />
            {/* Brass latch */}
            <rect x="102" y="66" width="16" height="16" rx="2" fill="#E59D35" stroke={INK} strokeWidth="2.2" />
            {/* Outbound cream postcard tucked on top */}
            <rect
              x="66"
              y={isReacting ? 24 : 32}
              width="88"
              height="38"
              rx="2"
              fill="#F6F2EA"
              stroke={INK}
              strokeWidth="2.2"
              transform="rotate(-3 110 46)"
            />
            <rect x="134" y={isReacting ? 28 : 36} width="12" height="14" fill="#B84935" stroke={INK} strokeWidth="1.2" />
          </svg>
        );
    }
  };

  if (compact) {
    return <div className="w-full h-full flex items-center justify-center">{renderFrontArtwork()}</div>;
  }

  return (
    <div className="relative w-44 h-36 sm:w-52 sm:h-40 md:w-56 md:h-44 select-none">
      {!isFlipped ? (
        <div className="w-full h-full transition-transform duration-300 ease-out">
          {renderFrontArtwork()}
        </div>
      ) : (
        <div className="w-full h-full bg-[#F6F2EA] border-2 border-[#15100E] shadow-[0_12px_24px_rgba(14,10,8,0.55)] p-3.5 sm:p-4 flex flex-col justify-between text-[#191614] paper-grain relative">
          {/* Masking tape detail at top */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#E59D35]/40 border border-[#15100E]/20 -rotate-1" />

          <div>
            <p className="font-script text-base sm:text-lg leading-tight text-[#B84935]">
              {backInscription}
            </p>
            <p className="mt-1.5 text-[11px] sm:text-xs leading-snug text-[#191614]/85 font-serif-body">
              {backDetail}
            </p>
          </div>

          <div className="flex items-end justify-between gap-2 pt-2 border-t border-[#191614]/15">
            <span className="text-[10px] tracking-wide text-[#191614]/55 truncate">
              {keepsakeName}
            </span>

            {/* Tucked Cut-Paper Star */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCollectStar?.(e);
              }}
              aria-label={starCollected ? 'Margin quote collected' : 'Collect cut-paper star quote'}
              title={starCollected ? 'Quote saved in Inside the Box' : 'Tap to collect secret quote bookmark'}
              className={`group relative flex items-center gap-1.5 px-2 py-1 border transition-all cursor-pointer shrink-0 ${
                starCollected
                  ? 'border-[#476B49]/40 bg-[#476B49]/10 text-[#476B49]'
                  : 'border-[#E59D35]/70 bg-[#E59D35]/20 text-[#191614] hover:bg-[#E59D35]/35'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                <polygon
                  points="12,2 14.9,8.6 22,9.3 16.6,14 18.2,21 12,17.3 5.8,21 7.4,14 2,9.3 9.1,8.6"
                  fill={starCollected ? '#476B49' : '#E59D35'}
                  stroke="#15100E"
                  strokeWidth="1.6"
                />
              </svg>
              <span className="font-script text-sm leading-none">
                {starCollected ? 'Saved' : 'Star Quote'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
