import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "./data";

export function AnimatedSection({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="py-12 sm:py-16"
    >
      <div className="section-shell">
        {title ? <h2 className="mb-5 text-2xl font-bold text-brand-900 sm:text-3xl">{title}</h2> : null}
        {children}
      </div>
    </motion.section>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-3">
        <div>
          <p className="text-lg font-bold tracking-tight text-brand-900">RadiSafe Solutions</p>
          <p className="text-xs text-slate-500">AERB Certified Services | PAN India Support</p>
        </div>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 transition-all duration-300 ${
                  isActive
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                    : "text-slate-700 hover:-translate-y-0.5 hover:bg-brand-50 hover:text-brand-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="section-shell flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} RadiSafe Solutions. All rights reserved.</p>
        <p>Serving dental clinics, diagnostic centers, hospitals, and industrial clients across India.</p>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/917003206632?text=Hello%20RadiSafe%20Solutions%2C%20I%20need%20consultancy."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp Us
    </a>
  );
}
