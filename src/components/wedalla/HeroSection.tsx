import heroImg from "@/assets/hero-event.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection = () => {
  const c = useSiteContent("hero", {
    title: "We don't just decorate weddings — we build dreams",
    subtitle: "Crafting unforgettable moments with elegance, passion, and cinematic precision",
    cta: "Book Now",
  });
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Luxury event setup" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,15,0.92) 0%, rgba(26,27,58,0.85) 40%, rgba(45,30,95,0.78) 70%, rgba(20,10,60,0.9) 100%)' }} />
      </div>

      {/* Floating blobs - intensified */}
      <div className="bg-blob w-[500px] h-[500px] top-10 -left-32" style={{ background: 'var(--glow-purple)' }} />
      <div className="bg-blob w-[450px] h-[450px] bottom-10 -right-24" style={{ background: 'var(--glow-blue)' }} />
      <div className="bg-blob w-[350px] h-[350px] top-1/3 left-1/2 -translate-x-1/2" style={{ background: 'var(--glow-pink)' }} />
      <div className="bg-blob-sm w-72 h-72 top-2/3 left-1/4" style={{ background: 'var(--glow-purple)' }} />
      <div className="bg-blob-sm w-64 h-64 top-1/4 right-1/4" style={{ background: 'var(--glow-blue)' }} />

      {/* Floating decorative elements */}
      <div className="absolute top-32 left-16 w-4 h-4 rounded-full bg-primary/70 animate-float shadow-[0_0_15px_rgba(123,47,247,0.8)]" />
      <div className="absolute top-48 right-24 w-3 h-3 rounded-full bg-accent/70 animate-float-delayed shadow-[0_0_12px_rgba(0,198,255,0.8)]" />
      <div className="absolute bottom-40 left-1/4 w-5 h-5 rounded-full bg-primary/50 animate-float-slow shadow-[0_0_18px_rgba(123,47,247,0.7)]" />
      <div className="absolute bottom-60 right-1/3 w-3 h-3 rounded-full bg-accent/50 animate-float shadow-[0_0_12px_rgba(0,198,255,0.7)]" />
      <div className="absolute top-1/3 right-16 w-2 h-2 rounded-full bg-pink-400/60 animate-float-delayed shadow-[0_0_10px_rgba(236,72,153,0.8)]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-6 animate-fade-up">
          Wedalla Event Planner
        </p>
        <h1 className="heading-display font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8 animate-fade-up-delay-1 text-foreground">
          {c.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up-delay-2">
          {c.subtitle}
        </p>
        <a
          href="#contact"
          className="inline-block btn-glow px-10 py-4 rounded-full text-primary-foreground font-semibold text-lg tracking-wide animate-fade-up-delay-3"
        >
          {c.cta}
        </a>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, hsl(240,20%,4%), transparent)' }} />
    </section>
  );
};

export default HeroSection;
