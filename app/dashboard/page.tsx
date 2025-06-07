'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';
import { ProjectCards, Project } from '@/components/ProjectCards';
import { ProjectTasksTimeline, Task } from '@/components/ProjectTasksTimeline';
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
  const [taskView, setTaskView] = useState<'technical' | 'non-technical'>('technical');

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

  // Mock tasks for demonstration
  const allTasks: Task[] = [
    {
      id: '1',
      title: 'Implement login page',
      description: 'Created a responsive login page with OAuth integration.',
      timestamp: new Date().toISOString(),
      developer: { name: 'Alice Smith', avatarUrl: '' },
      type: 'technical',
      project: 'kydev-frontend',
    },
    {
      id: '2',
      title: 'Fix API bug',
      description: 'Resolved issue with user authentication API.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      developer: { name: 'Bob Lee', avatarUrl: '' },
      type: 'technical',
      project: 'kydev-backend',
    },
    {
      id: '3',
      title: 'Sprint planning',
      description: 'Participated in sprint planning meeting.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
      developer: { name: 'Carol White', avatarUrl: '' },
      type: 'non-technical',
      project: 'kydev-frontend',
    },
    {
      id: '4',
      title: 'Release v1.2',
      description: 'Released new version of the mobile app.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
      developer: { name: 'David Kim', avatarUrl: '' },
      type: 'technical',
      project: 'mobile-app',
    },
    {
      id: '5',
      title: 'Client demo',
      description: 'Presented CRM features to client.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
      developer: { name: 'Eva Green', avatarUrl: '' },
      type: 'non-technical',
      project: 'crm-tool',
    },
    // Newer tasks for today
    {
      id: '6',
      title: 'Update dashboard UI',
      description: 'Refactored dashboard layout and improved responsiveness.',
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      developer: { name: 'Alice Smith', avatarUrl: '' },
      type: 'technical',
      project: 'kydev-frontend',
    },
    {
      id: '7',
      title: 'Write documentation',
      description: 'Added API usage documentation for new endpoints.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      developer: { name: 'Bob Lee', avatarUrl: '' },
      type: 'non-technical',
      project: 'kydev-backend',
    },
    // Tasks from 2 days ago
    {
      id: '8',
      title: 'Bug triage',
      description: 'Reviewed and prioritized open bugs.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      developer: { name: 'Carol White', avatarUrl: '' },
      type: 'non-technical',
      project: 'kydev-frontend',
    },
    {
      id: '9',
      title: 'Optimize queries',
      description: 'Improved database query performance.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString(),
      developer: { name: 'David Kim', avatarUrl: '' },
      type: 'technical',
      project: 'kydev-backend',
    },
    // Tasks from 4 days ago
    {
      id: '10',
      title: 'Design review',
      description: 'Reviewed new UI designs with the team.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      developer: { name: 'Eva Green', avatarUrl: '' },
      type: 'non-technical',
      project: 'kydev-frontend',
    },
    {
      id: '11',
      title: 'Integrate payment gateway',
      description: 'Integrated Stripe payment gateway for subscriptions.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 97).toISOString(),
      developer: { name: 'Bob Lee', avatarUrl: '' },
      type: 'technical',
      project: 'kydev-frontend',
    },
  ];

  const selectedProject = projects[selected]?.name;
  const filteredTasks = allTasks.filter(
    t => t.project === selectedProject && t.type === taskView
  );

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
        {/* Project tasks timeline */}
        <div className="flex-1 overflow-y-auto">
          <ProjectTasksTimeline
            tasks={filteredTasks}
            view={taskView}
            onViewChange={setTaskView}
            onJumpToDate={() => alert('Jump to a date clicked!')}
            onAddTask={() => alert('Add a task clicked!')}
            onEditTask={taskId => alert('Edit task: ' + taskId)}
          />
        </div>
        {/* Main dashboard content can go here */}
      </main>
    </div>
  );
}

export default Dashboard;
