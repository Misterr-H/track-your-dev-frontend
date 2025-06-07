'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';
import { ProjectCards, Project } from '@/components/ProjectCards';
import { Button } from '@/components/ui/button';
import { Bell, Pen, Smartphone, Box, Globe, Server } from 'lucide-react';

const projects: Project[] = [
  { name: 'kydev-frontend', category: 'Website' },
  { name: 'kydev-backend', category: 'Backend' },
  { name: 'mobile-app', category: 'Mobile App' },
  { name: 'crm-tool', category: 'CRM' },
];

function Dashboard() {
  const [selected, setSelected] = useState(0);
  const [shortcutLabel, setShortcutLabel] = useState('');
  const [isMac, setIsMac] = useState(false);

  // Detect platform for shortcut label
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const mac =
        navigator.platform.toLowerCase().includes('mac') ||
        navigator.userAgent.toLowerCase().includes('mac');
      setIsMac(mac);
      setShortcutLabel(mac ? '⌘ + P' : 'Ctrl + P');
    }
  }, []);

  // Keyboard navigation for project cards and Plan a sprint shortcut
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }
      // Project navigation
      if (e.key === 'ArrowLeft') {
        setSelected((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        setSelected((prev) => (prev < projects.length - 1 ? prev + 1 : prev));
      }
      // Plan a sprint shortcut
      if ((isMac && e.metaKey && e.key.toLowerCase() === 'p') || (!isMac && e.ctrlKey && e.key.toLowerCase() === 'p')) {
        e.preventDefault();
        handlePlanSprintShortcut();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMac]);

  function handlePlanSprintShortcut() {
    // TODO: Open your Plan a sprint modal or trigger your mechanism here
    alert('Plan a sprint shortcut triggered!');
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-[#101011] text-white p-0 flex flex-col">
        {/* Mini bar */}
        <div className="flex justify-end items-center h-16 px-8 border-b border-neutral-800">
          <Button variant="ghost" size="icon" className="text-white mr-2">
            <Bell className="w-5 h-5" />
          </Button>
          <Button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md bg-neutral-800"
            onClick={handlePlanSprintShortcut}
          >
            <Pen className="w-4 h-4" />
            <span className="font-medium text-sm">Plan a sprint</span>
            {shortcutLabel && (
              <span className="ml-2 text-xs text-neutral-400 border border-neutral-700 rounded px-2 py-0.5">{shortcutLabel}</span>
            )}
          </Button>
        </div>
        {/* Project cards row */}
        <ProjectCards projects={projects} selected={selected} setSelected={setSelected} />
        {/* Main dashboard content can go here */}
        <div className="flex-1 px-8 py-4">
          {/* Dashboard content placeholder */}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
