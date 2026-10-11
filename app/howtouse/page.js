"use client"
import React from 'react'
const Howtouse = () => {
  const steps = [
    { num: 1, title: "Enter URL", desc: "Paste the full web address you want to shorten in the 'Enter your URL' field. Include http:// or https:// (e.g. https://example.com) — the form will normalize it automatically." },
    { num: 2, title: "Enter Short URL text", desc: "Optionally choose a custom alias in the 'Enter your Preffered Short URL text' field. Keep it short and memorable; if left empty, a random short ID is generated for you." },
    { num: 3, title: "Generate", desc: "Click the brass 'Generate' button. Your short link appears instantly — copy it, then share it anywhere." },
  ]
  const tips = [
    "Your preferred short URL text must be unique — if someone already claims it, you'll be asked to pick another.",
    "Short links behave like regular links: paste them in emails, chats, or on social media and they forward visitors to your destination.",
    "A dash or underscore works well in a custom alias, but avoid spaces and special characters.",
  ]
  const faq = [
    { q: "Is this service free?", a: "Yes — Shortlink is free to use, no sign-up required." },
    { q: "Can I change my short link later?", a: "Custom aliases are set at generation time and can't be edited afterward; generate a new link if you need a change." },
    { q: "Do short links expire?", a: "No — links remain valid indefinitely unless deliberately deleted." },
  ]

  return (
    <div className="sl-rise min-h-screen bg-shell">
      {/* Top ruler */}
      <div
        aria-hidden="true"
        className="sl-ruler pointer-events-none absolute inset-x-0 top-0 h-[5px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--rule) 0 1px, transparent 1px 9px)",
        }}
      />
      <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        {/* Header */}
        <div className="sl-clamp">
          <h1 className="text-[18px] font-bold uppercase tracking-[0.14em] text-shell-ink font-mono">
            How to Use Shortlink
          </h1>
          <div
            aria-hidden="true"
            className="mt-6 h-[1px] w-full sl-ruler"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--brass) 0 1px, transparent 1px 9px)",
            }}
          />
          <p className="mt-6 text-[16px] leading-relaxed text-shell-ink">
            Shortening a URL takes three steps. Follow the guide below, then head to the
            generator to create your first short link.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12">
          <h2 className="text-[15px] font-bold uppercase tracking-[0.14em] text-brass">
            The 3 Steps
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex gap-6 rounded-[3px] border border-rule p-5 transition-colors hover:border-brass"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-brass font-mono text-[15px] font-bold uppercase text-shell-ink">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-[15px] font-bold uppercase tracking-[0.14em] text-shell-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-shell-muted">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12">
          <h2 className="text-[15px] font-bold uppercase tracking-[0.14em] text-brass">
            Tips
          </h2>
          <ul className="mt-6 list-disc pl-6">
            {tips.map((tip, i) => (
              <li key={i} className="mt-2 text-[13px] leading-relaxed text-shell-muted">
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-[15px] font-bold uppercase tracking-[0.14em] text-brass">
            FAQ
          </h2>
          <div className="mt-6 flex flex-col gap-6 border-t border-rule-soft pt-6">
            {faq.map((item, i) => (
              <div key={i}>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-shell-ink">
                  {item.q}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-shell-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/shorten"
            className="sl-ruler inline-flex items-center gap-3 rounded-[3px] bg-brass px-6 py-3 uppercase tracking-[0.14em] font-mono text-[13px] text-shell-ink hover:bg-brass-lit transition-colors"
          >
            Go to Generate
            <span aria-hidden="true" className="inline-block h-3 w-3 rounded-full bg-shell" />
          </a>
        </div>
      </div>

      {/* Bottom ruler */}
      <div
        aria-hidden="true"
        className="sl-ruler pointer-events-none absolute inset-x-0 bottom-0 h-[5px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--rule) 0 1px, transparent 1px 9px)",
        }}
      />
    </div>
  )
}

export default Howtouse