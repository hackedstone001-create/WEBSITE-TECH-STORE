'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Cpu, KeyRound, CheckCircle2, Play, Pause } from 'lucide-react';

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Explicitly enforce muted properties for strict browser autoplay policies (Safari & Chrome)
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.playsInline = true;
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log('Autoplay deferred by browser:', err);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 overflow-hidden bg-[#08080B] text-white">
      {/* Background Video Layer — Vivid, Clear, Unobstructed */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/hero-poster.png"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90 transition-opacity duration-700"
        >
          {/* Local high-performance copy */}
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          {/* CloudFront CDN link provided by user */}
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_084718_72a17915-4964-4059-afcd-22d59399b72e.mp4"
            type="video/mp4"
          />
        </video>

        {/* Subtle Edge Transitions only — preserves video clarity while ensuring smooth blending */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#08080B] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#08080B]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,8,11,0.6)_100%)] pointer-events-none" />
      </div>

      {/* Video Status Controls */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={togglePlayback}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111116]/80 backdrop-blur-md border border-purple-500/30 text-[11px] text-slate-300 hover:text-white hover:border-purple-400 transition-all shadow-md active:scale-95"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
        >
          {isPlaying ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Background Video Active</span>
              <Pause className="w-3 h-3 ml-0.5 text-slate-400" />
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Resume Video</span>
              <Play className="w-3 h-3 ml-0.5 text-purple-400 fill-purple-400" />
            </>
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-7">
          {/* Editorial Eyebrow with Official Logo Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#111116]/85 backdrop-blur-md border border-purple-500/40 text-xs font-medium text-slate-200 shadow-[0_0_25px_rgba(129,56,245,0.3)] hover:border-purple-400 transition-colors">
            <div className="relative w-5 h-5 rounded-full overflow-hidden bg-black flex items-center justify-center p-0.5">
              <Image
                src="/brand/tech-store-logo.png"
                alt="Tech Store"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-purple-300 font-semibold tracking-wider text-[11px] uppercase">
              YOUR TECH, OUR SOLUTION
            </span>
            <span className="text-purple-800">|</span>
            <span className="text-slate-300 text-[11px]">Instant Automated Dispatch</span>
          </div>

          {/* Main Headline strictly matching prompt */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.08] font-display drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
              Your Digital World.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
                One Store.
              </span>
            </h1>
          </div>

          {/* Supporting Text strictly matching prompt */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            Discover powerful software, Windows licenses, and next-generation AI tools at affordable prices.
          </p>

          {/* Action Buttons strictly matching prompt */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/products"
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-[#8138F5] hover:bg-[#7025e0] text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(129,56,245,0.6)] hover:shadow-[0_0_45px_rgba(168,85,247,0.8)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/category/ai-tools"
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-[#111116]/85 backdrop-blur-md text-slate-200 hover:text-white font-semibold text-sm border border-purple-500/40 hover:border-purple-300 flex items-center justify-center gap-2 hover:bg-purple-600/20 transition-all duration-200 shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
            >
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Explore AI Tools</span>
            </Link>
          </div>

          {/* Value Indicators / Commercial Confidence Metrics */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-[#111116]/80 backdrop-blur-md p-4 border border-purple-500/25 shadow-lg text-center hover:border-purple-400 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">10,000+</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Delivered Licenses</div>
            </div>
            <div className="rounded-2xl bg-[#111116]/80 backdrop-blur-md p-4 border border-purple-500/25 shadow-lg text-center hover:border-purple-400 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-purple-400 font-display">&lt; 60s</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Instant Delivery</div>
            </div>
            <div className="rounded-2xl bg-[#111116]/80 backdrop-blur-md p-4 border border-purple-500/25 shadow-lg text-center hover:border-purple-400 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">100%</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Genuine Activation</div>
            </div>
            <div className="rounded-2xl bg-[#111116]/80 backdrop-blur-md p-4 border border-purple-500/25 shadow-lg text-center hover:border-purple-400 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-purple-400 font-display">₹ INR</div>
              <div className="text-xs text-slate-300 font-medium mt-1">Direct Indian Pricing</div>
            </div>
          </div>

          {/* Quick Flagship Highlights Floating Pills */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products/windows-11-pro-retail-license"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#19151F]/85 backdrop-blur-md border border-purple-500/35 text-xs text-slate-200 hover:text-white hover:border-purple-400 transition-all shadow-md group"
            >
              <KeyRound className="w-3.5 h-3.5 text-purple-400" />
              <span>Windows 11 Pro Retail</span>
              <span className="text-purple-300 font-bold font-mono">₹699</span>
            </Link>
            <Link
              href="/products/microsoft-office-2024-pro-plus"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#19151F]/85 backdrop-blur-md border border-purple-500/35 text-xs text-slate-200 hover:text-white hover:border-purple-400 transition-all shadow-md group"
            >
              <Zap className="w-3.5 h-3.5 text-[#16A36A]" />
              <span>Office 2024 Pro Plus</span>
              <span className="text-purple-300 font-bold font-mono">₹1,499</span>
            </Link>
            <Link
              href="/products/chatgpt-plus-subscription"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#19151F]/85 backdrop-blur-md border border-purple-500/35 text-xs text-slate-200 hover:text-white hover:border-purple-400 transition-all shadow-md group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
              <span>ChatGPT Plus (GPT-4o)</span>
              <span className="text-purple-300 font-bold font-mono">₹1,599</span>
            </Link>
          </div>

          {/* Store Pillars */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-300">
            <span className="text-slate-400 uppercase tracking-wider text-[11px] font-semibold">Guarantees:</span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A36A]" /> Official Server Validation
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A36A]" /> 48-Hour Activation Warranty
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A36A]" /> Direct WhatsApp Support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};