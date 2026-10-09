import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Asterisk,
  Plus,
  Menu,
  X,
  MoveUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationDialog, ProjectDialog } from "@/components/studio-dialogs";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { projects, bedroom, dining, kitchen } from "@/lib/projects";
import kitchenFeature from "../../image1.jpg";
import bedroomFeature from "../../image2.png";
import mainVideo from "../../main-video.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elysian Design Studio — Spaces with soul" },
      {
        name: "description",
        content:
          "Explore Elysian Design Studio’s thoughtfully crafted residential interiors, bespoke furniture and distinctive spaces for modern living.",
      },
      { property: "og:title", content: "Elysian Design Studio — Spaces with soul" },
      {
        property: "og:description",
        content:
          "Considered interiors. Personal spaces. Discover the world of Elysian Design Studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
const navigation = ["Projects", "Philosophy", "Services", "Journal"];
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [consultation, setConsultation] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [allProjects, setAllProjects] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const philosophyRef = useRef<HTMLElement>(null);
  const philosophyStickyRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  useScrollReveal([allProjects]);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;
    const moveCursor = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      cursor.classList.add("is-visible");
    };
    const hideCursor = () => cursor.classList.remove("is-visible");

    window.addEventListener("pointermove", moveCursor);
    document.documentElement.addEventListener("pointerleave", hideCursor);
    return () => {
      window.removeEventListener("pointermove", moveCursor);
      document.documentElement.removeEventListener("pointerleave", hideCursor);
    };
  }, []);
  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const section = philosophyRef.current;
      const sticky = philosophyStickyRef.current;
      if (!section || !sticky) return;

      const headerHeight =
        document.querySelector(".studio-header")?.getBoundingClientRect().height ?? 100;
      const headerGap = 16;
      const stickyTop = headerHeight + headerGap;
      const stageHeight = sticky.getBoundingClientRect().height;
      const travel = section.offsetHeight - stageHeight;
      const progress =
        travel > 0
          ? Math.min(1, Math.max(0, (stickyTop - section.getBoundingClientRect().top) / travel))
          : 1;
      const viewportWidth = window.innerWidth;
      const compact = viewportWidth <= 1100;
      const inset = compact ? 30 : Math.max(48, (viewportWidth - 1536) / 2 + 48);
      const openingInset = compact ? 20 : Math.max(30, Math.min(48, viewportWidth * 0.03125));
      const finalWidth = Math.min(viewportWidth * (compact ? 0.43 : 0.44), 620);
      const set = (name: string, value: string) => sticky.style.setProperty(name, value);

      set("--philosophy-frame-left", `${openingInset + (inset - openingInset) * progress}px`);
      set("--philosophy-frame-top", `${stageHeight * 0.1 * progress}px`);
      set(
        "--philosophy-frame-width",
        `${viewportWidth - openingInset * 2 + (finalWidth - (viewportWidth - openingInset * 2)) * progress}px`,
      );
      set("--philosophy-frame-height", `${stageHeight * (1 - 0.24 * progress)}px`);
      set("--philosophy-frame-radius", "18px");
      set("--philosophy-shade-opacity", `${0.5 * (1 - progress)}`);
      set("--philosophy-intro-opacity", `${Math.max(0, 1 - progress * 1.8)}`);
      set("--philosophy-intro-scale", `${1 - progress * 0.1}`);
      set("--philosophy-copy-opacity", `${Math.min(1, Math.max(0, (progress - 0.28) * 1.4))}`);
      set("--philosophy-copy-y", `${(1 - progress) * 28}px`);
      set("--philosophy-shadow-opacity", `${Math.round(progress * 17)}%`);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <div ref={cursorRef} className="negative-cursor" aria-hidden="true" />
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="page-width studio-header grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-5">
          <a href="#" aria-label="Elysian Design Studio home" className="wordmark w-fit">
            elysian<span className="text-primary">.</span>
            <small>Design Studio</small>
          </a>
          <nav aria-label="Main navigation" className="hidden md:flex gap-8">
            {navigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex justify-end items-center gap-3">
            <Button
              className="rounded-full h-11 px-5 text-[11px] shadow-none hidden sm:flex"
              onClick={() => setConsultation(true)}
            >
              Book a consultation <ArrowUpRight />
            </Button>
            <Button
              className="md:hidden"
              variant="ghost"
              size="icon"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="md:hidden px-6 pb-6 flex flex-col gap-4">
            {navigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm"
              >
                {item}
              </a>
            ))}
            <Button
              onClick={() => {
                setMenuOpen(false);
                setConsultation(true);
              }}
              className="rounded-full w-fit"
            >
              Book a consultation <ArrowUpRight />
            </Button>
          </nav>
        )}
      </header>
      <main>
        <section className="page-width hero-grid" aria-label="Elysian Design Studio">
          <div className="hero-left">
            <div className="eyebrow flex items-center gap-2 text-primary">
              <span className="size-1.5 rounded-full bg-primary" /> Spaces with soul. Design with
              purpose.
            </div>
            <h1 className="hero-title">
              <span>CRAFTING</span>
              <span>SANCTUARIES</span>
              <span>FOR MODERN</span>
              <span className="last-line">
                LIVING
                <Asterisk aria-hidden="true" />
              </span>
            </h1>
            <div className="hero-left-bottom">
              <div>
                <Button
                  variant="ghost"
                  className="hero-media p-0 block h-auto"
                  aria-label="Explore the Elysian kitchen project"
                  onClick={() => setSelected(3)}
                >
                  <img
                    src={kitchen.url}
                    alt="Elysian kitchen with muted green cabinets and warm lighting"
                  />
                  <span className="absolute bottom-3 left-3 size-8 rounded-full bg-background flex items-center justify-center">
                    <ArrowUpRight className="size-4" />
                  </span>
                  <span className="absolute bottom-4 right-3 text-[9px] text-on-image">
                    A CLOSER LOOK
                  </span>
                </Button>
                <div className="hidden md:flex items-center gap-2 mt-3 text-[9px] uppercase">
                  <span className="w-5 border-t border-foreground" /> Inside the Elysian world
                </div>
              </div>
              <p className="text-xs leading-[1.9] text-muted-foreground max-w-[260px] md:mt-7">
                Exploring spatial design, bespoke furniture, and thoughtfully crafted interiors for
                the modern era.
              </p>
            </div>
          </div>
          <div className="hero-photo">
            <img
              src={bedroom.url}
              alt="Elysian bedroom with a sculptural upholstered bed, timber panels and pendant lights"
              fetchPriority="high"
            />
            <div className="absolute z-10 top-5 left-5 rounded-full bg-background/90 backdrop-blur-sm px-3 py-2 eyebrow">
              The art of feeling at home
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-10 text-on-image grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
              <div>
                <span className="text-[9px] uppercase">Elysian / Residential</span>
                <p className="font-display text-2xl mt-2">A softer kind of luxury.</p>
              </div>
              <Button
                variant="ghost"
                className="rounded-full size-10 border border-on-image/50 text-on-image hover:bg-background hover:text-foreground"
                size="icon"
                aria-label="View bedroom project"
                onClick={() => setSelected(0)}
              >
                <ArrowUpRight />
              </Button>
            </div>
          </div>
          <aside className="hero-right">
            <div>
              <Button
                variant="ghost"
                className="feature-photo p-0 block h-auto w-full"
                aria-label="View dining room project"
                onClick={() => setSelected(1)}
              >
                <img
                  src={dining.url}
                  alt="Blue velvet dining chairs and a bespoke statement chandelier"
                />
              </Button>
              <div className="flex justify-between mt-3 pb-4 border-b border-border items-center gap-2">
                <span className="eyebrow">Details make the difference.</span>
                <ArrowUpRight className="size-3 shrink-0" />
              </div>
            </div>
            <div className="hero-right-copy py-6">
              <Asterisk className="size-9 text-primary mb-5" strokeWidth={1} />
              <h2 className="text-[11px] font-semibold uppercase mb-4">
                Considered. Personal.
                <br />
                Unmistakably you.
              </h2>
              <p className="text-xs leading-[1.9] text-muted-foreground">
                An inspiration for human-centric living. Natural materials, aesthetic flow, and a
                little everyday extraordinary.
              </p>
            </div>
            <div className="hero-right-cta">
              <Button
                asChild
                className="w-full rounded-full h-12 shadow-none text-[10px] justify-between px-5"
              >
                <a href="#projects">
                  EXPLORE PROJECTS <ArrowUpRight />
                </a>
              </Button>
              <div className="flex items-center justify-between mt-5 gap-2">
                <span className="text-[9px] text-muted-foreground uppercase">
                  Good spaces. Better living.
                </span>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-full shrink-0"
                >
                  <a href="#projects" aria-label="Scroll to selected projects">
                    <ArrowDown className="size-3" />
                  </a>
                </Button>
              </div>
            </div>
          </aside>
        </section>
        <div
          className="marquee"
          aria-label="Residential architecture, high-end interiors, furnishing, spatial design"
          data-reveal
        >
          <div className="marquee-track" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                RESIDENTIAL ARCHITECTURE <b>✳</b> HIGH-END INTERIORS <b>✳</b> FURNISHING <b>✳</b>{" "}
                SPATIAL DESIGN <b>✳</b>
              </span>
            ))}
          </div>
        </div>
        <section id="projects" className="page-width section-space">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5" data-reveal>
            <div>
              <h2 className="section-title">
                A FEW SPACES.
                <br />
                ENDLESS POSSIBILITIES.
              </h2>
            </div>
            <Button
              variant="link"
              className="p-0 text-[10px] uppercase hidden sm:flex"
              onClick={() => setAllProjects(!allProjects)}
            >
              {allProjects ? "Selected projects" : "View all projects"}
              <ArrowUpRight />
            </Button>
          </div>
          <div className="project-grid">
            {projects.slice(0, allProjects ? 5 : 3).map((project, i) => (
              <article
                key={project.title}
                className="project-item"
                data-reveal
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <Button
                  variant="ghost"
                  className="project-image p-0 h-auto block"
                  aria-label={`View ${project.title}`}
                  onClick={() => setSelected(i)}
                >
                  <img src={project.image} alt={project.title} loading="lazy" />
                </Button>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center mt-4">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase mb-1.5">
                      {project.category}
                    </p>
                    <h3 className="font-display text-xl">{project.title}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label={`Open ${project.title}`}
                    onClick={() => setSelected(i)}
                  >
                    <ArrowUpRight />
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <Button
            variant="outline"
            className="sm:hidden rounded-full mt-7"
            onClick={() => setAllProjects(!allProjects)}
          >
            {allProjects ? "Show selected projects" : "View all projects"}
            <ArrowUpRight />
          </Button>
        </section>
        <section
          id="philosophy"
          ref={philosophyRef}
          className="video-philosophy"
          aria-label="Elysian design philosophy"
        >
          <div ref={philosophyStickyRef} className="video-philosophy-sticky">
            <div className="video-philosophy-frame">
              <video
                className="video-philosophy-media"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Elysian interior details"
              >
                <source src={mainVideo} type="video/mp4" />
              </video>
              <div className="video-philosophy-shade" aria-hidden="true" />
              <p className="video-philosophy-intro">
                CRAFTING SANCTUARIES
                <br />
                FOR MODERN LIVING
              </p>
            </div>
            <div className="video-philosophy-copy">
              <h2 className="section-title">
                NOT JUST A SPACE.
                <br />A WAY TO FEEL.
              </h2>
              <p>
                We believe the most beautiful spaces are the ones that feel like you. The quiet
                corner. The gathering place. The details you notice, and the ones you simply feel.
              </p>
              <p>
                At Elysian, we bring intention to every material, proportion, and possibility.
                Creating interiors that balance a distinctive point of view with the way you
                actually live.
              </p>
              <div className="video-philosophy-detail">
                <Asterisk className="text-primary size-9" strokeWidth={1} />
                <span>
                  Thoughtfully made.
                  <br />
                  <em>Beautifully lived in.</em>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="page-width section-space">
          <div data-reveal>
            <h2 className="section-title mb-8">
              FROM FIRST THOUGHT
              <br />
              TO FINAL DETAIL.
            </h2>
          </div>
          {[
            {
              name: "Residential interiors",
              desc: "Personal spaces shaped around the rhythm of your life.",
            },
            {
              name: "Commercial spaces",
              desc: "Distinctive environments that bring your brand to life.",
            },
            {
              name: "Bespoke furniture",
              desc: "Considered pieces. Individual character. Made for your space.",
            },
            {
              name: "Spatial design",
              desc: "A holistic approach to flow, form and everyday functionality.",
            },
          ].map((service, i) => (
            <div
              className="service-row"
              key={service.name}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="font-display text-2xl">{service.name}</h3>
              <p className="text-xs leading-6 text-muted-foreground">{service.desc}</p>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Enquire about ${service.name}`}
                onClick={() => setConsultation(true)}
              >
                <Plus />
              </Button>
            </div>
          ))}
        </section>
        <section id="journal" className="journal-showcase" aria-label="Featured Elysian interiors">
          <a href="#projects" className="journal-card" data-reveal>
            <img
              src={kitchenFeature}
              alt="Warmly lit Elysian kitchen with soft green cabinetry"
              loading="lazy"
            />
            <span className="journal-card-content">
              <strong>
                EVERYDAY
                <br />
                ELEVATED.
              </strong>
              <span>A kitchen made for beautiful rituals</span>
              <em>Explore the project</em>
            </span>
          </a>
          <a
            href="#projects"
            className="journal-card journal-card--tinted"
            data-reveal
            style={{ transitionDelay: "120ms" }}
          >
            <img
              src={bedroomFeature}
              alt="Layered Elysian bedroom with sculptural artwork and ambient lighting"
              loading="lazy"
            />
            <span className="journal-card-content">
              <strong>
                A QUIET
                <br />
                RETREAT.
              </strong>
              <span>Layered in texture, designed for rest</span>
              <em>Explore the project</em>
            </span>
          </a>
        </section>
      </main>
      <footer className="bg-primary text-primary-foreground">
        <div className="page-width pt-16 pb-7" data-reveal>
          <p className="eyebrow mb-6 text-primary-foreground/70">Your next chapter starts here</p>
          <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 items-end">
            <h2 className="footer-title">
              LET’S MAKE
              <br />
              ROOM FOR YOU<span className="text-primary-foreground/50">.</span>
            </h2>
            <div>
              <Button
                variant="secondary"
                className="rounded-full h-12 px-6 shadow-none mb-9"
                onClick={() => setConsultation(true)}
              >
                Start a conversation <MoveUpRight />
              </Button>
              <p className="text-xs mb-3">A little Elysian in your inbox.</p>
              <form
                className="border-b border-primary-foreground/50 flex gap-4 pb-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletter(true);
                }}
              >
                <input
                  aria-label="Newsletter email address"
                  type="email"
                  placeholder="Your email address"
                  required
                  className="bg-transparent min-w-0 flex-1 text-xs outline-none placeholder:text-primary-foreground/60"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  type="submit"
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  aria-label="Join newsletter"
                >
                  <ArrowRight />
                </Button>
              </form>
              {newsletter && (
                <p role="status" className="text-xs mt-3">
                  The journal newsletter is coming soon. Sign-ups are not open yet.
                </p>
              )}
            </div>
          </div>
          <div className="mt-14 pt-6 border-t border-primary-foreground/25 grid sm:grid-cols-[1fr_auto] gap-6 items-center">
            <a href="#" className="wordmark w-fit">
              elysian.<small>Design Studio</small>
            </a>
            <div className="flex gap-6 text-[10px]">
              <a href="#projects" className="hover:underline">
                Our work ↗
              </a>
              <a href="#philosophy" className="hover:underline">
                Our studio ↗
              </a>
              <Button
                variant="link"
                onClick={() => setConsultation(true)}
                className="h-auto p-0 text-primary-foreground text-[10px]"
              >
                Get in touch ↗
              </Button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-between gap-3 text-[9px] text-primary-foreground/60">
            <span>© 2026 Elysian Design Studio</span>
            <span>Considered interiors. Extraordinary everyday.</span>
          </div>
        </div>
      </footer>
      <ConsultationDialog open={consultation} onOpenChange={setConsultation} />
      <ProjectDialog selected={selected} onChange={setSelected} />
    </>
  );
}
