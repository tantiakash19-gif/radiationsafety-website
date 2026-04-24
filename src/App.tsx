import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection, SiteFooter, SiteHeader, WhatsAppFloat } from "./components";
import { faqs, products, services } from "./data";

const inquiryApiCandidates = ["/api/inquiry", "http://localhost:4000/api/inquiry"];

function HomePage() {
  const trustPoints = [
    "AERB documentation and registration support",
    "Serving hospitals, dental clinics, and diagnostic centers",
    "GST billing, fast dispatch, and dedicated account support",
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-blue-800 to-brand-700 py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="section-shell grid gap-8 md:grid-cols-2 md:items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-3 inline-block rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
              RadiSafe Solutions
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
              Certified Radiation Safety & AERB Consultancy Services
            </h1>
            <p className="mt-4 text-sm text-blue-100 sm:text-base">
              We help clinics, hospitals, and industries stay fully compliant with AERB regulations while ensuring
              maximum radiation safety.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-white px-5 py-2.5 font-semibold text-brand-700 shadow-lg transition hover:-translate-y-0.5"
              >
                Get Free Consultation
              </Link>
              <a
                href="https://wa.me/917003206632?text=Need%20AERB%20consultancy%20support%20for%20our%20facility."
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white px-5 py-2.5 font-semibold transition hover:bg-white/10"
              >
                Contact on WhatsApp
              </a>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-blue-100">
              {trustPoints.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur"
          >
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80"
              alt="Radiation safety consultation for Indian healthcare facilities"
              className="h-72 w-full rounded-xl object-cover shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      <AnimatedSection title="Service Highlights">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "AERB License & Registration",
            "Radiation Safety Audit",
            "X-ray Room Setup & Compliance",
            "Radiation Protection Equipment Supply",
          ].map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-900">{item}</h3>
              <p className="mt-2 text-sm text-slate-600">Reliable, documented, and compliance-focused delivery.</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection title="Why Leading Indian Facilities Choose Us">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { stat: "500+", label: "Projects supported across India" },
            { stat: "48 hrs", label: "Fast initial consultation turnaround" },
            { stat: "95%", label: "Repeat clients and referral business" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-gradient-to-br from-white to-brand-50 p-6 shadow-sm ring-1 ring-slate-100">
              <p className="text-3xl font-bold text-brand-700">{item.stat}</p>
              <p className="mt-2 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <TestimonialsSection />
      <FaqSection />
    </>
  );
}

function ServicesPage() {
  return (
    <AnimatedSection title="Our Services">
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-brand-900">{service.title}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}

function ProductsPage() {
  return (
    <AnimatedSection title="Radiation Protection Products">
      <div className="grid gap-5 sm:grid-cols-2">
        {products.map((item) => (
          <article
            key={item.name}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
              alt={item.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{item.category}</p>
              <h3 className="mt-1 text-lg font-semibold text-brand-900">{item.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              <p className="mt-2 text-sm text-slate-600">Price Range: {item.price}</p>
            </div>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}

function AboutPage() {
  return (
    <AnimatedSection title="About RadiSafe Solutions">
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p>
          RadiSafe Solutions is a trusted provider of radiation safety consultancy and equipment supply in India.
        </p>
        <p>
          We are certified and experienced in handling AERB compliance, ensuring our clients meet all regulatory
          requirements without hassle.
        </p>
        <p>Our mission is to make radiation environments safer, compliant, and efficient.</p>
        <p className="text-sm text-slate-600">
          From Mumbai to Bengaluru, Chennai to Delhi NCR, we support private and public healthcare teams with practical
          compliance execution and audit-ready documentation.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-brand-50 p-4">
            <h3 className="font-semibold text-brand-900">Mission</h3>
            <p className="text-sm text-slate-700">Enable safer radiological environments through dependable support.</p>
          </div>
          <div className="rounded-lg bg-brand-50 p-4">
            <h3 className="font-semibold text-brand-900">Vision</h3>
            <p className="text-sm text-slate-700">
              Be India&apos;s trusted partner in radiation compliance and protection solutions.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    setNotice("");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      let response: Response | null = null;
      let acceptedWithoutEmail = false;

      for (const endpoint of inquiryApiCandidates) {
        try {
          const candidateResponse = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (candidateResponse.ok) {
            response = candidateResponse;
            break;
          }

          const failure = await candidateResponse.json().catch(() => null);
          const failureMessage = String(failure?.message || "");
          if (failureMessage.includes("Email is not configured on server")) {
            acceptedWithoutEmail = true;
            setNotice("Inquiry submitted. Email forwarding is being configured on server.");
            break;
          }

          if (failureMessage) {
            setError("Could not submit inquiry right now. Please try again.");
          }
        } catch {
          // Try the next endpoint candidate.
        }
      }

      if (!response && !acceptedWithoutEmail) throw new Error("Unable to send inquiry");
      event.currentTarget.reset();
      setStatus("done");
    } catch {
      setStatus("idle");
      setError((current) =>
        current || "Could not reach inquiry API. Make sure backend is running with `npm run server` on port 4000.",
      );
    }
  }

  return (
    <AnimatedSection title="Contact Us">
      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="rounded-lg bg-brand-50 p-3 text-sm text-brand-900">
            Get a free consultation call within 24-48 working hours.
          </p>
          <InputField name="name" label="Name" />
          <InputField name="phone" label="Phone" />
          <InputField name="email" label="Email" type="email" />
          <label className="block text-sm font-medium">
            Message
            <textarea
              name="message"
              required
              className="mt-1 min-h-28 w-full rounded-lg border border-slate-300 p-2.5 focus:border-brand-600 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Submit Inquiry"}
          </button>
          {status === "done" ? <p className="text-sm text-emerald-600">Inquiry submitted successfully.</p> : null}
          {notice ? <p className="text-sm text-amber-600">{notice}</p> : null}
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        </form>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm">
            <p>
              <span className="font-semibold">Phone:</span> +91-7003206632
            </p>
            <p className="mt-2">
              <span className="font-semibold">Email:</span> tantiakash19@gmail.com
            </p>
            <p className="mt-2">
              <span className="font-semibold">Office Hours:</span> Mon-Sat, 9:30 AM - 7:00 PM
            </p>
          </div>
          <a
            href="https://wa.me/917003206632?text=I%20want%20to%20discuss%20radiation%20safety%20requirements."
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-white"
          >
            WhatsApp Button
          </a>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <iframe
              title="RadiSafe Solutions Location"
              src="https://maps.google.com/maps?q=New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-[350px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function InputField({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required
        className="mt-1 w-full rounded-lg border border-slate-300 p-2.5 focus:border-brand-600 focus:outline-none"
      />
    </label>
  );
}

function TestimonialsSection() {
  const items = [
    "RadiSafe handled our AERB renewal for three branches in Pune with clear documentation and zero follow-up delays.",
    "Their audit team explained every compliance point in practical language for our radiology and admin teams.",
    "Product quality is consistent and dispatch timelines are dependable for our hospital procurement cycles.",
  ];

  return (
    <AnimatedSection title="What Clients Say">
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <blockquote
            key={item}
            className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1"
          >
            "{item}"
          </blockquote>
        ))}
      </div>
    </AnimatedSection>
  );
}

function FaqSection() {
  return (
    <AnimatedSection title="Frequently Asked Questions">
      <div className="space-y-3">
        {faqs.map((item) => (
          <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer font-semibold text-brand-900">{item.q}</summary>
            <p className="mt-2 text-sm text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </AnimatedSection>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_45%)]">
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-2 backdrop-blur md:hidden">
        <div className="section-shell flex gap-2">
          <Link to="/contact" className="flex-1 rounded-full bg-brand-600 px-4 py-2 text-center text-sm font-semibold text-white">
            Get Quote
          </Link>
          <a
            href="https://wa.me/917003206632?text=I%20want%20AERB%20consultancy%20support."
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-center text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
