import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Instagram } from "lucide-react";
import { LANDING } from "@/constants/testIds";
import footerSky from "@/assets/images/footer_sky_clean.jpg";
import footerScene from "@/assets/images/footer_scene_clean.png";

const SpotifyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.306c-.215.352-.674.464-1.026.25-2.812-1.718-6.353-2.106-10.523-1.153-.402.092-.801-.16-.893-.562-.093-.403.159-.802.562-.894 4.571-1.045 8.492-.596 11.628 1.333.353.216.465.674.252 1.026zm1.464-3.255c-.27.44-.847.578-1.287.308-3.22-1.979-8.128-2.552-11.936-1.396-.497.151-1.025-.133-1.176-.63-.151-.497.133-1.025.63-1.176 4.354-1.321 9.774-.682 13.461 1.587.44.27.578.847.308 1.307zm.126-3.39c-3.86-2.292-10.228-2.504-13.917-1.384-.593.18-1.22-.164-1.4-.757-.18-.593.164-1.22.757-1.4 4.242-1.288 11.278-1.042 15.727 1.598.533.316.707 1.01.39 1.543-.316.533-1.01.708-1.557.4zm0 0" />
  </svg>
);

const AppleMusicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.994 6.129c-.102-.792-.426-1.488-.973-2.035-.615-.615-1.385-.945-2.279-.974-.355-.011-1.636.009-3.842.062-2.207.052-4.576.088-7.108.107-3.882.03-6.643-.016-8.283-.138C.98 3.104.542 3.327.24 3.791.077 4.041 0 4.382 0 4.793v14.414c0 .411.077.752.24 1.002.302.464.74.687 1.269.64 1.64-.122 4.401-.168 8.283-.138 2.532.019 4.901.055 7.108.107 2.206.053 3.487.073 3.842.062.894-.029 1.664-.359 2.279-.974.547-.547.871-1.243.973-2.035.068-.535.088-1.921.06-4.157-.028-2.237-.048-3.623.02-4.157.068-.534.048-1.92-.02-4.156-.068-2.236-.048-3.622.02-4.156zM15.42 12.443l-5.672 3.275c-.328.189-.687.098-.797-.203-.037-.101-.055-.218-.055-.351V8.608c0-.133.018-.25.055-.351.11-.301.469-.392.797-.203l5.672 3.275c.328.189.328.498 0 .687z" />
  </svg>
);

const AmazonMusicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.002 0a12 12 0 1012 12A12.013 12.013 0 0012.002 0zm0 21.6A9.6 9.6 0 1121.6 12a9.61 9.61 0 01-9.598 9.6zm3.99-6.39a8.41 8.41 0 01-7.98 0 .6.6 0 01.6-1.04 7.21 7.21 0 006.78 0 .6.6 0 01.6 1.04zm-.5-3.21a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5zm-6.98 0a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z" />
  </svg>
);

const YoutubeMusicIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.144c-3.94 0-7.144-3.204-7.144-7.144 0-3.94 3.204-7.144 7.144-7.144 3.94 0 7.144 3.204 7.144 7.144 0 3.94-3.204 7.144-7.144 7.144zm0-11.43c-2.364 0-4.286 1.922-4.286 4.286 0 2.364 1.922 4.286 4.286 4.286 2.364 0 4.286-1.922 4.286-4.286 0-2.364-1.922-4.286-4.286-4.286zm-1.714 6.215V9.929l3.857 2.071-3.857 2.072z" />
  </svg>
);

const DeezerIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.8 4h3.6v16h-3.6zm-4.7 4h3.6v12h-3.6zm-4.7 4h3.6v8H9.4zm-4.7 2h3.6v6H4.7zm-4.7 3h3.6v3H0z" />
  </svg>
);

const SoundcloudIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.56 8.87V17h8.88a3.56 3.56 0 00.31-7.11 4.7 4.7 0 00-4.63-3.91 4.87 4.87 0 00-4.56 2.89zm-1.78 1.48v6.65h.89V9.89a2.53 2.53 0 00-.89.46zm-1.77.89v5.76h.88v-5.76zm-1.78.6v5.16h.89v-5.16zm-1.78.89v4.27h.89v-4.27zm-1.78.89v3.38h.89v-3.38zm-1.78 1.18v2.2h.89v-2.2z" />
  </svg>
);

interface FooterProps {
  tagline?: string;
  copyright?: string;
}

export default function Footer({
  tagline = "Le cinéma du réel mis en musique",
  copyright = "Tous droits réservés.",
}: FooterProps) {
  const footerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const sceneY = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["15px", "-10px"]);

  // Dynamic frosted glass backdrop-filter blur responding to scroll
  const frostedBlur = useTransform(
    scrollYProgress,
    [0, 0.25, 0.65],
    ["blur(0px)", "blur(14px)", "blur(28px)"]
  );
  const frostedOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5],
    [0, 0.9, 1]
  );

  return (
    <footer
      ref={footerRef}
      data-testid={LANDING.footer}
      className="relative min-h-[100vh] w-full overflow-hidden isolate bg-black text-[#F5F7FB] flex flex-col justify-between"
    >
      {/* Dynamic Frosted Glass Backdrop-Filter Veil at Top Boundary */}
      <motion.div
        data-testid="footer-frosted-glass-veil"
        style={{
          backdropFilter: frostedBlur,
          WebkitBackdropFilter: frostedBlur,
          opacity: frostedOpacity,
        }}
        className="absolute top-0 left-0 right-0 h-40 sm:h-56 md:h-72 z-[15] pointer-events-none bg-gradient-to-b from-black/70 via-black/30 to-transparent border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
      />

      {/* 1. Deep Starry Sky Background */}
      <img
        src={footerSky}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
        decoding="async"
      />

      {/* 2. Smooth Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none select-none bg-gradient-to-b from-black/80 via-transparent to-black"
        aria-hidden="true"
      />

      {/* 3. Mountain Landscape Scene with Smooth Parallax */}
      <motion.div
        style={{ y: sceneY }}
        className="absolute left-1/2 -translate-x-1/2 -bottom-[6%] sm:-bottom-[8%] md:-bottom-[8%] w-full max-w-[2560px] h-[42vh] sm:h-[50vh] md:h-[58vh] max-h-[700px] z-[2] pointer-events-none select-none flex items-end justify-center"
      >
        <img
          src={footerScene}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-bottom"
          decoding="async"
        />
      </motion.div>

      {/* 4. Top Branding Content */}
      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 pt-20 sm:pt-28 md:pt-36 select-none flex flex-col justify-start">
        <motion.p
          style={{ y: wordmarkY }}
          className="font-leducq-bold text-[#F5F7FB] text-[clamp(3.5rem,16vw,16rem)] leading-[0.82] tracking-[0.1em] font-bold text-left drop-shadow-2xl"
        >
          LEDUCQ.
        </motion.p>
        <p className="font-leducq text-base sm:text-xl md:text-2xl lg:text-3xl text-[#F5F7FB]/90 tracking-[0.06em] mt-6 sm:mt-10 md:mt-14 font-medium text-left">
          {tagline}
        </p>
      </div>

      {/* 5. Bottom Navigation & Social Links */}
      <div className="relative z-20 w-full px-6 sm:px-10 md:px-16 lg:px-24 pb-8 sm:pb-10 md:pb-12 pt-32 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 font-mono text-xs md:text-sm tracking-[0.08em] text-[#F5F7FB]/85">
          <div className="flex flex-wrap items-center gap-6" data-testid="footer-social-icons">
            {[
              { name: "Instagram", url: "https://instagram.com", Icon: Instagram, testId: "footer-social-instagram" },
              { name: "Spotify", url: "https://open.spotify.com/album/2sjDcuO1cXVcQInuvFfkGH", Icon: SpotifyIcon, testId: "footer-social-spotify" },
              { name: "Apple Music", url: "https://music.apple.com/album/tes-lunettes/6788723035?i=6788723036", Icon: AppleMusicIcon, testId: "footer-social-applemusic" },
              { name: "Amazon Music", url: "https://music.amazon.fr/albums/B0H83WFG8H", Icon: AmazonMusicIcon, testId: "footer-social-amazonmusic" },
              { name: "YouTube Music", url: "https://music.youtube.com/watch?v=G1KkzwKWDME&si=cV5dzo7_8uA3P56Z", Icon: YoutubeMusicIcon, testId: "footer-social-youtubemusic" },
              { name: "Deezer", url: "https://www.deezer.com/album/1024084151", Icon: DeezerIcon, testId: "footer-social-deezer" },
              { name: "SoundCloud", url: "https://soundcloud.com/leducq/tes-lunettes", Icon: SoundcloudIcon, testId: "footer-social-soundcloud" },
            ].map(({ name, url, Icon, testId }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={name}
                title={name}
                data-testid={testId}
                className="text-[#F5F7FB]/70 hover:text-white transition-colors duration-200"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            ))}
          </div>

          <span data-testid="footer-credits" className="text-[#F5F7FB]/70">
            © 2026 LEDUCQ. {copyright}
          </span>
        </div>
      </div>
    </footer>
  );
}
