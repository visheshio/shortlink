"use client"
import React from 'react'
import { useState } from 'react'
const Shorten = () => {

  const [url, seturl] = useState("")
  const [shorturl, setshorturl] = useState("")
  const [generated, setgenerated] = useState(false)
  return (
 
    <div className="sl-rise min-h-screen bg-shell">
      {/* Top ruler accent bar */}
      <div
        aria-hidden="true"
        className="sl-ruler pointer-events-none absolute inset-x-0 top-0 h-[5px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--rule) 0 1px, transparent 1px 9px)",
        }}
      />
      <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="sl-clamp">
          <h1 className="text-[18px] font-bold uppercase tracking-[0.14em] text-shell-ink font-mono">
            Generate Your Shorten URL
          </h1>
          <div
            aria-hidden="true"
            className="mt-6 h-[1px] w-full sl-ruler"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--brass) 0 1px, transparent 1px 9px)",
            }}
          />
        </div>
        <div className="mt-12 flex flex-col gap-6">
          <input
            type="text"
            placeholder="Enter your URL"
            onChange={e => {
              seturl(e.target.value)
            }}
            className="w-full rounded-[3px] bg-shell px-5 py-3 text-shell-ink placeholder-shell-muted font-mono border border-rule focus-visible:outline-2 focus-visible:outline-brass transition-colors"
          />
          <input
            type="text"
            placeholder="Enter your Preffered Short URL text"
            onChange={e => {
              setshorturl(e.target.value)
            }}
            className="w-full rounded-[3px] bg-shell px-5 py-3 text-shell-ink placeholder-shell-muted font-mono border border-rule focus-visible:outline-2 focus-visible:outline-brass transition-colors"
          />
          <button
            type="button"
            className="mt-2 sl-ruler w-full rounded-[3px] bg-brass py-3 uppercase tracking-[0.14em] font-mono text-shell-ink hover:bg-brass-lit transition-colors"
          >
            Generate
          </button>
        </div>
      </div>
      {/* Bottom ruler bar */}
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

export default Shorten