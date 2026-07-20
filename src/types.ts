/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VisualTheme = "editorial" | "brutalist";

export interface Project {
  id: string;
  title: string;
  description: string;
  extendedDescription: string;
  tags: string[];
  category: string;
  imageUrl: string;
  primaryColor: string;
  accentClass: string;
  role: string;
  timeline: string;
  deliverables: string[];
  mockupType: "phone" | "dashboard" | "studio" | "canvas";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  bullets: string[];
  colorClass: string;
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  hoverBg: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
