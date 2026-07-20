/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Experience, Achievement } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "happenhub",
    title: "HappenHub",
    description: "Vibrant mobile-first platform reimagining how local communities discover and book niche events. Focused on seamless interaction design.",
    extendedDescription: "HappenHub answers the challenge of finding specific, highly dynamic local niche arts, food, and underground music events. The visual design prioritizes ultra-bold, tactile card sliders, micro-interactions upon ticket purchases, and a solid modular structure connecting Spring Boot APIs with a highly reactive React client build.",
    tags: ["React", "Spring Boot"],
    category: "Selected Portfolio",
    imageUrl: "/assets/project_happenhub.png",
    primaryColor: "#e040a0",
    accentClass: "bg-primary text-white border-2 border-black",
    role: "Lead UI Developer & UX Designer",
    timeline: "Jan 2026 - May 2026",
    deliverables: ["High-Fidelity Mobile Prototypes", "Dynamic List Filtering UI", "Responsive Web App Core", "JSON Client Handshake docs"],
    mockupType: "phone"
  },
  {
    id: "lostfound",
    title: "Lost & Found",
    description: "Enterprise-grade campus dashboard for asset management and tracking with focus on clean hierarchy.",
    extendedDescription: "Lost & Found reorganizes institutional tracking for misplaced high-value student items like electronics, keycards, and documents. Built with deep structural hierarchy, it streamlines campus security workflows through instant verification cards, matching notifications, and visual proof of ownership.",
    tags: ["Spring Boot", "Tailwind CSS"],
    category: "Asset Management",
    imageUrl: "/assets/project_lostfound.png",
    primaryColor: "#7c52aa",
    accentClass: "bg-secondary text-white border-md",
    role: "Fullstack Architect",
    timeline: "Nov 2025 - Dec 2025",
    deliverables: ["Relational Database Schemas", "Verification Claim Flow UI", "Notification WebSockets", "Campus Deployment Blueprint"],
    mockupType: "dashboard"
  },
  {
    id: "reelforge",
    title: "ReelForge",
    description: "AI-Powered video studio aesthetic with neon gradients and cinematic presets in a structured UI.",
    extendedDescription: "ReelForge is a futuristic workstation design that integrates AI video generation workflows. The visual theme utilizes high-contrast pitch-black blocks combined with striking fluorescent laser guides, housing granular toggle sliders, rendering speed meters, and a rich library of prebuilt visual styles.",
    tags: ["Next.js", "AI Integration"],
    category: "AI Production Tool",
    imageUrl: "/assets/project_reelforge.png",
    primaryColor: "#0096cc",
    accentClass: "bg-tertiary text-black border-2",
    role: "Solo Creator (Concept & Code)",
    timeline: "May 2026 - June 2026",
    deliverables: ["Fluid Glassmorphic UI Panels", "Prompt to Filter Shader Logic", "Async Video Rendering Queues", "Asset Library Grid View"],
    mockupType: "studio"
  },
  {
    id: "depthforge",
    title: "DepthForge",
    description: "Immersive interface for 3D interactive graphics and real-time motion controls. Exploring the boundaries of web experiences.",
    extendedDescription: "A massive graphical sandbox that renders structural mathematical matrix vectors inside 3D canvases. DepthForge allows non-developers to edit WebGL parameters (such as particle scale, rotation velocities, noise wave amplitudes, and light values) through highly polished physical sliders and real-time canvas transformations.",
    tags: ["Three.js", "WebGL"],
    category: "Interactive Web3D",
    imageUrl: "/assets/project_depthforge.png",
    primaryColor: "#ffcc00",
    accentClass: "bg-yellow-400 text-black border-2 border-black",
    role: "WebGL & Motion Engineer",
    timeline: "March 2026 - April 2026",
    deliverables: ["Custom Vertex & Fragment Shaders", "Device Inertia Motion Maps", "Orbit controls integration", "Real-Time Framerate Optimizer"],
    mockupType: "canvas"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "studique",
    role: "Design Lead",
    company: "Studique",
    duration: "Jun 2025 - Present",
    bullets: [
      "Spearheading comprehensive product design strategy for a campus student network connecting thousands.",
      "Designing, testing, and maintaining a scalable modular design system with responsive layouts for web & mobile.",
      "Fostering atomic design methodologies enabling 40% faster frontend component deployment."
    ],
    colorClass: "bg-primary"
  },
  {
    id: "codingsamurai",
    role: "UI/UX Design Intern",
    company: "Coding Samurai",
    duration: "Jun 2025 - Jul 2025",
    bullets: [
      "Designed and delivered interactive high-fidelity user flows and prototypes for high-traffic client portals.",
      "Collaborated intimately with senior frontend developers to inspect pixel layouts, guaranteeing perfect style fidelity.",
      "Audited legacy registration flows, boosting signup completion by 18%."
    ],
    colorClass: "bg-secondary"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "sih",
    title: "SIH Top 50",
    subtitle: "Smart India Hackathon",
    icon: "military_tech",
    hoverBg: "hover:bg-pink-500 hover:text-white"
  },
  {
    id: "nptel",
    title: "Elite+Silver",
    subtitle: "NPTEL Cert",
    icon: "workspace_premium",
    hoverBg: "hover:bg-purple-600 hover:text-white"
  },
  {
    id: "reuse",
    title: "2nd Prize",
    subtitle: "Reuse & Remodel",
    icon: "trophy",
    hoverBg: "hover:bg-cyan-500 hover:text-black"
  },
  {
    id: "devtrails",
    title: "DEVTrails",
    subtitle: "Guidewire Participated",
    icon: "terminal",
    hoverBg: "hover:bg-yellow-400 hover:text-black"
  },
  {
    id: "sebi",
    title: "SEBI Award",
    subtitle: "Investor Awareness Certified",
    icon: "finance",
    hoverBg: "hover:bg-orange-500 hover:text-white"
  }
];

export const SKILLS_LIST = [
  { name: "Figma", category: "design", progress: 95 },
  { name: "Adobe Express", category: "design", progress: 94 },
  { name: "Canva", category: "design", progress: 95 },
  { name: "Prototyping", category: "design", progress: 90 },
  { name: "Wireframing", category: "design", progress: 92 },
  { name: "HTML/CSS/JS", category: "frontend", progress: 95 },
  { name: "React / React Native", category: "frontend", progress: 88 },
  { name: "Git/GitHub", category: "tools", progress: 90 },
  { name: "Three.js & WebGL", category: "frontend", progress: 75 },
  { name: "User Research & Flow Mapping", category: "design", progress: 85 },
  { name: "C", category: "Programming Language", progress: 95 },
  { name: "C++", category: "Programming Language", progress: 97 },
  { name: "Java", category: "Programming Language", progress: 85 },
  { name: "Python", category: "Programming Language", progress: 70 }
];
