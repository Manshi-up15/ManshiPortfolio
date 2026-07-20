/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Project, VisualTheme } from "../types";
import { X, Calendar, User, ShoppingBag, Search, Sparkles, Sliders, Play, CheckCircle } from "lucide-react";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  activeTheme: VisualTheme;
}

export default function ProjectDetailModal({ project, isOpen, onClose, activeTheme }: ProjectDetailModalProps) {
  if (!isOpen || !project) return null;

  const isBrutalist = activeTheme === "brutalist";

  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Theme-specific CSS classes
  const modalWrapperCls = isBrutalist
    ? "bg-[#faf5ee] border-4 border-black shadow-[16px_16px_0px_0px_#000000] rounded-none max-w-4xl"
    : "bg-white border border-[#e6e0d6] shadow-[0_30px_70px_rgba(58,48,42,0.15)] rounded-xl max-w-4xl";

  const closeButtonCls = isBrutalist
    ? "border-2 border-black bg-[#ff3b30] text-white p-1 shadow-[2px_2px_0px_white] active:translate-y-[2px] transition-all hover:bg-black"
    : "p-2 hover:bg-[#fef1e7] text-on-surface-variant hover:text-primary rounded-full transition-colors";

  const btnPrimaryCls = isBrutalist
    ? "brutalist-button-primary px-6 py-2.5 font-bold uppercase text-sm tracking-tight text-center"
    : "bg-primary text-white font-semibold text-sm py-2.5 px-6 rounded-md shadow-md hover:bg-primary-container transition-all text-center";

  const bulletCls = isBrutalist
    ? "w-2.5 h-2.5 bg-black"
    : "w-2 h-2 bg-primary rounded-full";

  // Interactive State for HappenHub (Phone Simulation)
  const [ticketCount, setTicketCount] = useState(1);
  const [booked, setBooked] = useState(false);
  const [activeTab, setActiveTab] = useState<"detail" | "track">("detail");
  const [selectedMusic, setSelectedMusic] = useState("Jazz Festival");

  // Interactive State for Lost & Found (Dashboard Simulation)
  const [searchQuery, setSearchQuery] = useState("");
  const [lostItems, setLostItems] = useState([
    { name: "M2 Macbook Pro Space Grey", location: "Tech Lab Block C", date: "June 4, 2026", resolved: false, category: "Electronics" },
    { name: "Leather Wallet (Brown)", location: "Ground Cafeteria", date: "June 2, 2026", resolved: true, category: "Personal" },
    { name: "Silver Noise-Canceling Headphones", location: "Central Library Room 402", date: "May 31, 2026", resolved: false, category: "Electronics" },
    { name: "Campus ID Keycard", location: "Sports Pavilion Entrance", date: "May 29, 2026", resolved: false, category: "Documents" },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemLocation, setNewItemLocation] = useState("");

  const handleAddLostItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemLocation) return;
    setLostItems([
      {
        name: newItemName,
        location: newItemLocation,
        date: "Today",
        resolved: false,
        category: "General"
      },
      ...lostItems
    ]);
    setNewItemName("");
    setNewItemLocation("");
  };

  // Interactive State for ReelForge (Media Studio Simulation)
  const [filterStrength, setFilterStrength] = useState(80);
  const [cinematicPreset, setCinematicPreset] = useState("Cyberpunk Neon");
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);

  const triggerRenderVideo = () => {
    setIsRendering(true);
    setRenderProgress(0);
  };

  useEffect(() => {
    let interval: any;
    if (isRendering) {
      interval = setInterval(() => {
        setRenderProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsRendering(false);
            }, 800);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRendering]);

  // Interactive State for DepthForge (3D Particle Playground)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particleSpeed, setParticleSpeed] = useState(25);
  const [particleDensity, setParticleDensity] = useState(60);
  const [wireframeMode, setWireframeMode] = useState(true);

  // Quick particle animation
  useEffect(() => {
    if (project.id !== "depthforge" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const count = particleDensity;
      const speed = particleSpeed / 1000;

      angle += speed;

      // Render grid structure if in wireframe mode
      if (wireframeMode) {
        ctx.strokeStyle = isBrutalist ? "rgba(0,0,0,0.1)" : "rgba(150, 70, 7, 0.15)";
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 30) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }
        for (let j = 0; j < canvas.height; j += 30) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(canvas.width, j);
          ctx.stroke();
        }
      }

      // Draw mathematical orbital particles
      for (let i = 0; i < count; i++) {
        const phi = (i * Math.PI * 2) / count + angle;
        const radius = 60 + Math.sin(phi * 3 + angle * 2) * 20;
        const x = centerX + Math.cos(phi) * radius;
        const y = centerY + Math.sin(phi) * radius;

        ctx.fillStyle = isBrutalist
          ? i % 2 === 0 ? "#e040a0" : "#7c52aa"
          : i % 2 === 0 ? "#c2652a" : "#944242";

        ctx.beginPath();
        ctx.arc(x, y, 4 + Math.sin(phi + angle) * 2, 0, Math.PI * 2);
        ctx.fill();

        // Connect the dots
        if (wireframeMode && i > 0) {
          ctx.strokeStyle = isBrutalist ? "rgba(0,0,0,0.3)" : "rgba(150, 70, 7, 0.3)";
          ctx.beginPath();
          const prevPhi = ((i - 1) * Math.PI * 2) / count + angle;
          const prevRadius = 60 + Math.sin(prevPhi * 3 + angle * 2) * 20;
          ctx.moveTo(centerX + Math.cos(prevPhi) * prevRadius, centerY + Math.sin(prevPhi) * prevRadius);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [project.id, particleSpeed, particleDensity, wireframeMode, isBrutalist]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className={`w-full overflow-hidden flex flex-col my-8 h-auto max-h-[90vh] ${modalWrapperCls}`}>
        
        {/* Modal Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${isBrutalist ? "border-black bg-[#faf5ee]" : "border-[#e6e0d6] bg-[#fbf2fb]"}`}>
          <div>
            <span className={`text-[10px] font-extrabold tracking-widest uppercase block ${isBrutalist ? "text-purple-700" : "text-primary"}`}>
              {project.category}
            </span>
            <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${isBrutalist ? "font-space text-black" : "editorial-heading text-[#201b14] font-bold"}`}>
              {project.title}
            </h2>
          </div>
          <button onClick={onClose} className={closeButtonCls} aria-label="Close modal">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content Arena */}
        <div className="flex-grow overflow-y-auto grid lg:grid-cols-2 gap-0">
          
          {/* Column 1: Info Description */}
          <div className="p-6 md:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <p className={`text-base leading-relaxed ${isBrutalist ? "font-inter font-medium text-black" : "text-on-surface-variant font-light font-manrope"}`}>
                {project.extendedDescription}
              </p>

              {/* Specs Tagging Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className={`p-4 border ${isBrutalist ? "border-black bg-white" : "border-[#e6e0d6] bg-[#fff8f4] rounded-lg"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <User className={`w-4 h-4 ${isBrutalist ? "text-black" : "text-primary"}`} />
                    <span className="text-xs font-black uppercase text-gray-500">My Role</span>
                  </div>
                  <span className={`text-sm font-semibold ${isBrutalist ? "text-black" : "text-on-surface"}`}>{project.role}</span>
                </div>

                <div className={`p-4 border ${isBrutalist ? "border-black bg-white" : "border-[#e6e0d6] bg-[#fff8f4] rounded-lg"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className={`w-4 h-4 ${isBrutalist ? "text-black" : "text-primary"}`} />
                    <span className="text-xs font-black uppercase text-gray-500">Timeline</span>
                  </div>
                  <span className={`text-sm font-semibold ${isBrutalist ? "text-black" : "text-on-surface"}`}>{project.timeline}</span>
                </div>
              </div>

              {/* Deliverables checklist */}
              <div className="space-y-3">
                <h4 className={`text-xs font-black tracking-widest uppercase ${isBrutalist ? "text-black" : "text-primary"}`}>
                  Core Deliverables
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className={bulletCls} />
                      <span className={`text-sm font-medium ${isBrutalist ? "text-black" : "text-on-surface-variant"}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200 flex flex-wrap gap-3 items-center">
              <span className={`text-xs font-black uppercase ${isBrutalist ? "text-black" : "text-on-surface-variant"}`}>Tech Stack:</span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${isBrutalist ? "bg-white border-2 border-black text-black" : "bg-primary/10 text-primary border border-primary/20"}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: INTERACTIVE SIMULATION WORKGROUND */}
          <div className={`p-6 md:p-8 flex flex-col justify-center items-center relative ${isBrutalist ? "bg-purple-100/60 border-t-4 lg:border-t-0 lg:border-l-4 border-black" : "bg-[#fef1e7] border-t lg:border-t-0 lg:border-l border-[#e6e0d6]"}`}>
            
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/5 px-3 py-1 rounded-full pointer-events-none">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#554339]">Interactive Demo</span>
            </div>

            {/* CASE 1: PHONE MOCKUP (HappenHub) */}
            {project.mockupType === "phone" && (
              <div className={`w-[260px] h-[480px] bg-black rounded-[3rem] p-3 shadow-2xl relative border-4 border-gray-800 ${isBrutalist ? "shadow-black" : "shadow-[#c2652a]/20"}`}>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-8 h-1 bg-gray-800 rounded-full" />
                </div>
                
                {/* Inside simulated Screen */}
                <div className="w-full h-full bg-[#fdf8f5] rounded-[2.5rem] overflow-hidden flex flex-col justify-between relative pt-8 pb-4 px-3">
                  <div className="space-y-3 flex-grow overflow-y-auto">
                    
                    {/* Tiny Event Header */}
                    <div className="flex justify-between items-center px-1">
                      <span className="font-extrabold text-[10px] uppercase text-gray-400">Events Hub</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                        <span className="text-[8px] font-extrabold text-green-600">LIVE</span>
                      </div>
                    </div>

                    {/* Tiny Music Event Card */}
                    <div className="bg-white p-3 rounded-2xl border border-pink-100 shadow-sm space-y-2">
                      <div className="h-24 rounded-lg bg-gradient-to-tr from-[#e040a0] to-[#7c52aa] flex items-end p-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10" />
                        <span className="z-10 bg-white/90 text-black font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                          {selectedMusic}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <h5 className="font-extrabold text-xs text-gray-800 leading-tight">Underground Vinyl Sessions</h5>
                        <p className="text-[9px] text-gray-500">Warehouse 12, Block C Campus</p>
                        <p className="text-[9px] text-[#e040a0] font-extrabold">Price: Free Allocation</p>
                      </div>
                    </div>

                    {/* Quick Interactive buttons inside phone */}
                    <div className="space-y-1.5 px-0.5">
                      <span className="text-[8px] font-black uppercase text-gray-400 block">Select Booking Session</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {["Jazz Festival", "Synth Nights", "Acoustic Pop", "Indie Rock"].map((music) => (
                          <button
                            key={music}
                            onClick={() => setSelectedMusic(music)}
                            className={`px-2 py-1 text-[8px] font-black uppercase border transition-all text-center rounded-lg ${selectedMusic === music ? "bg-purple-600 text-white border-purple-600" : "bg-white border-gray-200 text-gray-700 hover:border-pink-300"}`}
                          >
                            {music}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-gray-100">
                      <span className="text-[9px] font-black uppercase text-gray-500">Tickets qty</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-5 h-5 flex items-center justify-center border rounded-full font-bold text-[10px] hover:bg-gray-100">-</button>
                        <span className="text-xs font-black text-gray-800">{ticketCount}</span>
                        <button onClick={() => setTicketCount(Math.min(5, ticketCount + 1))} className="w-5 h-5 flex items-center justify-center border rounded-full font-bold text-[10px] hover:bg-gray-100">+</button>
                      </div>
                    </div>

                  </div>

                  {/* Book tickets active actions inside smartphone */}
                  <div className="pt-2">
                    {booked ? (
                      <div className="bg-green-100 text-green-700 p-2 rounded-xl border border-green-200 text-center space-y-1.5 anim-fade">
                        <div className="flex items-center justify-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-black uppercase">Booking Approved!</span>
                        </div>
                        <p className="text-[8px] text-green-600 leading-none">Registered: {ticketCount} slot(s) for {selectedMusic}</p>
                        <button onClick={() => setBooked(false)} className="text-[8px] underline uppercase block font-black mx-auto mt-1 text-green-800">Book Again</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setBooked(true)}
                        className="w-full bg-[#e040a0] text-white active:scale-95 transition-all font-black text-[10px] uppercase py-2 py-2.5 rounded-xl shadow-md cursor-pointer text-center"
                      >
                        Claim {ticketCount} Free Passes
                      </button>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* CASE 2: DASHBOARD PREVIEW (Lost & Found) */}
            {project.mockupType === "dashboard" && (
              <div className={`w-full max-w-md bg-white border p-4 shadow-lg space-y-4 ${isBrutalist ? "border-4 border-black shadow-[8px_8px_0px_#000]" : "border-[#e6e0d6] rounded-xl"}`}>
                
                {/* Search query interactive widget */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">Simulated Campus Archive Lookup</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Try searching 'Macbook' or 'wallet'..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-9 pr-3 py-1.5 text-xs text-black border outline-none bg-[#faf5ee]/60 rounded-md transition-all ${isBrutalist ? "border-2 border-black focus:bg-white" : "border-[#e6e0d6] focus:border-primary/80 focus:bg-white"}`}
                    />
                  </div>
                </div>

                {/* Items query listing */}
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {lostItems
                    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 border border-dashed border-gray-200 bg-gray-50 text-[11px] rounded-md">
                        <div>
                          <p className="font-extrabold text-gray-800 leading-tight">{item.name}</p>
                          <p className="text-[9px] text-[#887368]">{item.location} • {item.date}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-full ${item.resolved ? "bg-green-100 text-green-700" : "bg-[#ffe8e8] text-[#9b1c1c]"}`}>
                          {item.resolved ? "Claimed" : "Active Claim"}
                        </span>
                      </div>
                    ))}
                </div>

                {/* Simulated reporting submission forum */}
                <form onSubmit={handleAddLostItem} className="pt-3 border-t border-dashed border-gray-200 space-y-2">
                  <span className="text-[9px] font-black uppercase text-gray-500 block">Report Simulated Item</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Item Name (e.g., iPhone 15)"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="border text-[10px] px-2 py-1 bg-white rounded-md text-black outline-none border-gray-300 focus:border-purple-400"
                    />
                    <input
                      type="text"
                      placeholder="Misplaced Location"
                      value={newItemLocation}
                      onChange={(e) => setNewItemLocation(e.target.value)}
                      className="border text-[10px] px-2 py-1 bg-white rounded-md text-black outline-none border-gray-300 focus:border-purple-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#7c52aa] text-white font-extrabold text-[10px] uppercase py-1.5 rounded-lg active:translate-y-[1px] transition-all cursor-pointer text-center"
                  >
                    Post Reported Object (+ Adds to List)
                  </button>
                </form>

              </div>
            )}

            {/* CASE 3: STUDIO RENDERING DIAL (ReelForge) */}
            {project.mockupType === "studio" && (
              <div className="w-full max-w-md bg-black text-white p-5 border-2 border-slate-700 shadow-2xl space-y-4 rounded-xl">
                
                {/* Timeline display */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    <span className="text-[10px] font-mono tracking-widest text-[#0096cc] uppercase">Video render workbench</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">FPS: 60 / EST: 14s</span>
                </div>

                {/* Preset dials */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold uppercase text-slate-400">Cinematic Style Preset</span>
                    <span className="text-xs font-black text-[#0096cc]">{cinematicPreset}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["Cyberpunk Neon", "Cosmic Editorial", "80s Sepia"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setCinematicPreset(p)}
                        className={`py-1 text-[8px] font-bold border rounded-md uppercase transition-all ${cinematicPreset === p ? "border-[#0096cc] bg-[#0096cc]/20 text-white" : "border-slate-800 text-slate-400 hover:border-slate-650"}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adjusting parameter scale sliders */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-[9px] font-bold uppercase text-slate-400">
                    <span>AI Strength Filter</span>
                    <span>{filterStrength}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={filterStrength}
                    onChange={(e) => setFilterStrength(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0096cc]"
                  />
                </div>

                {/* Progress rendering mock indicators */}
                {isRendering ? (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-[9px] font-mono text-[#0096cc]">
                      <span className="animate-pulse">RENDERING SHADERS...</span>
                      <span>{renderProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0096cc] h-full rounded-full transition-all duration-100" style={{ width: `${renderProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={triggerRenderVideo}
                    className="w-full bg-[#0096cc] text-black font-black text-[11px] uppercase py-2.5 rounded-lg border-2 border-black hover:bg-cyan-400 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    Compile {cinematicPreset} Filter ({filterStrength}%)
                  </button>
                )}

              </div>
            )}

            {/* CASE 4: PARTICLE MATRIX (DepthForge) */}
            {project.mockupType === "canvas" && (
              <div className="w-full max-w-sm space-y-4">
                
                {/* Simulated physics canvas */}
                <div className={`relative bg-[#111] overflow-hidden flex items-center justify-center ${isBrutalist ? "border-4 border-black" : "border border-[#e6e0d6] rounded-xl"}`}>
                  <canvas
                    ref={canvasRef}
                    width={280}
                    height={220}
                    className="w-full h-[180px] object-cover bg-black"
                  />
                  <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-black/75 px-2 py-0.5 rounded text-[8px] font-mono text-green-400 border border-green-900">
                    <Sliders className="w-3 h-3" />
                    <span>WebGL Live Output</span>
                  </div>
                </div>

                {/* Adjusting parameter dials */}
                <div className={`p-4 bg-white border text-black space-y-3 ${isBrutalist ? "border-2 border-black" : "border-[#e6e0d6] rounded-xl"}`}>
                  <div className="flex justify-between text-[10px] font-extrabold uppercase text-[#201b14]">
                    <span>Orbital Wave Velocity</span>
                    <span>{particleSpeed} rad/s</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={particleSpeed}
                    onChange={(e) => setParticleSpeed(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 accent-yellow-500 cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] font-extrabold uppercase text-[#201b14]">
                    <span>Matrix Node Count</span>
                    <span>{particleDensity} Nodes</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    value={particleDensity}
                    onChange={(e) => setParticleDensity(Number(e.target.value))}
                    className="w-full h-1 bg-gray-200 accent-yellow-500 cursor-pointer"
                  />

                  <div className="flex justify-between items-center pt-1.5 border-t border-gray-100">
                    <span className="text-[10px] font-extrabold uppercase text-[#201b14]">Mesh Render Constraints</span>
                    <button
                      onClick={() => setWireframeMode(!wireframeMode)}
                      className={`px-3 py-1 text-[9px] font-extrabold uppercase rounded-lg border transition-all ${wireframeMode ? "bg-yellow-100 text-yellow-800 border-yellow-300" : "bg-gray-100 text-gray-500 border-gray-200 hover:border-gray-300"}`}
                    >
                      {wireframeMode ? "Wireframe Linked" : "Isolated Nodes"}
                    </button>
                  </div>
                </div>

              </div>
            )}

            <p className={`text-[10px] font-bold text-center mt-4 uppercase ${isBrutalist ? "text-purple-900" : "text-on-surface-variant/70"}`}>
              {isBrutalist ? "✦ Visualized in Neo-Brutalist Frame ✧" : "✦ Rendered in Editorial Sahara Framework ✧"}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}
