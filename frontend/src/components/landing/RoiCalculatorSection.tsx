"use client";

import React, { useState } from "react";
import { Clock, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

interface RoiCalculatorSectionProps {
  onActionClick: (destination: string) => void;
}

export default function RoiCalculatorSection({
  onActionClick,
}: RoiCalculatorSectionProps) {
  const [appsPerMonth, setAppsPerMonth] = useState(20);
  const [minutesPerApp, setMinutesPerApp] = useState(45);
  const [hourlyValuation, setHourlyValuation] = useState(60);

  // Calculations
  // Manual time in hours = (appsPerMonth * minutesPerApp) / 60
  // Compiler time in hours = (appsPerMonth * 3) / 60
  // Hours saved = ((appsPerMonth * (minutesPerApp - 3)) / 60)
  const hoursSaved = Math.max(
    1,
    Math.round(((appsPerMonth * (minutesPerApp - 3)) / 60) * 10) / 10
  );
  const monthlySavings = Math.round(hoursSaved * hourlyValuation);
  const yearlySavings = monthlySavings * 12;

  return (
    <section className="py-20 lg:py-28 bg-[#090b10] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0e15] shadow-2xl">
          <div className="grid lg:grid-cols-[1fr_0.9fr]">
            {/* Left Column: Sliders */}
            <div className="p-7 sm:p-10 lg:p-12 text-left">
              <div className="flex items-center gap-2.5 mb-8">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-500/20 text-violet-400">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                  Career ROI & Time Multiplier
                </span>
              </div>

              <div className="space-y-8">
                {/* Slider 1 */}
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <label
                      htmlFor="roi-apps-per-month"
                      className="text-sm font-medium text-slate-200"
                    >
                      Target job applications per month
                    </label>
                    <span className="text-sm font-bold text-white tabular-nums font-mono">
                      {appsPerMonth} apps
                    </span>
                  </div>
                  <input
                    id="roi-apps-per-month"
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={appsPerMonth}
                    onChange={(e) => setAppsPerMonth(Number(e.target.value))}
                    className="roi-range w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10"
                    style={{
                      background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${
                        ((appsPerMonth - 5) / 55) * 100
                      }%, rgba(255,255,255,0.1) ${
                        ((appsPerMonth - 5) / 55) * 100
                      }%, rgba(255,255,255,0.1) 100%)`,
                    }}
                  />
                </div>

                {/* Slider 2 */}
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <label
                      htmlFor="roi-minutes-per-app"
                      className="text-sm font-medium text-slate-200"
                    >
                      Time spent tailoring each resume today
                    </label>
                    <span className="text-sm font-bold text-white tabular-nums font-mono">
                      {minutesPerApp} min
                    </span>
                  </div>
                  <input
                    id="roi-minutes-per-app"
                    type="range"
                    min="15"
                    max="90"
                    step="5"
                    value={minutesPerApp}
                    onChange={(e) => setMinutesPerApp(Number(e.target.value))}
                    className="roi-range w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10"
                    style={{
                      background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${
                        ((minutesPerApp - 15) / 75) * 100
                      }%, rgba(255,255,255,0.1) ${
                        ((minutesPerApp - 15) / 75) * 100
                      }%, rgba(255,255,255,0.1) 100%)`,
                    }}
                  />
                </div>

                {/* Slider 3 */}
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <label
                      htmlFor="roi-hourly-rate"
                      className="text-sm font-medium text-slate-200"
                    >
                      Your developer hourly rate / valuation
                    </label>
                    <span className="text-sm font-bold text-white tabular-nums font-mono">
                      ${hourlyValuation} / hr
                    </span>
                  </div>
                  <input
                    id="roi-hourly-rate"
                    type="range"
                    min="25"
                    max="150"
                    step="5"
                    value={hourlyValuation}
                    onChange={(e) => setHourlyValuation(Number(e.target.value))}
                    className="roi-range w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10"
                    style={{
                      background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${
                        ((hourlyValuation - 25) / 125) * 100
                      }%, rgba(255,255,255,0.1) ${
                        ((hourlyValuation - 25) / 125) * 100
                      }%, rgba(255,255,255,0.1) 100%)`,
                    }}
                  />
                </div>
              </div>

              <p className="mt-8 text-xs text-slate-400 font-mono">
                * Estimated savings based on ~3 min AI compilation vs. manual document formatting.
              </p>
            </div>

            {/* Right Column: Dynamic Gradient Output */}
            <div className="relative p-8 sm:p-10 lg:p-12 flex flex-col justify-center gap-7 bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-800 text-white overflow-hidden text-left">
              {/* Radial glow flare */}
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.22), transparent 70%)",
                }}
              />

              <div className="relative">
                <div className="flex items-center gap-2 text-violet-200 text-sm font-medium mb-1">
                  <Clock className="w-4 h-4" />
                  Engineering time saved per month
                </div>
                <div className="text-4xl lg:text-5xl font-black tracking-tight tabular-nums font-mono">
                  {hoursSaved}{" "}
                  <span className="text-2xl lg:text-3xl font-bold text-violet-200">
                    hrs
                  </span>
                </div>
              </div>

              <div className="relative h-px bg-white/20" />

              <div className="relative">
                <div className="flex items-center gap-2 text-violet-200 text-sm font-medium mb-1">
                  <TrendingUp className="w-4 h-4" />
                  Productive value unlocked per month
                </div>
                <div className="text-5xl lg:text-6xl font-black tracking-tight tabular-nums font-mono">
                  ${monthlySavings.toLocaleString()}
                </div>
                <div className="mt-1 text-sm font-medium text-violet-200 font-mono">
                  &approx; ${yearlySavings.toLocaleString()} in reclaimed time per year
                </div>
              </div>

              <button
                onClick={() => onActionClick("/resume")}
                className="relative mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-violet-700 font-bold hover:bg-violet-50 transition-colors group cursor-pointer shadow-xl text-sm"
              >
                Reclaim your time today
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
