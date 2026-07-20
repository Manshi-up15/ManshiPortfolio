/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Project, VisualTheme, ContactSubmission } from "./types";
import { PROJECTS, EXPERIENCES, ACHIEVEMENTS, SKILLS_LIST } from "./data";
import ThemeSwitcher from "./components/ThemeSwitcher";
import AIChatBot from "./components/AIChatBot";
import ProjectDetailModal from "./components/ProjectDetailModal";
import { 
  Briefcase, 
  Award, 
  FileText, 
  Mail, 
  ArrowRight, 
  Send, 
  Sparkles, 
  Github, 
  ChevronRight,
  Download,
  Terminal,
  Heart,
  Grid
} from "lucide-react";

export default function App() {
  const [activeTheme, setActiveTheme] = useState<VisualTheme>("brutalist");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("All");

  // Contact State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  // Page Scroll Progress Tracker
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollPercent((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load submissions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("manshi_portfolio_submissions");
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Local storage lookup failed:", err);
    }
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: ContactSubmission = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toLocaleString(),
      };
      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      try {
        localStorage.setItem("manshi_portfolio_submissions", JSON.stringify(updated));
      } catch (err) {
        console.error("Local storage save issue:", err);
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success status after 6 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 6000);
    }, 1000);
  };

  const currentCategories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  const filteredProjects = selectedCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const filteredSkills = selectedSkillCategory === "All"
    ? SKILLS_LIST
    : SKILLS_LIST.filter((s) => s.category === selectedSkillCategory);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Theme checking helpers
  const isBrutalist = activeTheme === "brutalist";
  
  // Theme layout styling variables
  const bgClass = isBrutalist 
    ? "bg-[#faf5ee] text-black font-space selection:bg-[#e040a0]/35" 
    : "bg-[#fffcf9] text-gray-900 font-manrope selection:bg-primary/20";
  
  const cardBorderClass = isBrutalist 
    ? "border-4 border-black shadow-[6px_6px_0px_#000]" 
    : "border border-[#e6e0d6] shadow-xs";

  const mainHeaderFont = isBrutalist 
    ? "font-space font-black tracking-tight uppercase" 
    : "font-garamond tracking-wide font-normal";

  const accentColorText = isBrutalist ? "text-[#e040a0]" : "text-primary";
  const btnGenericCls = isBrutalist 
    ? "brutalist-button px-5 py-2 font-black uppercase text-xs tracking-tight"
    : "btn-sahara bg-[#964407] hover:bg-[#7b3604] text-white px-5 py-2 text-xs font-semibold tracking-wider transition-colors shadow-sm";

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-out flex flex-col relative overflow-x-hidden ${bgClass}`} id="manshi-app-root">
      
      {/* Scroll indicator strip */}
      <div 
        className={`fixed top-0 left-0 h-1.5 z-50 transition-all duration-100 ${isBrutalist ? "bg-[#e040a0]" : "bg-[#964407]"}`}
        style={{ width: `${scrollPercent}%` }}
        id="scroll-progress-line"
      />

      {/* Hero ambient texture backgrounds */}
      {isBrutalist && (
        <div className="absolute inset-0 grid-texture pointer-events-none opacity-[0.04]" />
      )}

      {/* TOP HEADER NAVIGATION */}
      <header 
        className={`sticky top-0 z-30 transition-all ${
          isBrutalist 
            ? "bg-[#faf5ee]/95 border-b-4 border-black" 
            : "bg-[#fffcf9]/90 border-b border-[#e6e0d6]/70 backdrop-blur-md"
        }`}
        id="navigation-banner"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Brand */}
          <a href="#manshi-app-root" className="flex items-center gap-2 group" id="logo-badge">
            <span className={`text-xl lg:text-2xl font-black uppercase tracking-tighter ${isBrutalist ? "bg-black text-white px-3 py-1 font-space [transform:rotate(-1deg)]" : "font-garamond italic text-[#2d2216]"}`}>
              Manshi
            </span>
            <span className={`w-2 h-2 rounded-full animate-pulse ${isBrutalist ? "bg-[#e040a0]" : "bg-primary"}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest hidden md:inline ${isBrutalist ? "text-purple-600 font-space" : "text-gray-500 font-manrope"}`}>
              UI/UX • DEV
            </span>
          </a>

          {/* Quick links routes */}
          <nav className="flex items-center gap-5 md:gap-7" id="navbar-links">
            <a 
              href="#projects-arena" 
              className={`text-xs uppercase font-extrabold tracking-wider transition-colors ${isBrutalist ? "hover:text-[#e040a0] font-space" : "hover:text-primary text-gray-600"}`}
            >
              Selected Work
            </a>
            <a 
              href="#career-milestones" 
              className={`text-xs uppercase font-extrabold tracking-wider transition-colors ${isBrutalist ? "hover:text-[#e040a0] font-space" : "hover:text-primary text-gray-600"}`}
            >
              Timeline
            </a>
            <a 
              href="#skillset-dashboard" 
              className={`text-xs uppercase font-extrabold tracking-wider transition-colors ${isBrutalist ? "hover:text-[#e040a0] font-space" : "hover:text-primary text-gray-600"}`}
            >
              Skillboard
            </a>
            <a 
              href="#contact-console" 
              className={`text-xs uppercase font-extrabold tracking-wider transition-colors ${isBrutalist ? "hover:text-[#e040a0] font-space" : "hover:text-primary text-gray-600"}`}
            >
              Connect
            </a>
          </nav>

          {/* Theme Dynamic Controller Switch */}
          <div id="styles-toggle-box">
            <ThemeSwitcher activeTheme={activeTheme} onThemeChange={setActiveTheme} />
          </div>

        </div>
      </header>

      {/* CORE HERO SECTION */}
      <section 
        className={`max-w-6xl mx-auto px-4 md:px-8 pt-10 pb-16 md:pt-16 md:pb-24 grid lg:grid-cols-12 gap-8 md:gap-12 items-center`}
        id="hero-board"
      >
        
        {/* Hero Left Content Column */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8" id="hero-statement">
          
          <div className="space-y-3">
            {/* Upper custom chip label */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#e6e0d6] bg-[#f9f3ef] rounded-full text-[10px] font-black uppercase text-gray-500 tracking-widest leading-none">
              <Sparkles className="w-3 h-3 text-orange-500" />
              <span>UI/UX Designer &amp; Frontend Engineer</span>
            </div>

            {/* Headline elements */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] ${isBrutalist ? "font-space text-black" : "font-garamond text-[#201b14]"}`}>
              {isBrutalist ? (
                <>
                  Designing <br />
                  <span className="bg-black text-yellow-400 px-3 py-1 inline-block rotate-1 my-1">Intuitive</span> <br />
                  Digital Experiences.
                </>
              ) : (
                <>
                  Designing <span className="font-garamond italic text-primary">Intuitive</span> <br />
                  Digital Experiences.
                </>
              )}
            </h1>
          </div>

          <p className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-xl ${isBrutalist ? "font-inter font-semibold text-black" : "font-manrope text-[#554339]/95 font-light"}`}>
            Computer Science student focused on building user-centric products through beautiful hierarchy, frontend engineering, and interactive web mockups.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="#projects-arena" 
              className={btnGenericCls}
            >
              Explore Portfolio
            </a>
            
            {/* Secondary CTA to download mock resume pdf */}
            <a 
              href="#career-milestones"
              className={`flex items-center gap-1.5 px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                isBrutalist
                  ? "bg-white border-2 border-black text-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px]"
                  : "bg-transparent text-gray-600 border-[#e6e0d6] rounded-md hover:border-primary hover:text-primary"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Career Context</span>
            </a>
          </div>

          {/* Rapid numbers ribbon */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/50 max-w-md">
            <div>
              <span className={`text-2xl sm:text-3xl font-black block ${accentColorText}`}>2+</span>
              <span className="text-[10px] uppercase font-black tracking-wider text-gray-500">Roles Held</span>
            </div>
            <div>
              <span className={`text-2xl sm:text-3xl font-black block ${accentColorText}`}>4+</span>
              <span className="text-[10px] uppercase font-black tracking-wider text-gray-500">Featured Builds</span>
            </div>
            <div>
              <span className={`text-2xl sm:text-3xl font-black block ${accentColorText}`}>5+</span>
              <span className="text-[10px] uppercase font-black tracking-wider text-gray-500">Certifications</span>
            </div>
          </div>

        </div>

        {/* Hero Right Media Gallery Frame (Manshi Profile Photo) */}
        <div className="lg:col-span-5 flex justify-center py-6" id="hero-graphic-avatar">
          <div className="relative">
            <div className={`overflow-hidden aspect-square w-[280px] sm:w-[320px] bg-sky-200 ${
              isBrutalist 
                ? "border-4 border-black rounded-none shadow-[12px_12px_0px_#000000]" 
                : "rounded-2xl shadow-xl shadow-[#bd8868]/10 border border-[#e6e0d6]"
            }`}>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJIjvHvQYGEPplsfXu3oy2XouNtDIWUbwcInP5cpp1Eo1VuGTO9EkpL6xcqxKXicQ4lpQf1p7In17IRPiBsGC22_nJWjV8cf1EQFAk6wbkFBbzyL6kCHo7MBBwM7x04Z4AyXRNyeBUb7EtJwUnqP5FOQU_rYDx97ybi-3KxSr8ixTDySyeB2809thgx3bUueEnw_IEqnYTHc9ei1NfI38w8Di3sG_bSfRvMuIb5b1u0gDd2yEzZnx4Cj7iVzrp8yxXfbEmWefkAwbE4Mg" 
                alt="Manshi Saini Portrait Photo"
                className="w-full h-full object-cover grayscale brightness-105 contrast-95 hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Little floating text capsule */}
            <div className={`absolute -bottom-4 -right-4 px-4 py-2 ${
              isBrutalist 
                ? "bg-[#ff3b30] text-white border-2 border-black tracking-tight" 
                : "bg-[#fef1e7] text-primary border border-secondary/15 rounded-lg shadow-md"
            }`}>
              <span className="text-xs font-black uppercase tracking-wider block">Based in India</span>
              <span className="text-[9px] font-mono opacity-80 block uppercase leading-tight">Eng with a design soul</span>
            </div>

            {/* Graphic ornament (Brutalist flower canvas or sienna circle) */}
            <div className={`absolute -top-6 -left-6 w-12 h-12 flex items-center justify-center rounded-full border border-black/10 ${
              isBrutalist ? "bg-purple-400 [transform:rotate(12deg)] text-black" : "bg-orange-100 text-[#964407]"
            }`}>
              <Heart className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>

      </section>

      {/* SECTION: SELECTED WORKS / PROJECTS PREVIEW GRID */}
      <section 
        className={`bg-white/40 border-y ${isBrutalist ? "border-black py-12 bg-white/20" : "border-[#e6e0d6] py-16"}`}
        id="projects-arena"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-8">
          
          {/* Section titles */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className={`text-[10px] font-extrabold uppercase tracking-widest block ${accentColorText}`}>Selected Portfolio</span>
              <h2 className={`text-3xl md:text-4xl ${mainHeaderFont}`}>Interactive Creations</h2>
            </div>

            {/* Project Categories Filter Bar */}
            <div className="flex flex-wrap gap-2" id="projects-cat-filters">
              {currentCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase transition-all rounded-md cursor-pointer ${
                    selectedCategory === cat
                      ? isBrutalist
                        ? "bg-black text-white border-2 border-black shadow-[2px_2px_0px_#e040a0]"
                        : "bg-[#964407] text-white"
                      : isBrutalist
                      ? "bg-white text-black border-2 border-black hover:bg-gray-100"
                      : "bg-[#fffcf9]/70 text-gray-600 hover:bg-[#fffcf9] hover:text-black border border-[#e6e0d6]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Actual items cards mapping */}
          <div className="grid md:grid-cols-2 gap-6" id="works-grid-box">
            {filteredProjects.map((p) => {
              const hoverBgc = isBrutalist ? p.primaryColor : "#fef1e7";
              return (
                <div 
                  key={p.id}
                  onClick={() => openProjectDetails(p)}
                  className={`group relative overflow-hidden flex flex-col justify-between cursor-pointer ${cardBorderClass} ${
                    isBrutalist 
                      ? "bg-white p-5 hover:translate-y-[-4px]" 
                      : "project-card bg-white p-6"
                  }`}
                  id={`project-card-${p.id}`}
                >
                  {/* Photo container with zoom effect */}
                  <div className={`overflow-hidden w-full aspect-video ${isBrutalist ? "border-2 border-black" : "rounded-lg"}`}>
                    <img 
                      src={p.imageUrl} 
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Card text fields */}
                  <div className="pt-4 flex-grow space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${accentColorText}`}>
                        {p.category}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1.5 transition-transform" />
                    </div>

                    <h3 className={`text-xl font-bold uppercase ${isBrutalist ? "font-space text-black" : "font-garamond text-[#201b14] leading-tight"}`}>
                      {p.title}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${isBrutalist ? "text-gray-700" : "text-gray-500 font-manrope font-light"}`}>
                      {p.description}
                    </p>
                  </div>

                  {/* Skills tags list on footer card */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-dotted border-gray-200 mt-4">
                    {p.tags.map((tag, i) => (
                      <span key={i} className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${isBrutalist ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-600"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Button Overlay Banner */}
                  <div className={`absolute bottom-4 right-4 bg-black text-white py-1 px-3 border border-gray-800 text-[10px] font-black uppercase tracking-widest opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all ${
                    isBrutalist ? "shadow-[2px_2px_0px_#e040a0]" : "rounded-md"
                  }`}>
                    Interactive Demo &amp; Case Study ✦
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION: CAREER PATH & EXPERIENCE TIMELINE */}
      <section 
        className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24"
        id="career-milestones"
      >
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Timeline Left Intro Title */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className={`text-[10px] font-extrabold uppercase tracking-widest block ${accentColorText}`}>Chronological Path</span>
              <h2 className={`text-3xl md:text-4xl ${mainHeaderFont}`}>My Career Milestones</h2>
            </div>
            
            <p className={`text-sm leading-relaxed ${isBrutalist ? "text-black font-medium" : "text-gray-500 font-light"}`}>
              I maintain a highly modular approach to my work, treating digital product pipelines as an intimate balance of administrative checklists, research diagnostics, and styling.
            </p>

            <div className={`p-5 space-y-3 ${isBrutalist ? "bg-[#faf5ee] border-2 border-black" : "bg-[#fef1e7] rounded-xl border border-secondary/10"}`}>
              <div className="flex items-center gap-2">
                <Briefcase className={`w-5 h-5 ${accentColorText}`} />
                <span className="text-xs font-black uppercase tracking-widest">Active Objectives</span>
              </div>
              <p className="text-xs leading-relaxed text-gray-700">
                Searching for summer and winter UI/UX Designer / Frontend developer remote placements where I can expand my interactive web design and Figma wireframing expertise.
              </p>
            </div>
          </div>

          {/* Timeline Right Path Elements */}
          <div className="lg:col-span-7 space-y-8 relative pl-2 md:pl-6" id="milestones-path-box">
            
            {/* Draw a connecting timeline line in background */}
            <div className={`absolute left-4 top-2 bottom-2 w-0.5 z-10 ${isBrutalist ? "bg-black" : "bg-[#e6e0d6]"}`} />

            {EXPERIENCES.map((exp, idx) => (
              <div 
                key={exp.id} 
                className={`relative pl-8 md:pl-12 group transition-all duration-300 hover:translate-x-1`}
                id={`timeline-node-${exp.id}`}
              >
                {/* Visual Circle Marker indicator */}
                <div className={`absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full z-20 border-2 border-white transition-all transform group-hover:scale-125 ${
                  isBrutalist 
                    ? idx === 0 ? "bg-[#e040a0]" : "bg-[#7c52aa]"
                    : idx === 0 ? "bg-[#964407]" : "bg-[#c2652a]"
                }`} />

                {/* Main Content card */}
                <div className={`bg-white p-5 md:p-6 transition-all ${cardBorderClass}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-150 pb-3 mb-4">
                    <div>
                      <h3 className={`text-lg font-bold uppercase leading-tight ${isBrutalist ? "font-space text-black" : "text-gray-900"}`}>
                        {exp.role}
                      </h3>
                      <p className={`text-xs font-semibold ${isBrutalist ? "text-purple-700" : "text-[#c2652a]"}`}>
                        💡 {exp.company}
                      </p>
                    </div>

                    <span className={`px-2.5 py-1 text-[9px] font-mono uppercase font-semibold leading-none self-start ${isBrutalist ? "bg-black text-white" : "bg-primary/10 text-primary border border-primary/20 rounded"}`}>
                      {exp.duration}
                    </span>
                  </div>

                  {/* Bullets mapping */}
                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2 text-xs md:text-sm text-gray-700 leading-relaxed font-light">
                        <span className={`text-[#e040a0] font-black shrink-0 ${isBrutalist ? "" : "text-primary font-bold"}`}>•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* SECTION: INTERACTIVE SELF-EVALUATION SKILLBOARD */}
      <section 
        className={`bg-white/40 border-y ${isBrutalist ? "border-black py-16 bg-white/20" : "border-[#e6e0d6] py-20"}`}
        id="skillset-dashboard"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className={`text-[10px] font-extrabold uppercase tracking-widest block ${accentColorText}`}>Skillboard Checklist</span>
              <h2 className={`text-3xl md:text-4xl ${mainHeaderFont}`}>Skill Proficiency</h2>
              <p className="text-xs text-gray-500 max-w-md">
                Explore my self-assessed tool stacks, development experience, and programming proficiency rankings.
              </p>
            </div>

            {/* Core category selector */}
            <div className="flex flex-wrap gap-2" id="skills-cat-selectors">
              {["All", "design", "frontend", "tools", "Programming Language"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSkillCategory(cat)}
                  className={`px-3 py-1 text-[10px] uppercase font-black tracking-widest border transition-all ${
                    selectedSkillCategory === cat
                      ? isBrutalist
                        ? "bg-black text-white border-black"
                        : "bg-[#964407] text-white border-primary"
                      : isBrutalist
                      ? "bg-white text-black border-black hover:bg-gray-100"
                      : "bg-[#fffcf9] text-gray-650 border-[#e6e0d6] hover:bg-white rounded-md"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Map Skills Items */}
          <div className="grid sm:grid-cols-2 gap-6" id="skills-grid-arena">
            {filteredSkills.map((s, idx) => (
              <div 
                key={s.name}
                className={`p-4 bg-white border ${cardBorderClass} space-y-3 relative overflow-hidden`}
                id={`skill-card-${idx}`}
              >
                
                {/* Label header */}
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-black uppercase ${isBrutalist ? "font-space" : "text-gray-800"}`}>
                    {s.name}
                  </span>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 ${isBrutalist ? "bg-black text-yellow-300" : "text-primary"}`}>
                    {s.progress}%
                  </span>
                </div>

                {/* Progress bar visual container */}
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      isBrutalist 
                        ? s.progress >= 90 ? "bg-[#e040a0]" : "bg-[#7c52aa]"
                        : "bg-primary"
                    }`}
                    style={{ width: `${s.progress}%` }}
                  />
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: RECOGNITIONS AND CERTS */}
      <section 
        className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24"
        id="certifications-achievements"
      >
        <div className="space-y-10">
          
          <div className="text-center space-y-2">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest block ${accentColorText}`}>Academic Triumphs</span>
            <h2 className={`text-3xl md:text-4xl ${mainHeaderFont}`}>Honors &amp; Accomplishments</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" id="recognitions-deck">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className={`p-5 text-center flex flex-col items-center justify-between transition-all duration-300 cursor-default ${cardBorderClass} ${ach.hoverBg} ${
                  isBrutalist 
                    ? "bg-white hover:scale-102 hover:-translate-y-1" 
                    : "bg-[#fffcf9]/70 hover:bg-white hover:-translate-y-1"
                }`}
                id={`achievement-card-${ach.id}`}
              >
                <div className="space-y-4">
                  {/* Icon rendered as Google Material Font */}
                  <span className={`material-symbols-outlined text-4xl block ${isBrutalist ? "text-black" : "text-primary"}`}>
                    {ach.icon}
                  </span>

                  <div>
                    <h4 className={`text-base font-extrabold uppercase leading-tight ${isBrutalist ? "font-space" : ""}`}>
                      {ach.title}
                    </h4>
                    <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">
                      {ach.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-[8px] tracking-widest font-mono uppercase mt-4">Verified cert ✓</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION WRAPPER: THE CONTACT CONSOLE SUBMISSIONS PANEL */}
      <section 
        className={`bg-white/40 border-t ${isBrutalist ? "border-black pt-16 pb-20 bg-white/20" : "border-[#e6e0d6] pt-20 pb-24"}`}
        id="contact-console"
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest block ${accentColorText}`}>Get in Touch</span>
            <h2 className={`text-3xl md:text-4xl ${mainHeaderFont}`}>Secure Messaging Console</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Send a design prompt, consulting request, or recruitment ticket. Submissions will preserve on your browser context immediately!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* Left form slot */}
            <div className={`p-6 bg-white border ${cardBorderClass}`} id="contact-form-block">
              
              <h3 className={`text-lg font-black uppercase mb-4 ${isBrutalist ? "font-space text-black" : "text-gray-900"}`}>
                Transmit Message
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-gray-500">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border text-black outline-none transition-all ${
                      isBrutalist ? "border-2 border-black focus:bg-pink-100/10" : "border-[#e6e0d6] rounded-md focus:border-primary focus:bg-white"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-gray-500">Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border text-black outline-none transition-all ${
                      isBrutalist ? "border-2 border-black focus:bg-pink-100/10" : "border-[#e6e0d6] rounded-md focus:border-primary focus:bg-white"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase text-gray-500">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Type your design requirements or quick greetings..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border text-all-black outline-none transition-all ${
                      isBrutalist ? "border-2 border-black focus:bg-pink-100/10" : "border-[#e6e0d6] rounded-md focus:border-primary focus:bg-white"
                    }`}
                  />
                </div>

                {submitSuccess && (
                  <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded text-xs space-y-1 my-2 animate-pulse rounded-md">
                    <p className="font-extrabold uppercase">✓ Submission Transmitted!</p>
                    <p className="font-light">Thank you, your simulated message was saved! Manshi welcomes connection inquiries.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-black text-center text-xs uppercase py-3 flex items-center justify-center gap-2 cursor-pointer ${
                    isBrutalist 
                      ? "brutalist-button-primary border-4 border-black font-space text-white" 
                      : "bg-[#964407] hover:bg-[#7b3604] text-white rounded-md shadow-md text-xs font-semibold py-2.5"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE PACKET"}</span>
                </button>
              </form>

            </div>

            {/* Right log queue */}
            <div className="space-y-4" id="recent-submissions-block">
              <h3 className={`text-sm font-black uppercase tracking-widest text-gray-500 ${isBrutalist ? "font-space" : ""}`}>
                Client Console Logs ({submissions.length})
              </h3>

              {submissions.length === 0 ? (
                <div className={`p-6 text-center border-2 border-dashed ${isBrutalist ? "border-black" : "border-gray-200 bg-white/20 rounded-xl"}`}>
                  <p className="text-xs text-gray-400 font-light">
                    No logs recorded. Form inputs submit real-time updates directly into browser local state memory.
                  </p>
                </div>
              ) : (
                <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2 border-l border-zinc-200 pl-4">
                  {submissions.map((sub, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 bg-white border ${cardBorderClass}`}
                      id={`submission-item-${idx}`}
                    >
                      <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400">
                        <span>Sender: {sub.name}</span>
                        <span>{sub.timestamp}</span>
                      </div>
                      <p className="text-xs mt-2 font-extrabold text-gray-800">{sub.email}</p>
                      <p className="text-xs text-gray-600 mt-1 italic leading-relaxed">
                        &ldquo;{sub.message}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className={`p-4 text-center ${isBrutalist ? "bg-purple-100 text-purple-900 font-semibold" : "bg-[#fef1e7] text-primary rounded-xl"} text-xs leading-relaxed`}>
                <p>🙋 <strong>Need a direct response immediately?</strong></p>
                <p className="mt-1 font-light">Email Manshi directly at <a href="mailto:sainimanshi93@gmail.com" className="underline font-bold">sainimanshi93@gmail.com</a></p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* PERSISTENT FOOTER LAYOUT */}
      <footer 
        className={`mt-auto py-12 ${
          isBrutalist 
            ? "bg-black text-[#faf5ee] border-t-4 border-black" 
            : "bg-[#201b14] text-[#fffcf9]/70 border-t border-secondary/10"
        }`}
        id="app-footer"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center justify-between">
          
          <div className="space-y-4">
            <span className={`text-lg md:text-xl font-bold uppercase tracking-tight ${isBrutalist ? "font-space text-yellow-300" : "text-white font-garamond italic"}`}>
              Manshi
            </span>
            <p className="text-xs max-w-sm font-light">
              Fusing human computer engineering principles with artistic digital rhythm. Bridging product layout, user interactions, and clean structure.
            </p>
          </div>

          <div className="space-y-6 md:text-right">
            <div className="flex justify-start md:justify-end gap-4" id="footer-buttons">
              <a 
                href="mailto:sainimanshi93@gmail.com"
                className={`p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center justify-center`}
                title="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className={`p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center justify-center`}
                title="Explore custom code"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            <div className="text-[10px] uppercase font-mono tracking-widest space-y-1">
              <p>© 2026 Manshi • All Rights Reserved</p>
              <p className="opacity-80">
                {isBrutalist ? "✦ Created with Bauhaus Neo-Brutalist Precision ✦" : "✦ Crafted with Sahara Editorial Warmth ✦"}
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* PORTFOLIO ACTIVE PROTOTYPE DETAIL EXPLORER MODAL */}
      {isModalOpen && selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          activeTheme={activeTheme}
        />
      )}

      {/* FLOAT INTELLIGENT CAREER COMPANION ROBOT */}
      <AIChatBot activeTheme={activeTheme} />

    </div>
  );
}
