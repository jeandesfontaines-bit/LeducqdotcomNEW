import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import _artistSubjectTransparent from "@/assets/images/artist_subject_transparent.png";
import _artistBgUser from "@/assets/images/artist_bg_user.png";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PLATFORMS = [
  { name: "Spotify", url: "https://open.spotify.com/album/2sjDcuO1cXVcQInuvFfkGH" },
  { name: "Apple Music", url: "https://music.apple.com/album/tes-lunettes/6788723035?i=6788723036" },
  { name: "Amazon Music", url: "https://music.amazon.fr/albums/B0H83WFG8H" },
  { name: "Deezer", url: "https://www.deezer.com/album/1024084151" },
  { name: "Youtube Music", url: "https://music.youtube.com/watch?v=G1KkzwKWDME&si=cV5dzo7_8uA3P56Z" },
  { name: "Soundcloud", url: "https://soundcloud.com/leducq/tes-lunettes" },
];

// Signature cinematic ease — reused everywhere so motion feels like one hand drew it.
const EASE = [0.16, 1, 0.3, 1] as const;

const NOISE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const NOISE_GRAIN_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' width='300' height='300'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

interface StreamingLinkProps {
  key?: string;
  name: string;
  url: string;
  index: number;
  onPlatformClick: (name: string, url: string) => void;
  reduceMotion: boolean;
}

/** A luxury studio tracklist link with spotlight focus & laser line hover effect */
const StreamingLink = ({
  name,
  url,
  index,
  onPlatformClick,
}: StreamingLinkProps) => {
  return (
    <motion.a
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        ease: EASE,
        delay: 0.95 + index * 0.07,
      }}
      whileTap={{ scale: 0.98 }}
      className="group/link relative flex items-center justify-center gap-2 sm:gap-2.5 py-2 sm:py-2.5 px-4 cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/nav:opacity-25 hover:!opacity-100"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        onPlatformClick(name, url);
      }}
    >
      {/* Platform Name with Luminous Focus & Kinetic Tracking */}
      <span className="relative font-leducq text-lg xs:text-xl sm:text-2xl font-medium uppercase tracking-[0.16em] text-white/70 group-hover/link:text-white group-hover/link:tracking-[0.24em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:drop-shadow-[0_0_14px_rgba(255,255,255,0.5)]">
        {name}

        {/* Ultra-fine laser gradient underline on hover (shortened) */}
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[0.5px] w-3/5 bg-gradient-to-r from-transparent via-white/80 to-transparent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center scale-x-0 group-hover/link:scale-x-100 opacity-0 group-hover/link:opacity-100" />
      </span>
    </motion.a>
  );
};

interface HeroHeaderProps {
  portraitUrl?: string;
  transparentPortraitUrl?: string;
  bgUrl?: string;
  albumCoverUrl?: string;
  releaseTextFR?: string;
  releaseTextEN?: string;
  lang?: "FR" | "EN";
  onLangChange?: (lang: "FR" | "EN") => void;
}

export default function HeroHeader({
  portraitUrl = _artistSubjectTransparent,
  transparentPortraitUrl = _artistSubjectTransparent,
  bgUrl = _artistBgUser,
  albumCoverUrl = "https://customer-assets-lxgj4vgw.emergentagent.net/job_electronic-artist/artifacts/3z4u8umr_Tes_lunettes.webp",
  releaseTextFR = "Nouvelle sortie · Juillet 2026",
  releaseTextEN = "New Release · July 2026",
  lang: propLang,
  onLangChange,
}: HeroHeaderProps) {
  const [internalLang, setInternalLang] = useState<"FR" | "EN">("FR");
  const lang = propLang ?? internalLang;

  const handleSetLang = (newLang: "FR" | "EN") => {
    setInternalLang(newLang);
    if (onLangChange) {
      onLangChange(newLang);
    }
  };
  const [isMounted, setIsMounted] = useState(false);
  const reduceMotion = !!useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  // Fallback chain — all are Vite-resolved URLs so they always resolve
  const PORTRAIT_SRCS = [transparentPortraitUrl, portraitUrl, _artistSubjectTransparent].filter(Boolean) as string[];
  const [portraitIdx, setPortraitIdx] = useState(0);
  const portraitSrc = PORTRAIT_SRCS[Math.min(portraitIdx, PORTRAIT_SRCS.length - 1)];

  const BG_SRCS = [bgUrl, _artistBgUser].filter(Boolean) as string[];
  const [bgIdx, setBgIdx] = useState(0);
  const bgSrc = BG_SRCS[Math.min(bgIdx, BG_SRCS.length - 1)];

  const handlePortraitError = () => setPortraitIdx(i => Math.min(i + 1, PORTRAIT_SRCS.length - 1));
  const handleBgError = () => setBgIdx(i => Math.min(i + 1, BG_SRCS.length - 1));

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // ---- Scroll-linked parallax, spring-smoothed so it trails the scroll instead of snapping to it
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothScroll = useSpring(heroScroll, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  // ---- Scroll-linked parallax for foreground vs background (activates strictly on scroll)
  const portraitY = useTransform(smoothScroll, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);
  const portraitScale = useTransform(smoothScroll, [0, 1], [1, reduceMotion ? 1 : 0.98]);
  const portraitOpacity = useTransform(smoothScroll, [0, 0.45, 0.85], [1, 0.85, 0]);

  // Background parallax: moves smoothly on scroll with subtle ambient depth
  const bgY = useTransform(smoothScroll, [0, 1], ["0%", reduceMotion ? "0%" : "20%"]);
  const bgScale = useTransform(smoothScroll, [0, 1], [1.06, reduceMotion ? 1.06 : 1.02]);
  const bgOpacity = useTransform(smoothScroll, [0, 0.5, 0.9], [1, 0.6, 0]);

  const pochetteY = useTransform(smoothScroll, [0, 1], ["0%", reduceMotion ? "0%" : "15%"]);
  const pochetteScale = useTransform(smoothScroll, [0, 1], [1, reduceMotion ? 1 : 0.95]);
  const captionY = useTransform(smoothScroll, [0, 1], ["0%", reduceMotion ? "0%" : "-8%"]);
  const linksY = useTransform(smoothScroll, [0, 1], ["0%", reduceMotion ? "0%" : "-14%"]);
  const rightColOpacity = useTransform(smoothScroll, [0, 0.45, 0.85], [1, 0.85, 0]);
  const headerOpacity = useTransform(smoothScroll, [0, 0.35, 0.75], [1, 0.8, 0]);
  const vignette = useTransform(smoothScroll, [0, 1], [0, reduceMotion ? 0 : 0.65]);

  const releaseInfo = lang === "FR" ? releaseTextFR : releaseTextEN;
  const releaseParts = releaseInfo.split("·").map((s) => s.trim());
  const releaseTop = releaseParts[0] || (lang === "FR" ? "Nouvelle sortie" : "New Release");
  const releaseBottom = releaseParts[1] || (lang === "FR" ? "Juillet 2026" : "July 2026");
  const listenHeader = lang === "FR" ? "ÉCOUTER" : "LISTEN";

  const handlePlatformClick = (_platformName: string, url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative bg-black text-white antialiased w-full">
      {/* Film-grain texture — sits above everything, barely there, keeps the black from feeling flat */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.045] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_URI}")` }}
      />

      {/* Header top gradient overlay to ensure crystal clear crisp text without blend artifacts */}
      <div className="absolute top-0 left-0 w-full h-28 sm:h-32 bg-gradient-to-b from-black/85 via-black/40 to-transparent z-40 pointer-events-none" />

      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="absolute top-0 left-0 w-full z-50 px-6 sm:px-8 md:px-16 lg:px-24 py-6 sm:py-8 md:py-10 flex justify-between items-center text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-sm md:text-base font-semibold tracking-[0.16em] uppercase font-leducq text-white drop-shadow-sm"
        >
          LEDUCQ.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="relative text-xs md:text-sm font-bold tracking-widest flex gap-4"
        >
          {(["FR", "EN"] as const).map((l) => (
            <button
              key={l}
              onClick={() => handleSetLang(l)}
              className="relative px-0.5 py-0.5 cursor-pointer"
            >
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  lang === l ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {l}
              </span>
              {lang === l && (
                <motion.span
                  layoutId="lang-underline"
                  className="absolute left-0 right-0 -bottom-0.5 h-[1px] bg-white"
                  transition={{ duration: 0.45, ease: EASE }}
                />
              )}
            </button>
          ))}
        </motion.div>
      </motion.header>

      {/* Hero */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="min-h-screen grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-2 relative overflow-hidden"
      >
        {/* Left: Portrait with independent multi-layer background */}
        <div
          className="relative h-[520px] xs:h-[560px] sm:h-[620px] md:h-screen overflow-hidden bg-black"
          style={{ perspective: 1200 }}
        >
          {/* 1. Independent Background Layer: Deep dark cinematic canvas with tactile analog grain / noise */}
          <motion.div
            style={{
              y: bgY,
              scale: bgScale,
              opacity: bgOpacity,
            }}
            className="absolute -inset-12 z-0 pointer-events-none overflow-hidden bg-[#030304]"
          >
            {/* Background Room / Environment Image */}
            {bgSrc && (
              <img
                alt="LEDUCQ Background"
                src={bgSrc}
                referrerPolicy="no-referrer"
                fetchPriority="high"
                decoding="async"
                onError={handleBgError}
                className="w-full h-full object-cover object-[64%_20%] sm:object-[62%_20%] md:object-[65%_22%] lg:object-[58%_22%] xl:object-[54%_22%] filter brightness-[0.62] contrast-[0.90] pointer-events-none"
              />
            )}

            {/* Deep subtle low-key ambient gradient for dimensionality without brightening the scene */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_36%,_rgba(10,10,14,0.45)_0%,_rgba(4,4,6,0.85)_45%,_rgba(0,0,0,0.98)_85%)]" />

            {/* High-definition analog grain / noise texture */}
            <div
              className="absolute inset-0 opacity-[0.14] mix-blend-screen pointer-events-none"
              style={{
                backgroundImage: `url("${NOISE_GRAIN_URI}")`,
                backgroundRepeat: "repeat",
                backgroundSize: "220px 220px",
              }}
            />

            {/* Secondary micro-noise layer for fine organic grain */}
            <div
              className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("${NOISE_URI}")`,
                backgroundRepeat: "repeat",
                backgroundSize: "120px 120px",
              }}
            />

            {/* Deep vignette — seamless transition into deep black */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-36 bg-gradient-to-r from-transparent to-black pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-l from-transparent to-black pointer-events-none" />
          </motion.div>

          {/* 2. Foreground Profile Picture / Subject Layer (moves gently on scroll) */}
          <motion.div
            style={{
              y: portraitY,
              scale: portraitScale,
              opacity: portraitOpacity,
            }}
            className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)", scale: 1.02 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
              className="w-full h-full flex items-center justify-center relative"
            >
              {/* LEDUCQ Artist Portrait with softened, comfortable illumination */}
              {portraitSrc && (
                <div className="relative w-full h-full">
                  <img
                    alt="LEDUCQ Portrait"
                    src={portraitSrc}
                    referrerPolicy="no-referrer"
                    fetchPriority="high"
                    decoding="async"
                    onError={handlePortraitError}
                    className="w-full h-full object-cover object-[64%_20%] sm:object-[62%_20%] md:object-[65%_22%] lg:object-[58%_22%] xl:object-[54%_22%] relative z-10 drop-shadow-2xl filter brightness-[0.70] contrast-[0.90] pointer-events-none"
                  />
                  {/* Subtle darkening veil specifically mitigating dog and bright highlights */}
                  <div className="absolute inset-0 bg-black/25 mix-blend-multiply pointer-events-none z-15" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none z-15" />
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Scroll vignette for depth as the section scrolls away */}
          <motion.div
            aria-hidden
            style={{ opacity: vignette }}
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"
          />
        </div>

        {/* Right: Album cover & platform links */}
        <motion.div
          style={{ y: captionY, opacity: rightColOpacity }}
          className="relative bg-black flex flex-col justify-center items-center pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-6 sm:px-8 md:px-10 lg:px-16 md:min-h-screen md:sticky md:top-0 gap-5 sm:gap-6 md:gap-6 lg:gap-7"
        >
          <div className="flex flex-col items-center max-w-[240px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[230px] lg:max-w-[280px] xl:max-w-[320px] w-full z-10">
            {/* Top release info ("Nouvelle sortie") */}
            <motion.div
              initial={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              className="text-[11px] sm:text-[12px] md:text-[13px] text-[#8a8a8a] tracking-[0.25em] uppercase mb-2 sm:mb-3 text-center font-medium font-mono"
            >
              {releaseTop}
            </motion.div>

            {/* Album cover with curtain reveal */}
            <motion.div
              style={{ y: pochetteY, scale: pochetteScale, perspective: 800 }}
              className="relative w-full aspect-square"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-sm shadow-2xl">
                <motion.img
                  alt="Tes lunettes Album Cover"
                  src={albumCoverUrl}
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  decoding="async"
                  initial={{ scale: 1.25, filter: "blur(12px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, delay: 0.6, ease: EASE }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

                {/* Curtain reveal for the cover, offset from the portrait's timing */}
                <motion.div
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 1.0, delay: 0.7, ease: EASE }}
                  style={{ originY: 1 }}
                  className="absolute inset-0 bg-black z-20 pointer-events-none"
                />
              </div>
            </motion.div>
          </div>

          {/* Streaming links - centered exactly in the middle of the Hero on desktop */}
          <motion.div
            style={{ y: linksY }}
            className="flex flex-col items-center text-center z-30 w-full mt-8 sm:mt-10 md:mt-0 md:absolute md:left-0 md:-translate-x-1/2 md:bottom-10 lg:bottom-14 md:w-max pointer-events-none"
          >
            <nav className="group/nav flex flex-col items-center gap-1 sm:gap-1.5 pointer-events-auto">
              {PLATFORMS.map(({ name, url }, i) => (
                <StreamingLink
                  key={name}
                  name={name}
                  url={url}
                  index={i}
                  onPlatformClick={handlePlatformClick}
                  reduceMotion={reduceMotion}
                />
              ))}
            </nav>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
