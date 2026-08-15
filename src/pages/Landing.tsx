import React, { useState, useRef } from "react";
import { LANDING } from "@/constants/testIds";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import HeroHeader from "@/components/HeroHeader";
import Footer from "@/components/Footer";

import artistSubjectTransparent from "@/assets/images/artist_subject_transparent.png";
import artistBg from "@/assets/images/artist_bg_user.png";

const PORTRAIT = artistSubjectTransparent;
const PORTRAIT_TRANSPARENT = artistSubjectTransparent;
const BG_TEXTURE = artistBg;
const ALBUM = "https://customer-assets-lxgj4vgw.emergentagent.net/job_electronic-artist/artifacts/3z4u8umr_Tes_lunettes.webp";

// Precision Intersection-Observer Reveal Component for subtle, restrained Swiss animations with parallax drift
interface InViewTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

function InViewText({
  children,
  className = "",
  delay = 0,
  yOffset = 18,
  duration = 1.0,
  threshold = 0.15,
  once = false,
}: InViewTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: "0px 0px -8% 0px",
  });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: yOffset, filter: "blur(4px)" }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: yOffset * 0.7, filter: "blur(2px)" }
        }
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Landing() {
  useSmoothScroll();

  const [lang, setLang] = useState<"FR" | "EN">("FR");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const aboutSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: rawSectionProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start start", "end end"],
  });

  const smoothSectionProgress = useSpring(rawSectionProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate section active visibility for the top progress bar indicator
  const { scrollYProgress: sectionPresence } = useScroll({
    target: aboutSectionRef,
    offset: ["start end", "end start"],
  });

  const sectionBarOpacity = useTransform(
    sectionPresence,
    [0, 0.08, 0.92, 1],
    [0, 1, 1, 0]
  );

  React.useEffect(() => {
    // Graceful initialization to prevent flash of raw layout
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 60);

    // Preload critical hero images for faster first paint & seamless loading
    const imagesToPreload = [PORTRAIT, BG_TEXTURE, ALBUM];
    imagesToPreload.forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePlatformClick = (platformName: string, url: string) => {
    setToastMessage(lang === "FR" ? `Ouverture de ${platformName}...` : `Opening ${platformName}...`);
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setToastMessage(null);
    }, 800);
  };

  const t = {
    FR: {
      releaseInfo: "Nouvelle sortie · Juillet 2026",
      trackTitle: "TES LUNETTES",
      trackSub: "Scène 01 — Single disponible",
      sectionMarker: "QUI EST LEDUCQ. ?",
      dominant: "Ce qui reste quand le moment est passé.",
      secondary: "Je pars du réel.",
      frag1: "Des lieux familiers.",
      frag2: "Des gestes ordinaires.",
      frag3: "Des conversations inachevées.",
      frag4: "Des émotions que l’on ne dit pas.",
      transition: "Chaque morceau naît d’un instant précis et tente d’en conserver quelque chose.",
      prelude: "Pas une histoire à raconter.",
      climax: "Un moment à faire ressentir.",
      follow: "Suivre",
      socials: "Réseaux",
      subscribe: "S'abonner",
      subscribeTitle: "Gardons le contact.",
      newsletter: "Infolettre",
      newsletterDesc: "Recevez les nouvelles sorties et actualités de LEDUCQ.",
      newsletterOk: "Valider",
      subscribed: "Merci pour votre inscription !",
      contact: "CONTACT@LEDUCQMUSIC.COM",
      tagline: "Le cinéma du réel mis en musique",
      copyright: "Tous droits réservés.",
      listenHeader: "ÉCOUTER",
      poem1: "Un souvenir.",
      poem2: "Un objet.",
      poem3: "Un moment qui reste.",
      listenNow: "Écouter l'extrait",
    },
    EN: {
      releaseInfo: "New Release · July 2026",
      trackTitle: "TES LUNETTES",
      trackSub: "Scene 01 — Single out now",
      sectionMarker: "QUI EST LEDUCQ. ?",
      dominant: "What remains when the moment has passed.",
      secondary: "I start from reality.",
      frag1: "Familiar places.",
      frag2: "Ordinary gestures.",
      frag3: "Unfinished conversations.",
      frag4: "Emotions left unspoken.",
      transition: "Every track is born from a precise instant and tries to hold onto something from it.",
      prelude: "Not a story to tell.",
      climax: "A moment to be felt.",
      follow: "Follow",
      socials: "Socials",
      subscribe: "Subscribe",
      subscribeTitle: "Let's stay in touch.",
      newsletter: "Newsletter",
      newsletterDesc: "Receive new releases and news from LEDUCQ.",
      newsletterOk: "Submit",
      subscribed: "Thank you for subscribing!",
      contact: "CONTACT@LEDUCQMUSIC.COM",
      tagline: "The cinema of reality set to music",
      copyright: "All rights reserved.",
      listenHeader: "LISTEN",
      poem1: "A memory.",
      poem2: "An object.",
      poem3: "A moment that remains.",
      listenNow: "Listen now",
    }
  }[lang];

  return (
    <div className="bg-black text-white antialiased overflow-x-hidden selection:bg-white selection:text-black min-h-screen">
      {/* Page Load Fade-in & Skeleton Initialization Veil */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isInitialized ? 0 : 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: isInitialized ? "none" : "auto" }}
        className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
      >
        <div className="w-8 h-[1px] bg-white/40 animate-pulse" />
      </motion.div>

      {/* Global Page Scroll Progress Bar */}
      <div
        data-testid="scroll-progress-bar"
        className="fixed top-0 left-0 h-[2px] bg-white/30 z-[100] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* QUI EST LEDUCQ. ? — Dedicated Swiss Minimalist Section Progress Line */}
      <motion.div
        data-testid="about-section-progress-container"
        style={{ opacity: sectionBarOpacity }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[101] pointer-events-none"
      >
        <motion.div
          className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
          style={{
            scaleX: smoothSectionProgress,
            transformOrigin: "0%",
          }}
        />
      </motion.div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-widest uppercase px-5 py-3 rounded-full shadow-2xl transition-all duration-300">
          {toastMessage}
        </div>
      )}

      <HeroHeader
        portraitUrl={PORTRAIT}
        transparentPortraitUrl={PORTRAIT_TRANSPARENT}
        bgUrl={BG_TEXTURE}
        albumCoverUrl={ALBUM}
        lang={lang}
        onLangChange={setLang}
      />

      <main className="relative z-10">
        {/* QUI EST LEDUCQ. ? — Asymmetric Swiss Cinematic Narrative Composition with Scroll Snapping */}
        <section
          ref={aboutSectionRef}
          data-testid={LANDING.about}
          className="relative bg-black text-white py-28 sm:py-40 md:py-56 lg:py-72 px-5 sm:px-10 md:px-16 lg:px-24 border-t border-white/10 overflow-hidden snap-section"
        >
          {/* Seamless gradient into footer */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-0 right-0 bottom-[240px] sm:bottom-[360px] bg-black" />
            <div className="absolute left-0 right-0 bottom-0 h-[240px] sm:h-[360px] bg-gradient-to-b from-black to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto w-full">
            {/* 1. Discreet editorial section marker */}
            <InViewText delay={0.05} yOffset={10} duration={0.85} threshold={0.1} className="mb-12 sm:mb-18 md:mb-28 pl-1 sm:pl-2 snap-item">
              <span className="font-mono text-[11px] sm:text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase font-normal select-none">
                {t.sectionMarker}
              </span>
            </InViewText>

            {/* 2. Dominant visual element with tight Swiss leading & chromatic hover */}
            <div className="mb-20 sm:mb-28 md:mb-40 max-w-5xl snap-item">
              <InViewText delay={0.08} yOffset={16} duration={1.15} threshold={0.12}>
                <h2 className="chromatic-hover font-leducq text-[30px] sm:text-[46px] md:text-[62px] lg:text-[76px] xl:text-[86px] font-light leading-[1.0] sm:leading-[1.02] text-[#F5F7FB] tracking-[-0.03em] text-left drop-shadow-sm">
                  {t.dominant}
                </h2>
              </InViewText>
            </div>

            {/* 3. Spatially separated secondary statement with quote opener & chromatic hover */}
            <div className="flex justify-start md:justify-end mb-24 sm:mb-36 md:mb-48 pl-2 sm:pl-0 md:pr-12 lg:pr-24 snap-item">
              <InViewText delay={0.14} yOffset={18} duration={1.2} threshold={0.15} className="relative max-w-md">
                <div className="flex items-baseline">
                  <span className="font-leducq text-white/35 text-2xl sm:text-3xl md:text-4xl mr-2 font-light select-none">
                    «
                  </span>
                  <p className="chromatic-hover font-leducq text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light leading-[1.18] text-white/90 tracking-[-0.01em] text-left">
                    {t.secondary}
                  </p>
                </div>
              </InViewText>
            </div>

            {/* 4. Four memory fragments placed across space with scroll-snapping alignment and chromatic hover */}
            <div className="space-y-14 sm:space-y-24 md:space-y-32 mb-28 sm:mb-44 md:mb-56">
              {/* Fragment 1: Left-anchored with early delicate entrance */}
              <div className="w-full flex justify-start pl-3 sm:pl-8 md:pl-6 lg:pl-12 snap-item">
                <InViewText delay={0.08} yOffset={14} duration={0.95} threshold={0.12}>
                  <p className="chromatic-hover font-leducq text-base sm:text-xl md:text-2xl lg:text-[28px] font-light leading-[1.15] text-white/80 tracking-wide">
                    {t.frag1}
                  </p>
                </InViewText>
              </div>

              {/* Fragment 2: Offset rightwards with distinct float speed */}
              <div className="w-full flex justify-start sm:justify-end pl-8 sm:pl-0 sm:pr-8 md:pr-20 lg:pr-36 snap-item">
                <InViewText delay={0.16} yOffset={22} duration={1.25} threshold={0.15}>
                  <p className="chromatic-hover font-leducq text-base sm:text-xl md:text-2xl lg:text-[28px] font-light leading-[1.15] text-white/75 tracking-wide">
                    {t.frag2}
                  </p>
                </InViewText>
              </div>

              {/* Fragment 3: Indented middle step */}
              <div className="w-full flex justify-start pl-6 sm:pl-20 md:pl-28 lg:pl-48 snap-item">
                <InViewText delay={0.12} yOffset={18} duration={1.1} threshold={0.14}>
                  <p className="chromatic-hover font-leducq text-base sm:text-xl md:text-2xl lg:text-[28px] font-light leading-[1.15] text-white/80 tracking-wide">
                    {t.frag3}
                  </p>
                </InViewText>
              </div>

              {/* Fragment 4: Right-anchored anchor with deep slow arrival */}
              <div className="w-full flex justify-start sm:justify-end pl-10 sm:pl-0 sm:pr-4 md:pr-8 lg:pr-16 snap-item">
                <InViewText delay={0.22} yOffset={26} duration={1.4} threshold={0.16}>
                  <p className="chromatic-hover font-leducq text-base sm:text-xl md:text-2xl lg:text-[28px] font-light leading-[1.15] text-white/85 tracking-wide">
                    {t.frag4}
                  </p>
                </InViewText>
              </div>
            </div>

            {/* 5. Transitional statement with distinct medium typographic weight */}
            <div className="mb-24 sm:mb-36 md:mb-48 max-w-3xl pl-2 sm:pl-6 md:pl-8 lg:pl-16 snap-item">
              <InViewText delay={0.14} yOffset={20} duration={1.3} threshold={0.15}>
                <p className="chromatic-hover font-leducq text-lg sm:text-2xl md:text-3xl lg:text-[34px] font-light leading-[1.2] sm:leading-[1.22] text-white/85 tracking-[-0.01em] text-left">
                  {t.transition}
                </p>
              </InViewText>
            </div>

            {/* 6. Climax: Two-part resolution with tight Swiss leading & strong weight contrast */}
            <div className="relative space-y-5 sm:space-y-8 md:space-y-10 pl-2 sm:pl-6 md:pl-4 lg:pl-8 max-w-4xl snap-item">
              <InViewText delay={0.1} yOffset={14} duration={1.05} threshold={0.12}>
                <p className="chromatic-hover font-leducq text-base sm:text-xl md:text-2xl lg:text-3xl font-light leading-[1.15] text-white/55 tracking-wide text-left">
                  {t.prelude}
                </p>
              </InViewText>

              <InViewText delay={0.18} yOffset={24} duration={1.35} threshold={0.15}>
                <div className="relative inline-flex items-baseline flex-wrap">
                  <span className="chromatic-hover font-leducq-bold text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em] leading-[1.05] text-left inline-block">
                    {t.climax}
                  </span>
                  <span className="font-leducq text-white/35 text-xl sm:text-3xl md:text-5xl lg:text-6xl font-light ml-2 inline-block select-none">
                    »
                  </span>
                </div>
              </InViewText>
            </div>
          </div>
        </section>
      </main>

      <Footer tagline={t.tagline} copyright={t.copyright} />
    </div>
  );
}
