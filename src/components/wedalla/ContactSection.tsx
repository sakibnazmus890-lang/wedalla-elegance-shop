import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const c = useSiteContent("contact", {
    email: "hellowedalla@gmail.com",
    phone: "+8801401983744",
    address: "209 2nd faze , Khulna 9100, Khulna,\nBangladesh, 9100",
  });

  return (
    <section id="contact" className="section-slide">
      <div className="bg-blob w-80 h-80 top-10 left-10" style={{ background: 'var(--glow-purple)' }} />
      <div className="bg-blob w-64 h-64 bottom-10 right-10" style={{ background: 'var(--glow-blue)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Get in Touch</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Let's Create <span className="gradient-text">Magic</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <p className="text-2xl font-display font-bold text-foreground mb-2">Thank You!</p>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Tell us about your dream event..."
                    rows={4}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <a
                  href="mailto:hellowedalla@gmail.com?subject=Event%20Booking%20Inquiry"
                  className="w-full btn-glow py-4 rounded-full text-primary-foreground font-semibold text-lg block text-center"
                >
                  Book Your Event Or Service's
                </a>
              </form>
            )}
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            {[
              { icon: Mail, label: c.email },
              { icon: Phone, label: c.phone },
              { icon: MapPin, label: c.address },
            ].map((item) => (
              <div key={item.label} className="glass-card glass-card-hover p-6 flex items-center gap-5 transition-all duration-300 hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground font-medium whitespace-pre-line">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
