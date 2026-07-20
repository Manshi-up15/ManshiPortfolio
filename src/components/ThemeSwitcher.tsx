/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisualTheme } from "../types";
import { Sparkles, Compass } from "lucide-react";

interface ThemeSwitcherProps {
  activeTheme: VisualTheme;
  onThemeChange: (theme: VisualTheme) => void;
}

export default function ThemeSwitcher({ activeTheme, onThemeChange }: ThemeSwitcherProps) {
  const isBrutalist = activeTheme === "brutalist";

  return (
    <div className="flex items-center gap-1.5 p-1 bg-black/5 dark:bg-white/5 rounded-full border border-black/10 shadow-inner">
      {/* Brutalist Bauhaus option — primary */}
      <button
        onClick={() => onThemeChange("brutalist")}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase transition-all duration-300 ${isBrutalist ? "bg-black text-white shadow-md shadow-[#e040a0]/30 scale-102" : "text-gray-500 hover:text-black dark:text-gray-400"}`}
        aria-label="Neo-Brutalist style"
      >
        <Sparkles className={`w-3.5 h-3.5 ${isBrutalist ? "text-yellow-400 animate-pulse" : "text-gray-400"}`} />
        <span className="font-space tracking-tight">Bauhaus Brutalist</span>
      </button>

      {/* Editorial Sahara button — secondary */}
      <button
        onClick={() => onThemeChange("editorial")}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase transition-all duration-300 ${!isBrutalist ? "bg-white text-[#964407] shadow-md scale-102" : "text-gray-500 hover:text-black dark:text-gray-400"}`}
        aria-label="Editorial (Sahara) style"
      >
        <Compass className={`w-3.5 h-3.5 ${!isBrutalist ? "text-[#c2652a] animate-spin-slow" : "text-gray-400"}`} />
        <span className="font-manrope tracking-wider">Editorial Sahara</span>
      </button>
    </div>
  );
}
