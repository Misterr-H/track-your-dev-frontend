'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/sidebar';
import { ProjectCards, Project } from '@/components/ProjectCards';
import { ProjectTasksTimeline, Task } from '@/components/ProjectTasksTimeline';
import { Button } from '@/components/ui/button';
import { Bell, Pen } from 'lucide-react';
import { PlanSprintModal } from '@/components/PlanSprintModal';
import { useOrgsAndRepos } from '@/services/queries';
import { AppStore, setSelectedOrg } from '@/lib/store';
import { useStoreState } from 'pullstate';
import { fetchTasks } from '@/services/apis/dashboardApis';
import { isProjectTasksEnabled, toggleProjectTasks } from '@/lib/projectPreferences';
import { Commit, CommitTask } from '@/types/dashboard';

function Dashboard() {
  const { data, isLoading } = useOrgsAndRepos();
  const [selected, setSelected] = useState(0);
  const [shortcutLabel, setShortcutLabel] = useState('');
  const [isMac, setIsMac] = useState(false);
  const [taskView, setTaskView] = useState<'technical' | 'non-technical'>('technical');
  const [isPlanSprintOpen, setIsPlanSprintOpen] = useState(false);
  const selectedOrg = useStoreState(AppStore, s => s.selectedOrg);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  // Convert repositories to projects based on selected organization
  const projects: Project[] = React.useMemo(() => {
    if (!data?.data?.results) return [];
    
    const orgData = data.data.results.find(result => result.organization.name === selectedOrg);
    if (!orgData?.repositories) return [];
    
    return orgData.repositories.map(repo => ({
      name: repo.name,
      category: '' // Leaving category blank as requested
    }));
  }, [data, selectedOrg]);

  const selectedProject = projects[selected]?.name;
  const isTasksEnabled = selectedProject ? isProjectTasksEnabled(selectedOrg, selectedProject) : false;

  // Filter tasks based on the current view
  const filteredTasks = tasks.filter(task => task.type === taskView);

  const loadTasks = useCallback(async (page: number) => {
    if (!selectedProject || !isTasksEnabled) return;
    
    setIsLoadingTasks(true);
    try {
      const response = await fetchTasks(selectedOrg, selectedProject, {
        page,
        pageSize: 5
      });
      
      const newTasks = response.data.commits.flatMap((commit: Commit) => {
        const tasks = commit.tasks;
        const technicalTasks = tasks.technicalTasks;
        const nonTechnicalTasks = tasks.nonTechnicalTasks;

        return [
          ...technicalTasks.map((task: CommitTask) => ({
            id: `${commit._id}-technical-${task.title}`,
            title: task.title,
            description: task.description,
            timestamp: commit.commitTime,
            developer: { name: commit.author, avatarUrl: '' },
            type: 'technical' as const,
            project: selectedProject,
          })),
          ...nonTechnicalTasks.map((task: CommitTask) => ({
            id: `${commit._id}-non-technical-${task.title}`,
            title: task.title,
            description: task.description,
            timestamp: commit.commitTime,
            developer: { name: commit.author, avatarUrl: '' },
            type: 'non-technical' as const,
            project: selectedProject,
          }))
        ];
      });

      setTasks(prev => page === 1 ? newTasks : [...prev, ...newTasks]);
      setHasMore(newTasks.length === 5);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoadingTasks(false);
    }
  }, [selectedOrg, selectedProject, isTasksEnabled]);

  // Load initial tasks when project is selected or tasks are enabled
  useEffect(() => {
    setCurrentPage(1);
    setTasks([]);
    if (isTasksEnabled) {
      loadTasks(1);
    }
  }, [selectedProject, isTasksEnabled, loadTasks]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !isLoadingTasks && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadTasks(nextPage);
    }
  }, [currentPage, isLoadingTasks, hasMore, loadTasks]);

  const handleToggleTasks = () => {
    if (selectedProject) {
      toggleProjectTasks(selectedOrg, selectedProject);
    }
  };

  // Reset selected project when organization changes
  React.useEffect(() => {
    if (projects.length > 0) {
      setSelected(0); // Select first project by default
    } else {
      setSelected(-1); // No project selected when array is empty
    }
  }, [selectedOrg, projects]);

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

  // Keyboard navigation for project cards, org switching, and Plan a sprint shortcut
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }

      const orgs = data?.data?.results || [];
      const currentOrgIndex = orgs.findIndex(org => org.organization.name === selectedOrg);

      // Organization switching with Cmd/Ctrl + Arrow Up/Down
      if ((isMac && e.metaKey) || (!isMac && e.ctrlKey)) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (currentOrgIndex > 0) {
            setSelectedOrg(orgs[currentOrgIndex - 1].organization.name);
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (currentOrgIndex < orgs.length - 1) {
            setSelectedOrg(orgs[currentOrgIndex + 1].organization.name);
          }
        }
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
  }, [isMac, projects.length, data, selectedOrg]);

  function handlePlanSprintShortcut() {
    setIsPlanSprintOpen(true);
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-[#101011] text-white p-0 flex flex-col relative">
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
        {isLoading ? (
          <div className="px-8 py-6 text-neutral-400">Loading projects...</div>
        ) : (
          <>
            <ProjectCards projects={projects} selected={selected} setSelected={setSelected} />
            {selectedProject && (
              <div className="px-8 py-4">
                <Button
                  onClick={handleToggleTasks}
                  variant={isTasksEnabled ? "destructive" : "default"}
                  className="w-full"
                >
                  {isTasksEnabled ? "Turn off Tasks for this project" : "Turn on Tasks for this project"}
                </Button>
              </div>
            )}
          </>
        )}
        {/* Project tasks timeline */}
        <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
          <ProjectTasksTimeline
            tasks={filteredTasks}
            view={taskView}
            onViewChange={setTaskView}
            onJumpToDate={() => alert('Jump to a date clicked!')}
            onAddTask={() => alert('Add a task clicked!')}
            onEditTask={taskId => alert('Edit task: ' + taskId)}
          />
          {isLoadingTasks && (
            <div className="text-center py-4 text-neutral-400">
              Loading more tasks...
            </div>
          )}
        </div>
        <PlanSprintModal
          isOpen={isPlanSprintOpen}
          onClose={() => setIsPlanSprintOpen(false)}
        />
      </main>
    </div>
  );
}

export default Dashboard;
