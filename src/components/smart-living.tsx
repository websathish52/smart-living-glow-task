import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Gem,
  Eye,
  Globe,
  House,
  X,
  Facebook,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sampleCopy =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const assets = {
  architecture: "/assets/architecture.jpg",
  bodyFont: "/assets/body.woff2",
  building: "/assets/building.png",
  city: "/assets/city.jpg",
  clouds: "/assets/clouds.jpg",
  cloudsVideo: "/assets/clouds.mp4",
  displayFont: "/assets/display.woff2",
  project1: "/assets/project-1.jpg",
  project2: "/assets/project-2.jpg",
  project3: "/assets/project-3.jpg",
  project4: "/assets/project-4.jpg",
  towerPoster: "/assets/tower.jpg",
  twinTower: "/assets/twin-tower.jpg",
};
const projects = [
  { image: assets.project1, title: "The Skyline", location: "Commercial architecture" },
  { image: assets.project2, title: "New Perspectives", location: "Residential development" },
  { image: assets.project3, title: "Beyond the Ordinary", location: "Cultural architecture" },
  { image: assets.project4, title: "Urban Horizons", location: "Property development" },
  { image: assets.twinTower, title: "Twin Towers", location: "Commercial architecture" },
  { image: assets.architecture, title: "City in Motion", location: "Urban architecture" },
];
const services = [
  { Icon: Gem, title: "Proin finibus quam" },
  { Icon: Eye, title: "Cras non metus lorem" },
  { Icon: House, title: "Nunc et lorem orci" },
  { Icon: Globe, title: "Proin commodo augue" },
];

function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 52" fill="none" aria-label="Smart Living">
      <path
        d="M16 2C11 9 4 17 4 26c0 8 5 13 12 13s12-5 12-13C28 17 21 9 16 2Z M16 15v35 M16 27l-6-7 M16 34l7-8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://www.facebook.com/wordpress.slider.revolution"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
      >
        FB
      </a>
      <span>/</span>
      <a
        href="https://www.instagram.com/sliderrevolution/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        IG
      </a>
      <span>/</span>
      <a
        href="https://www.youtube.com/user/ThemePunch"
        target="_blank"
        rel="noreferrer"
        aria-label="YouTube"
      >
        YT
      </a>
    </div>
  );
}

function AnimatedMenu({ onNavigate }: { onNavigate: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const images = [
    assets.twinTower,
    assets.city,
    assets.architecture,
    assets.project1,
    assets.project2,
  ];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".menu-nav a", {
        x: -55,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".menu-aside", { y: 35, opacity: 0, duration: 1, delay: 0.45 });
    }, ref);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(".menu-picture-layer", {
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 0.45,
        ease: "power3.inOut",
        overwrite: true,
      });
      gsap.to(`[data-menu-image="${active}"]`, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "power3.inOut",
        overwrite: true,
      });
      gsap.fromTo(
        `[data-menu-image="${active}"] img`,
        { scale: 1.08 },
        { scale: 1, duration: 0.75, ease: "power3.out" },
      );
    }, ref);
    return () => ctx.revert();
  }, [active]);
  return (
    <div ref={ref} className="menu-layout">
      <nav className="menu-nav" aria-label="Main navigation">
        {["Home", "About", "Services", "Projects", "Contact"].map((label, index) => (
          <a
            href={`#${label.toLowerCase()}`}
            aria-label={label}
            data-label={label}
            key={label}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(label.toLowerCase());
            }}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="menu-picture" aria-hidden="true">
        {images.map((image, index) => (
          <div
            className={`menu-picture-layer${active === index ? " is-active" : ""}`}
            data-menu-image={index}
            key={image}
          >
            <img src={image} alt="" />
          </div>
        ))}
      </div>
      <div className="menu-aside">
        <SocialLinks />
        <p>
          249 South Smoky Hollow Ave.
          <br />
          Bayonne, NJ 07002
        </p>
      </div>
    </div>
  );
}

export default function SmartLiving() {
  const root = useRef<HTMLDivElement>(null);
  const projectImage = useRef<HTMLImageElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [projectOpen, setProjectOpen] = useState(false);
  const changing = useRef(false);
  const menuPanel = useRef<HTMLDivElement>(null);
  const menuClosing = useRef(false);
  const project = projects[projectIndex];

  function closeMenu(after?: () => void) {
    if (!menuOpen) {
      after?.();
      return;
    }
    if (menuClosing.current) return;
    const panel = menuPanel.current;
    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMenuOpen(false);
      after?.();
      return;
    }
    menuClosing.current = true;
    gsap.to(panel, {
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.65,
      ease: "power3.inOut",
      onComplete: () => {
        setMenuOpen(false);
        menuClosing.current = false;
        after?.();
      },
    });
  }

  const animateMenu = useCallback((panel: HTMLDivElement | null) => {
    if (menuPanel.current) gsap.killTweensOf(menuPanel.current);
    menuPanel.current = panel;
    if (!panel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      panel,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.inOut" },
    );
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncVideos = () =>
      videoRefs.current.forEach((video) => {
        if (!video) return;
        if (media.matches) video.pause();
        else video.play().catch(() => {});
      });
    syncVideos();
    media.addEventListener("change", syncVideos);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && !media.matches) video.play().catch(() => {});
          else video.pause();
        }),
      { threshold: 0.05 },
    );
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });
    return () => {
      observer.disconnect();
      media.removeEventListener("change", syncVideos);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-building", { scale: 1.08, opacity: 0, duration: 2.2 })
        .from(".hero-eyebrow", { y: 25, opacity: 0, duration: 0.9 }, 0.4)
        .from(".hero-word", { yPercent: 110, opacity: 0, stagger: 0.07, duration: 1.6 }, 0.55)
        .from(".hero-bottom", { opacity: 0, y: 25, duration: 1 }, 1.2);
      gsap.to(".hero-building", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-title", {
        y: 100,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: "#home", start: "25% top", end: "bottom top", scrub: 1 },
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) =>
        gsap.from(element, {
          y: 65,
          opacity: 0,
          duration: 1.35,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        }),
      );
      gsap.from(".about-photo", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.6,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "#about", start: "top 75%", once: true },
      });
      gsap.from(".about-photo img", {
        scale: 1.1,
        scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.from(".project-visual", {
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "#projects", start: "top 85%", once: true },
      });
      gsap.to(".scroll-cue svg", {
        y: 7,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      ScrollTrigger.refresh();
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }, root);
    return () => ctx.revert();
  }, []);

  function goTo(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    closeMenu(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) target.scrollIntoView();
      else
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 75, autoKill: true },
          duration: 1.4,
          ease: "power3.inOut",
        });
    });
  }

  function changeProject(direction: number) {
    if (changing.current) return;
    const next = (projectIndex + direction + projects.length) % projects.length;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProjectIndex(next);
      return;
    }
    const image = projectImage.current;
    if (!image) return;
    changing.current = true;
    gsap.to(image, {
      opacity: 0,
      xPercent: direction * -8,
      duration: 0.45,
      ease: "power3.in",
      onComplete: () => {
        setProjectIndex(next);
        gsap.fromTo(
          image,
          { xPercent: direction * 8, scale: 1.08 },
          {
            opacity: 1,
            xPercent: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            onComplete: () => {
              changing.current = false;
            },
          },
        );
      },
    });
  }

  if (!project) return null;

  return (
    <div ref={root} className="smart-living">
      <style>{`@font-face{font-family:Living Display;src:url('${assets.displayFont}') format('woff2');font-display:swap;font-weight:400}@font-face{font-family:Living Sans;src:url('${assets.bodyFont}') format('woff2');font-display:swap;font-weight:100 900}`}</style>
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              goTo("home");
            }}
            aria-label="Smart Living home"
          >
            <Mark />
          </a>
          <Dialog.Root
            open={menuOpen}
            onOpenChange={(open) => {
              if (open) setMenuOpen(true);
              else closeMenu();
            }}
          >
            <Dialog.Trigger asChild>
              <Button variant="editorial" className="menu-trigger" aria-label="Open menu">
                <span>MENU</span>
                <span className="menu-symbol">
                  <i />
                  <i />
                  <i />
                </span>
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-shade" />
              <Dialog.Content ref={animateMenu} className="menu-panel">
                <Dialog.Title className="sr-only">Smart Living navigation</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Explore our story, services, and projects.
                </Dialog.Description>
                <div className="menu-top">
                  <Mark />
                  <Button variant="editorial" aria-label="Close menu" onClick={() => closeMenu()}>
                    CLOSE
                    <span className="menu-symbol">
                      <X />
                    </span>
                  </Button>
                </div>
                <AnimatedMenu onNavigate={goTo} />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <video
            ref={(video) => {
              videoRefs.current[0] = video;
            }}
            className="hero-clouds"
            src={assets.cloudsVideo}
            poster={assets.clouds}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <img
            className="hero-building"
            src={assets.building}
            alt="Curving modern residential towers seen from below"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-center">
            <p className="eyebrow hero-eyebrow">PROPERTY DEVELOPMENT</p>
            <h1 className="hero-title">
              {["Ultimate", "Smart", "Living"].map((word) => (
                <span className="word-mask" key={word}>
                  <span className="hero-word">{word}</span>
                </span>
              ))}
            </h1>
          </div>
          <div className="hero-bottom content-width">
            <p>{sampleCopy}</p>
            <Button
              variant="architectural"
              className="scroll-cue hero-scroll"
              onClick={() => goTo("about")}
              aria-label="Scroll to about"
            >
              <ArrowDown />
            </Button>
            <SocialLinks />
          </div>
        </section>

        <section id="about" className="about-section content-width">
          <div className="about-heading">
            <p className="eyebrow reveal">WHAT MAKES US DIFFERENT</p>
            <h2 className="reveal">
              Providing Unique &amp;
              <br />
              Priceless Experience
            </h2>
          </div>
          <div className="about-photo">
            <img src={assets.towerPoster} loading="lazy" alt="Golden illuminated tower at night" />
          </div>
          <div className="about-copy reveal">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna sed do eiusmod aliqua.
            </p>
            <Button
              variant="architectural"
              className="scroll-cue"
              onClick={() => goTo("services")}
              aria-label="Scroll to services"
            >
              <ArrowDown />
            </Button>
          </div>
        </section>

        <div className="light-band">
          <section id="services" className="services-section content-width">
            <div className="services-heading">
              <p className="eyebrow reveal">OUR SERVICES</p>
              <h2 className="reveal">Providing excellence</h2>
              <Button
                variant="architectural"
                className="scroll-cue reveal"
                onClick={() => goTo("projects")}
                aria-label="Scroll to projects"
              >
                <ArrowDown />
              </Button>
            </div>
            <div className="services-grid">
              {services.map(({ Icon, title }) => (
                <article className="service reveal" key={title}>
                  <Icon strokeWidth={1} />
                  <h3>{title}</h3>
                  <p>{sampleCopy}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="projects" className="projects-section">
            <div className="project-visual reveal">
              <img ref={projectImage} src={project.image} alt={project.title} loading="lazy" />
              <span className="project-number">0{projectIndex + 1}</span>
              <Button
                variant="editorial"
                className="project-view"
                onClick={() => setProjectOpen(true)}
              >
                VIEW PROJECT
                <ArrowUpRight />
              </Button>
            </div>
            <div className="project-caption content-width">
              <div className="project-copy reveal">
                <p className="eyebrow">SELECTED WORK</p>
                <h2>Our Projects</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut
                  labore et dolore magna aliqua.
                </p>
              </div>
              <div className="project-arrows">
                <Button
                  variant="architectural"
                  onClick={() => changeProject(-1)}
                  aria-label="Previous project"
                >
                  <ArrowLeft />
                </Button>
                <Button
                  variant="architectural"
                  onClick={() => changeProject(1)}
                  aria-label="Next project"
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </section>
        </div>

        <section id="contact" className="contact-section content-width">
          <h2 className="sr-only">Get in Touch</h2>
          <div className="contact-intro reveal">
            <Mark />
            <p>{sampleCopy}</p>
            <Button variant="architectural" className="contact-cta" asChild>
              <a href="mailto:info@website.com">GET IN TOUCH</a>
            </Button>
          </div>
          <div className="contact-details">
            <div className="reveal">
              <h3>Talk</h3>
              <a href="tel:+12468904">+12468904</a>
            </div>
            <div className="reveal">
              <h3>Meet</h3>
              <p>9523 TUNNEL ST.</p>
            </div>
            <div className="reveal">
              <h3>Write</h3>
              <a href="mailto:info@website.com">INFO@WEBSITE.COM</a>
            </div>
          </div>
          <div className="contact-social reveal">
            <Button variant="architectural" asChild>
              <a
                href="https://www.facebook.com/wordpress.slider.revolution"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
            </Button>
            <Button variant="architectural" asChild>
              <a
                href="https://www.instagram.com/sliderrevolution/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <footer className="site-footer content-width">
        <p>© Copyright 2021 Slider Revolution</p>
      </footer>

      <Dialog.Root open={projectOpen} onOpenChange={setProjectOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-shade" />
          <Dialog.Content className="project-modal">
            <Dialog.Close asChild>
              <Button variant="architectural" className="modal-close" aria-label="Close project">
                <X />
              </Button>
            </Dialog.Close>
            <img src={project.image} alt={project.title} />
            <div className="modal-copy">
              <p className="eyebrow">SELECTED PROJECT / 0{projectIndex + 1}</p>
              <Dialog.Title>{project.title}</Dialog.Title>
              <Dialog.Description>{project.location}</Dialog.Description>
              <Button variant="editorial" asChild>
                <a href="mailto:info@website.com">
                  ENQUIRE ABOUT THIS PROJECT
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
