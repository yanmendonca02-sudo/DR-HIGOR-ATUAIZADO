import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Activity,
  ArrowRight,
  ArrowUp,
  Award,
  Check,
  Clock,
  Compass,
  Droplets,
  Gem,
  Instagram,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Quote,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Configuração — troque o número abaixo pelo WhatsApp real do Dr.    */
/* ------------------------------------------------------------------ */
// Número no formato internacional, apenas dígitos: 55 + DDD + número.
const WHATSAPP_NUMBER = "5521998084105";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá, Dr. Higor! Gostaria de agendar uma avaliação estratégica.",
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const INSTAGRAM_LINK = "https://www.instagram.com/dr.higorazevedo";
const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Rua%20Miguel%20de%20Frias%2C%20150%2C%20Icara%C3%AD%2C%20Niter%C3%B3i%2C%20RJ";

const NAV_LINKS = [
  { href: "#estrategia", label: "Estratégia" },
  { href: "#servicos", label: "Serviços" },
  { href: "#resultados", label: "Resultados" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

/* ------------------------------------------------------------------ */
/*  Primitivas                                                         */
/* ------------------------------------------------------------------ */

type RevealDirection = "up" | "down" | "left" | "right";

/**
 * Revela o conteúdo conforme ele entra na tela (scroll reveal).
 * Com prefers-reduced-motion mantém um fade suave (sem deslocamento) —
 * assim o efeito continua visível, porém mais discreto.
 */
function Reveal({
  children,
  delay = 0,
  className,
  direction = "up",
  distance = 36,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
}) {
  const reduceMotion = useReducedMotion();

  const offset =
    direction === "up"
      ? { y: distance }
      : direction === "down"
        ? { y: -distance }
        : direction === "left"
          ? { x: distance }
          : { x: -distance };

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={
        reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Movimento parallax suave atrelado à rolagem (respeita reduced motion). */
function Parallax({
  children,
  className,
  distance = 36,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

const MARQUEE_ITEMS = [
  "Proporção",
  "Sustentação",
  "Qualidade de Pele",
  "Projeção",
  "Naturalidade",
  "Estratégia",
];

/**
 * Faixa em rolagem infinita estilo esteira (decorativa, aria-hidden).
 * Animada via framer-motion (JS), então roda mesmo onde animações CSS
 * estão desativadas (ex.: preview com reduced-motion).
 */
function Marquee() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-brown/10 bg-peach/70 py-5"
    >
      <motion.div
        className="flex w-max items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 pr-10 text-sm font-semibold uppercase tracking-[0.28em] text-brown/55"
          >
            {item}
            <span className="size-1.5 rounded-full bg-gold" aria-hidden />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Eyebrow({
  children,
  className,
  labelClassName,
}: {
  children: ReactNode;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-10 bg-gold" aria-hidden />
      <span
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-strong",
          labelClassName,
        )}
      >
        {children}
      </span>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* Texturas de grade — tons quentes em fundos claros e escuros */
const lightGrid = {
  backgroundImage:
    "linear-gradient(to right, rgb(107 83 68 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(107 83 68 / 0.05) 1px, transparent 1px)",
  backgroundSize: "64px 64px",
};

const darkGrid = {
  backgroundImage:
    "linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
  backgroundSize: "64px 64px",
};

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy — destaca a seção visível na navegação.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Fecha com Esc e trava o scroll do body enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Fecha o menu ao redimensionar para desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-brown/10 bg-cream/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#top" className="group flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-tight text-brown transition-colors group-hover:text-gold-strong">
            Dr. Higor Azevedo
          </span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.32em] text-gold-strong">
            Harmonização Glútea
          </span>
        </a>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-gold-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
                active === link.href ? "text-brown" : "text-brown/70",
              )}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-gold"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="lg"
            className="hidden h-10 rounded-full bg-taupe px-5 text-brown-deep hover:bg-gold hover:text-brown-deep sm:inline-flex"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Agendar avaliação
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-full text-brown transition-colors hover:bg-peach focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-brown/10 bg-cream/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4"
              aria-label="Navegação mobile"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-brown/5 py-4 text-[15px] font-medium text-brown/80 transition-colors hover:text-gold-strong"
                >
                  {link.label}
                  <ArrowRight className="size-4 text-gold-strong" />
                </a>
              ))}
              <Button
                asChild
                size="lg"
                className="mt-5 h-12 rounded-full bg-taupe text-brown-deep hover:bg-gold hover:text-brown-deep"
              >
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <WhatsAppIcon className="size-4" />
                  Agendar avaliação estratégica
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Barra de progresso + voltar ao topo                                */
/* ------------------------------------------------------------------ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-strong via-gold to-gold-strong"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 right-5 z-40 flex size-10 items-center justify-center rounded-full border border-brown/15 bg-cream/90 text-brown shadow-[0_10px_30px_-12px_rgb(107_83_68_/_0.5)] backdrop-blur-md transition-colors hover:border-gold hover:text-gold-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:bottom-24 sm:right-6"
        >
          <ArrowUp className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function HeroArt() {
  return (
    <Parallax
      distance={28}
      className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-[2rem] border border-sand bg-beige"
        style={lightGrid}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(420px 420px at 30% 20%, rgb(201 169 97 / 0.22), transparent 65%), radial-gradient(360px 320px at 85% 85%, rgb(244 228 215 / 0.9), transparent 60%)",
          }}
        />
        <svg
          viewBox="0 0 400 400"
          fill="none"
          className="absolute inset-0 h-full w-full"
        >
          {/* eixos */}
          <path
            d="M200 8 V392"
            stroke="rgb(107 83 68 / 0.07)"
            strokeWidth="1"
          />
          <path
            d="M8 200 H392"
            stroke="rgb(107 83 68 / 0.07)"
            strokeWidth="1"
          />
          {/* anéis concêntricos */}
          {[64, 96, 128, 160, 190].map((r) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              stroke="rgb(107 83 68 / 0.1)"
              strokeWidth="1"
            />
          ))}
          <circle
            cx="200"
            cy="200"
            r="128"
            stroke="rgb(107 83 68 / 0.16)"
            strokeWidth="1"
            strokeDasharray="3 8"
          />
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="var(--gold)"
            strokeOpacity="0.9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2 10"
          />
          {/* curvas de contorno */}
          <path
            d="M52 236 C 132 160, 236 302, 348 168"
            stroke="url(#goldGrad)"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M52 258 C 136 340, 248 128, 348 214"
            stroke="rgb(107 83 68 / 0.3)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeDasharray="2 7"
          />
          {/* ponto focal */}
          <circle cx="200" cy="200" r="4.5" fill="var(--gold)" />
          <circle
            cx="200"
            cy="200"
            r="12"
            stroke="var(--gold)"
            strokeOpacity="0.6"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.45" />
              <stop offset="50%" stopColor="var(--gold)" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.45" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-3 top-8 rounded-full border border-brown/15 bg-beige/90 px-4 py-2 shadow-[0_10px_30px_-14px_rgb(107_83_68_/_0.4)] backdrop-blur-md sm:left-2"
      >
        <p className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-brown/80">
          <span className="size-1.5 rounded-full bg-gold" aria-hidden />
          Proporção · Projeção
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -right-2 bottom-10 rounded-full border border-brown/15 bg-beige/90 px-4 py-2 shadow-[0_10px_30px_-14px_rgb(107_83_68_/_0.4)] backdrop-blur-md sm:right-2"
      >
        <p className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-brown/80">
          <span className="size-1.5 rounded-full bg-gold" aria-hidden />
          Sustentação · Qualidade de pele
        </p>
      </motion.div>
    </Parallax>
  );
}

const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      {/* fundo */}
      <div className="pointer-events-none absolute inset-0" style={lightGrid} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(720px 480px at 78% 12%, rgb(201 169 97 / 0.2), transparent 62%), radial-gradient(560px 420px at 8% 90%, rgb(200 149 109 / 0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 pb-20 pt-32 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            variants={heroContainer}
            initial={reduceMotion ? { opacity: 0 } : "hidden"}
            animate={reduceMotion ? { opacity: 1 } : "show"}
            transition={
              reduceMotion ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] } : undefined
            }
          >
            <motion.div variants={heroItem}>
              <Eyebrow>Harmonização glútea · Icaraí, Niterói</Eyebrow>
            </motion.div>

            <motion.div variants={heroItem}>
              <h1 className="mt-7 text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-brown sm:text-6xl lg:text-[4.2rem]">
                O bumbum dos seus sonhos é uma questão de{" "}
                <span className="text-gold-gradient">estratégia.</span>
              </h1>
            </motion.div>

            <motion.div variants={heroItem}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-brown/65 sm:text-lg">
                Harmonização glútea de alta performance — atendimento presencial
                em Icaraí, Niterói e consultoria online. Mais que volume:
                arquitetura, proporção e naturalidade desenhadas para o seu corpo.
              </p>
            </motion.div>

            <motion.div variants={heroItem}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="h-13 rounded-full bg-taupe px-7 text-[15px] text-brown-deep shadow-[0_8px_30px_-8px_rgb(212_165_116_/_0.7)] transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-brown-deep"
                >
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agende sua avaliação estratégica
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-full border-brown/25 bg-transparent px-7 text-[15px] text-brown transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:bg-peach hover:text-brown"
                >
                  <a href="#resultados">Ver resultados</a>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={heroItem}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-brown/10 pt-6 text-[13px] text-brown/60">
                <span className="flex items-center gap-2">
                  <Award className="size-4 text-terracotta" />
                  CRBM 07986 · CREF 27639
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-terracotta" />
                  Presencial e Online
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="size-4 text-terracotta" />
                  Seg–Sex · 09h–19h
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroArt />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Manifesto — Beyond Volume                                          */
/* ------------------------------------------------------------------ */

function Manifesto() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto w-full max-w-3xl px-6 text-center lg:px-8">
        <Reveal>
          <Eyebrow className="justify-center">Conceito beyond volume</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-7 text-3xl font-semibold leading-tight tracking-tight text-brown sm:text-5xl">
            Não vendemos volume.
            <br />
            Desenhamos <span className="text-gold-gradient">arquitetura.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-brown/60 sm:text-lg">
            Proporção é o que torna um resultado bonito; sustentação é o que o
            mantém. Por isso o método de Dr. Higor trata o glúteo como peça
            estrutural — avaliando ângulos, base muscular, qualidade de pele e
            projeção antes de qualquer protocolo.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mx-auto mt-10 h-px w-16 bg-gold" aria-hidden />
          <p className="mt-6 text-sm font-medium tracking-wide text-brown/80">
            Dr. Higor Azevedo
            <span className="ml-2 text-[11px] uppercase tracking-[0.22em] text-brown/50">
              Biomédico Esteta · CRBM 07986
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Estratégia — 4 Pilares Estruturais                                 */
/* ------------------------------------------------------------------ */

const PILLARS = [
  {
    number: "01",
    icon: Compass,
    title: "Proporção",
    tagline: "Aerodinâmica do corpo",
    text: "Avaliação métrica da relação cintura–quadril, ângulos e transições, para que o contorno converse com a sua estrutura — e não contra ela.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Sustentação",
    tagline: "Integridade estrutural",
    text: "Planejamento da base muscular e do suporte tecidual que seguram o resultado: firme, estável e durável ao longo do tempo.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Qualidade de Pele",
    tagline: "Refinamento de superfície",
    text: "Bioestimulação de colágeno e protocolos de firmeza para uma pele densa, elástica e uniforme — o acabamento que distingue o resultado.",
  },
  {
    number: "04",
    icon: Target,
    title: "Projeção",
    tagline: "Impacto estratégico",
    text: "A silhueta que veste bem, sustenta o movimento e comunica presença — sem artificialidade, sem exagero, com naturalidade.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Avaliação",
    text: "Diagnóstico métrico e anatômico individual",
  },
  {
    step: "02",
    title: "Planejamento",
    text: "Desenho estratégico do protocolo",
  },
  {
    step: "03",
    title: "Execução",
    text: "Bioestimulação com precisão clínica",
  },
  {
    step: "04",
    title: "Acompanhamento",
    text: "Evolução medida, ajustes contínuos",
  },
];

function Strategy() {
  return (
    <section id="estrategia" className="scroll-mt-24 bg-beige py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>A estratégia</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-brown sm:text-5xl">
              Engenharia biológica aplicada à sua silhueta.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-brown/60 sm:text-lg">
              O glúteo não é um músculo isolado — é uma peça estrutural do seu
              corpo. Cada decisão é calculada para sustentar proporção, firmeza
              e projeção no longo prazo.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.number} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-brown/10 bg-cream p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_24px_60px_-30px_rgb(201_169_97_/_0.5)] sm:p-10">
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-terracotta/40 bg-peach text-terracotta transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-brown-deep">
                    <pillar.icon className="size-5" />
                  </div>
                  <span className="text-sm font-semibold tracking-widest text-brown/30">
                    {pillar.number}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-brown sm:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-strong">
                  {pillar.tagline}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-brown/60">
                  {pillar.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-brown/10 bg-brown/10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((item) => (
              <div
                key={item.step}
                className="bg-cream p-7 transition-colors duration-300 hover:bg-beige"
              >
                <span className="text-xs font-semibold tracking-[0.25em] text-gold-strong">
                  {item.step}
                </span>
                <h4 className="mt-3 text-base font-semibold tracking-tight text-brown">
                  {item.title}
                </h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-brown/55">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Serviços                                                           */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    icon: Gem,
    badge: "Protocolo assinatura",
    title: "Harmonização Glútea Premium",
    text: "O protocolo completo: do diagnóstico métrico ao desenho final da silhueta.",
    features: [
      "Avaliação anatômica e métrica individual",
      "Plano estratégico de bioestimulação",
      "Acompanhamento de evolução fotográfica",
    ],
    featured: true,
  },
  {
    icon: Droplets,
    title: "Bioestimuladores de Colágeno",
    text: "Firmeza e qualidade de pele de dentro para fora.",
    features: [
      "Estímulo de colágeno e elastina",
      "Densidade, textura e sustentação",
      "Complemento de qualquer protocolo",
    ],
    featured: false,
  },
  {
    icon: Activity,
    title: "Definição Corporal Estratégica",
    text: "Biomedicina e performance trabalhando no mesmo desenho.",
    features: [
      "Análise corporal integrada",
      "Protocolos alinhados ao treino",
      "Estratégia metabólica orientada",
    ],
    featured: false,
  },
];

function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-cream py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Serviços</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-brown sm:text-5xl">
                Protocolos com método, não promessas.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-[15px] leading-relaxed text-brown/60 sm:text-right">
              Cada protocolo nasce de uma avaliação individual — e só então é
              desenhado para o seu corpo.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-1 sm:p-9",
                  service.featured
                    ? "border-gold/60 bg-gradient-to-b from-peach/80 to-beige shadow-[0_24px_60px_-30px_rgb(201_169_97_/_0.5)]"
                    : "border-brown/10 bg-beige hover:border-gold/50 hover:shadow-[0_24px_60px_-30px_rgb(107_83_68_/_0.3)]",
                )}
              >
                {service.badge && (
                  <span className="absolute right-7 top-7 rounded-full border border-gold/60 bg-gold-soft/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-strong">
                    {service.badge}
                  </span>
                )}
                <div className="flex size-12 items-center justify-center rounded-xl bg-brown-deep text-gold">
                  <service.icon className="size-5" />
                </div>
                <h3 className="mt-7 text-xl font-semibold leading-snug tracking-tight text-brown sm:text-[22px]">
                  {service.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-brown/60">
                  {service.text}
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-brown/10 pt-6">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-brown/80"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-terracotta" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brown transition-colors hover:text-gold-strong"
                >
                  Conversar no WhatsApp
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Resultados — Prova Social                                          */
/* ------------------------------------------------------------------ */

const RESULTADOS_IMAGENS: {
  src: string;
  fase?: "Antes" | "Depois";
  titulo: string;
  legenda: string;
}[] = [
  {
    src: "/resultados/facial_antes.png",
    fase: "Antes",
    titulo: "Skinbooster · qualidade de pele",
    legenda: "Ponto de partida — textura e viço iniciais",
  },
  {
    src: "/resultados/facial_depois.png",
    fase: "Depois",
    titulo: "Skinbooster · qualidade de pele",
    legenda: "Pele uniforme e luminosa — protocolo facial",
  },
  {
    src: "/resultados/lipo_antes.png",
    fase: "Antes",
    titulo: "Lipo enzimática",
    legenda: "Antes do procedimento",
  },
  {
    src: "/resultados/lipo_depois.png",
    fase: "Depois",
    titulo: "Lipo enzimática",
    legenda: "Redução de gordura localizada sem cirurgia",
  },
  {
    src: "/resultados/gluteo_antes.png",
    fase: "Antes",
    titulo: "Harmonização glútea",
    legenda: "Antes do procedimento",
  },
  {
    src: "/resultados/gluteo_depois.png",
    fase: "Depois",
    titulo: "Harmonização glútea",
    legenda: "Projeção e sustentação — resultado natural",
  },
  {
    src: "/resultados/depoimento1_antes.jpeg",
    fase: "Antes",
    titulo: "Harmonização labial",
    legenda: "Antes do procedimento — registro inicial",
  },
  {
    src: "/resultados/depoimento1_depois.jpeg",
    fase: "Depois",
    titulo: "Harmonização labial",
    legenda: "Volume e contorno natural — resultado final",
  },
  {
    src: "/resultados/depoimento2_gluteos.jpeg",
    titulo: "Harmonização glútea · depoimento real",
    legenda: "Projeção e sustentação — transformação acompanhada",
  },
  {
    src: "/resultados/depoimento3_lipo.jpeg",
    titulo: "Lipo enzimática · depoimento real",
    legenda: "Redução de gordura localizada sem cirurgia",
  },
  {
    src: "/resultados/depoimento4.jpeg",
    titulo: "Resultado real",
    legenda: "Transformação acompanhada pelo Dr. Higor",
  },
];

/**
 * Carrossel de resultados — uma foto por vez, com badge Antes/Depois,
 * setas sobrepostas, indicadores e rotação automática. Fotos que ainda
 * não existem em public/ (ex.: labial_depois.png) são detectadas e ficam
 * de fora do carrossel até serem adicionadas.
 */
function ResultadosCarrossel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState<typeof RESULTADOS_IMAGENS | null>(null);
  const reduceMotion = useReducedMotion();

  // Descobre quais fotos existem de verdade (ex.: labial_depois.png pode
  // ainda não ter sido enviado) para não exibir imagem quebrada.
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      RESULTADOS_IMAGENS.map(
        (item) =>
          new Promise<boolean>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = item.src;
          }),
      ),
    ).then((available) => {
      if (cancelled) return;
      setSlides(RESULTADOS_IMAGENS.filter((_, index) => available[index]));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const total = slides?.length ?? 0;

  // Auto-rotação a cada 5 segundos
  useEffect(() => {
    if (isPaused || reduceMotion || total === 0) return;
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, reduceMotion, total]);

  // Mantém o índice válido se a lista de fotos encolher
  useEffect(() => {
    if (total > 0 && activeSlide >= total) setActiveSlide(0);
  }, [activeSlide, total]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? total - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % total);
  };

  if (!slides) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-brown/10 bg-beige">
        <Loader2 className="size-6 animate-spin text-brown/40" />
      </div>
    );
  }

  if (slides.length === 0) return null;

  const currentSlide = slides[activeSlide];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Moldura do carrossel */}
      <div className="relative overflow-hidden rounded-[1.5rem] border border-brown/10 bg-beige">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.src}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -90 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full items-center justify-center bg-beige"
            aria-live="polite"
          >
            <img
              src={currentSlide.src}
              alt={
                currentSlide.fase
                  ? `${currentSlide.fase} - ${currentSlide.titulo}`
                  : currentSlide.titulo
              }
              loading="lazy"
              className="max-h-[72vh] w-auto max-w-full object-contain"
            />

            {/* Badge Antes/Depois (apenas quando a fase é conhecida) */}
            {currentSlide.fase && (
              <span
                className={cn(
                  "absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]",
                  currentSlide.fase === "Depois"
                    ? "bg-gold text-brown-deep"
                    : "border border-terracotta/30 bg-peach/95 text-terracotta",
                )}
              >
                {currentSlide.fase}
              </span>
            )}

            {/* Título e legenda sobre gradiente */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown-deep/95 via-brown-deep/45 to-transparent px-6 pb-6 pt-20">
              <h4 className="text-lg font-semibold tracking-tight text-cream">
                {currentSlide.titulo}
              </h4>
              <p className="mt-1 text-sm text-cream/75">{currentSlide.legenda}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Setas sobrepostas */}
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-brown/15 bg-cream/90 text-brown backdrop-blur-md transition-all hover:border-gold hover:bg-gold hover:text-brown-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Próxima foto"
          className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-brown/15 bg-cream/90 text-brown backdrop-blur-md transition-all hover:border-gold hover:bg-gold hover:text-brown-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Indicadores + contador */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={
                slide.fase
                  ? `Ir para foto ${index + 1}: ${slide.fase} ${slide.titulo}`
                  : `Ir para foto ${index + 1}: ${slide.titulo}`
              }
              aria-current={activeSlide === index ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                activeSlide === index
                  ? "w-8 bg-gold"
                  : "w-2 bg-brown/20 hover:bg-brown/40"
              )}
            />
          ))}
        </div>
        <span className="text-xs font-medium tabular-nums text-brown/45">
          {activeSlide + 1} / {slides.length}
        </span>
      </div>

      {/* Aviso de autorização */}
      <p className="mt-8 text-center text-xs leading-relaxed text-brown/40">
        Fotos de pacientes reais, divulgadas com autorização expressa.
        Resultados individuais podem variar.
      </p>
    </div>
  );
}

function Testimonials() {
  return (
    <section
      id="resultados"
      className="relative scroll-mt-24 overflow-hidden bg-sand py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0" style={lightGrid} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(640px 420px at 85% 8%, rgb(201 169 97 / 0.25), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Prova social</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-brown sm:text-5xl">
                Resultados que falam por si.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-brown/60">
                Protocolos conduzidos com ética, técnica e naturalidade —
                transformações reais, do diagnóstico à evolução.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-strong transition-colors hover:text-brown"
            >
              <Instagram className="size-4" />
              @dr.higorazevedo
              <ArrowRight className="size-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-strong">
              Destaques de transformação
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-brown/55">
              A evolução é progressiva e mensurável — fotografias e registros
              em cada etapa do protocolo.
            </p>
            <div className="mt-8">
              <ResultadosCarrossel />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sobre o Dr. Higor                                                  */
/* ------------------------------------------------------------------ */

// Nomes/extensões comuns que o retrato tenta detectar em public/ —
// basta o usuário enviar a foto com um destes nomes que ela aparece.
const PHOTO_CANDIDATES = [
  "/dr-higor.jpg",
  "/dr-higor.jpeg",
  "/dr-higor.png",
  "/dr-higor.webp",
  "/higor.jpg",
  "/higor.png",
  "/foto-dr-higor.jpg",
  "/dr-higor-azevedo.jpg",
  // Foto hospedada pelo cliente — usada enquanto não houver arquivo local
  "https://jolly-red-ihugzofi.edgeone.dev/file.png",
];

function AboutPortrait() {
  // Tenta carregar a foto em public/ (vários nomes). Sem arquivo,
  // exibe o monograma HA como fallback elegante.
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let index = 0;
    const tryNext = () => {
      if (cancelled || index >= PHOTO_CANDIDATES.length) return;
      const src = PHOTO_CANDIDATES[index];
      index += 1;
      const img = new Image();
      img.onload = () => {
        if (!cancelled) setPhotoSrc(src);
      };
      img.onerror = () => tryNext();
      img.src = src;
    };
    tryNext();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Parallax
      distance={24}
      className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-brown-deep lg:max-w-none"
    >
      {/* Fallback: monograma e credenciais */}
      <div className="pointer-events-none absolute inset-0" style={darkGrid} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(380px 320px at 70% 16%, rgb(201 169 97 / 0.2), transparent 60%)",
        }}
      />
      <svg
        viewBox="0 0 400 500"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {[70, 110, 150, 190].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="250"
            r={r}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        ))}
        <circle
          cx="200"
          cy="250"
          r="150"
          stroke="var(--gold)"
          strokeOpacity="0.6"
          strokeWidth="1"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        <path
          d="M 60 320 C 140 240, 240 360, 340 190"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray="2 7"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-end p-9">
        <span className="text-6xl font-semibold leading-none tracking-tight text-cream">
          HA
        </span>
        <div className="mt-5 h-px w-14 bg-gold" aria-hidden />
        <p className="mt-5 text-sm font-medium text-cream">Dr. Higor Azevedo</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-cream/50">
          Biomédico Esteta · Educador Físico
        </p>
        <p className="mt-5 text-xs text-cream/40">CRBM 07986 · CREF 27639</p>
      </div>

      {/* Foto do Dr. Higor — exibida quando o arquivo existe em public/ */}
      {photoSrc && (
        <img
          src={photoSrc}
          alt="Dr. Higor Azevedo — Biomédico Esteta"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      )}

      {/* Scrim + credenciais sobre a foto */}
      {photoSrc && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown-deep/95 via-brown-deep/45 to-transparent px-9 pb-9 pt-28">
          <div className="h-px w-14 bg-gold" aria-hidden />
          <p className="mt-4 text-sm font-medium text-cream">
            Dr. Higor Azevedo
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-cream/60">
            Biomédico Esteta · Educador Físico
          </p>
          <p className="mt-4 text-xs text-cream/60">CRBM 07986 · CREF 27639</p>
        </div>
      )}
    </Parallax>
  );
}

function About() {
  return (
    <section id="sobre" className="scroll-mt-24 bg-cream py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal direction="left">
            <AboutPortrait />
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>Sobre o especialista</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-brown sm:text-5xl">
                Estratégia é{" "}
                <span className="text-gold-gradient">formação.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 text-base leading-relaxed text-brown/60 sm:text-lg">
                Dr. Higor Azevedo reúne duas expertises raras: é Biomédico
                Esteta e Educador Físico. A biomedicina garante precisão técnica
                e segurança clínica; a educação física adiciona compreensão
                profunda de movimento, musculatura e performance. O resultado é
                uma visão que trata o corpo como um sistema — não como um ponto
                isolado.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Biomedicina Estética",
                  reg: "CRBM 07986",
                  text: "Precisão clínica, segurança e tecnologia no protocolo.",
                },
                {
                  title: "Educação Física",
                  reg: "CREF 27639",
                  text: "Anatomia do movimento e performance aplicadas ao desenho.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={0.25 + i * 0.08}>
                  <div className="h-full rounded-2xl border border-brown/10 bg-beige p-6 transition-colors duration-300 hover:border-gold/50">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-strong">
                      {item.reg}
                    </p>
                    <h3 className="mt-2.5 text-base font-semibold tracking-tight text-brown">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-brown/60">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <figure className="mt-10 border-l-2 border-gold pl-6">
                <Quote className="size-5 text-gold" aria-hidden />
                <blockquote className="mt-3 text-lg font-medium leading-relaxed tracking-tight text-brown sm:text-xl">
                  Meu trabalho não é acrescentar volume. É refinar a arquitetura
                  que você já tem.
                </blockquote>
                <figcaption className="mt-3 text-sm text-brown/55">
                  Dr. Higor Azevedo
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contato — CTA + Localização                                        */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden bg-cream py-24 sm:py-32"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-8">
        {/* Banda CTA — painel em Deep Brown para contraste */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brown-deep px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0"
              style={darkGrid}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(560px 360px at 50% 0%, rgb(201 169 97 / 0.22), transparent 62%)",
              }}
            />
            <div className="relative mx-auto max-w-3xl">
              <Eyebrow className="justify-center" labelClassName="text-gold">
                Próximo passo
              </Eyebrow>
              <h2 className="mt-7 text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-5xl">
                A anatomia do resultado é{" "}
                <span className="text-gold">individual.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/60 sm:text-lg">
                Agende sua avaliação estratégica e descubra o desenho que faz
                sentido para o seu corpo — com método, técnica e naturalidade.
              </p>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  asChild
                  size="lg"
                  className="h-13 rounded-full bg-taupe px-7 text-[15px] text-brown-deep shadow-[0_8px_30px_-8px_rgb(212_165_116_/_0.7)] transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-brown-deep"
                >
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="size-4" />
                    Agendar pelo WhatsApp
                  </a>
                </Button>
                <p className="text-xs text-cream/50">
                  Resposta em até 24h úteis
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-brown/10 bg-beige p-8 sm:p-10">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-strong">
                Localização & horários
              </h3>
              <div className="mt-8 flex-1 space-y-7">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-terracotta/30 bg-peach text-terracotta">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brown">
                      Clínica em Icaraí
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-brown/55">
                      Rua Miguel de Frias, 150 — Icaraí, Niterói/RJ
                    </p>
                    <p className="mt-0.5 text-xs text-brown/45">
                      CEP 24220-003
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-terracotta/30 bg-peach text-terracotta">
                    <Clock className="size-5" />
                  </span>
                  <div className="w-full">
                    <p className="text-sm font-semibold text-brown">
                      Horário de atendimento
                    </p>
                    <div className="mt-2 flex w-full max-w-xs items-center justify-between gap-6 text-sm text-brown/55">
                      <span>Segunda — Sexta</span>
                      <span className="text-brown/85">09h — 19h</span>
                    </div>
                    <div className="mt-1.5 flex w-full max-w-xs items-center justify-between gap-6 text-sm text-brown/55">
                      <span>Sábado · Domingo</span>
                      <span className="text-brown/45">Fechado</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-terracotta/30 bg-peach text-terracotta">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brown">WhatsApp</p>
                    <p className="mt-1 text-sm text-brown/55">
                      +55 21 99808-4105
                    </p>
                  </div>
                </div>
              </div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-gold/10 px-6 py-3.5 text-sm font-semibold text-gold-strong transition-all duration-300 hover:bg-gold hover:text-brown-deep"
              >
                <WhatsAppIcon className="size-4" />
                Falar com a equipe
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} direction="right">
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl border border-sand bg-sand p-8 sm:p-10"
              style={lightGrid}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(320px 240px at 22% 24%, rgb(201 169 97 / 0.25), transparent 60%)",
                }}
              />
              <svg
                viewBox="0 0 200 200"
                fill="none"
                className="absolute left-8 top-8 h-40 w-40 opacity-70"
              >
                {[30, 50, 70, 90].map((r) => (
                  <circle
                    key={r}
                    cx="100"
                    cy="100"
                    r={r}
                    stroke="rgb(107 83 68 / 0.14)"
                    strokeWidth="1"
                  />
                ))}
                <path
                  d="M 100 70 C 122 82, 122 118, 100 130 C 78 118, 78 82, 100 70 Z"
                  stroke="var(--gold)"
                  strokeWidth="1.5"
                />
                <circle cx="100" cy="100" r="4" fill="var(--gold)" />
              </svg>
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-strong">
                  Icaraí · Niterói · RJ
                </p>
                <h4 className="mt-3 max-w-sm text-2xl font-semibold leading-tight tracking-tight text-brown">
                  A dois passos da praia, no coração de Icaraí.
                </h4>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brown transition-colors group-hover:text-gold-strong">
                  Ver no Google Maps
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-brown-deep text-cream">
      <Reveal className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              Dr. Higor Azevedo
              <span className="ml-2 align-middle text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
                Harmonização Glútea
              </span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
              Harmonização glútea de alta performance em Icaraí, Niterói — com
              método, técnica e resultados naturais.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all hover:border-gold hover:text-gold"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all hover:border-gold hover:text-gold"
              >
                <WhatsAppIcon className="size-4" />
              </a>
              <a
                href={`mailto:contato@drhigorazevedo.com.br`}
                aria-label="E-mail"
                className="flex size-10 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all hover:border-gold hover:text-gold"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Navegação
            </p>
            <ul className="mt-5 space-y-3 text-sm text-cream/60">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/dashboard"
                  className="transition-colors hover:text-gold"
                >
                  Área do paciente
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Atendimento
            </p>
            <ul className="mt-5 space-y-4 text-sm text-cream/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                Atendimento presencial e online
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
                Segunda a Sexta · 09h–19h
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                +55 21 99808-4105
              </li>
              <li className="flex items-start gap-3">
                <Award className="mt-0.5 size-4 shrink-0 text-gold" />
                CRBM 07986 · CREF 27639
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/10 pt-8">
          <p className="text-xs leading-relaxed text-cream/40">
            Este site tem caráter informativo e não substitui avaliação
            presencial. Resultados variam de pessoa para pessoa e dependem de
            protocolo individualizado. Todas as condutas são realizadas por
            profissional habilitado — CRBM 07986 · CREF 27639.
          </p>
          <div className="mt-5 flex flex-col justify-between gap-3 text-xs text-cream/40 sm:flex-row sm:items-center">
            <p>© 2026 Dr. Higor Azevedo. Todos os direitos reservados.</p>
            <p className="flex items-center gap-2">
              Desenvolvido com foco em estratégia
              <span className="size-1 rounded-full bg-gold" aria-hidden />
              naturalidade
              <span className="size-1 rounded-full bg-gold" aria-hidden />
              performance
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  WhatsApp flutuante                                                 */
/* ------------------------------------------------------------------ */

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar avaliação pelo WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-taupe py-3.5 pl-4 pr-4 text-brown-deep shadow-[0_12px_40px_-10px_rgb(212_165_116_/_0.8)] transition-all duration-300 hover:-translate-y-1 hover:bg-gold hover:text-brown-deep sm:pr-5"
    >
      <span
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-taupe/40"
        aria-hidden
      />
      <WhatsAppIcon className="size-5" />
      <span className="hidden text-sm font-semibold sm:inline">
        Agendar avaliação
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Página                                                             */
/* ------------------------------------------------------------------ */

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background font-sans text-foreground antialiased"
    >
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Marquee />
        <Strategy />
        <Services />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </motion.div>
  );
}
