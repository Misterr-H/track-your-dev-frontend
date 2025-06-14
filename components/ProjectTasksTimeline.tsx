import React, { useRef, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Pen, Loader2 } from 'lucide-react';

export type Task = {
  id: string;
  title: string;
  description: string;
  timestamp: string; // ISO string
  developer: {
    name: string;
    avatarUrl?: string;
  };
  type: 'technical' | 'non-technical';
  project?: string;
};

type ProjectTasksTimelineProps = {
  tasks: Task[];
  view: 'technical' | 'non-technical';
  onViewChange: (view: 'technical' | 'non-technical') => void;
  onJumpToDate: () => void;
  onAddTask?: () => void;
  onEditTask?: (taskId: string) => void;
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
};

export function ProjectTasksTimeline({ 
  tasks, 
  view, 
  onViewChange, 
  onJumpToDate, 
  onAddTask, 
  onEditTask,
  isLoading = false,
  onLoadMore,
  hasMore = false
}: ProjectTasksTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const grouped = groupTasksByDate(tasks);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !onLoadMore) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Load more when user scrolls to 80% of the content
      if (scrollHeight - scrollTop <= clientHeight * 1.2 && !isLoading && hasMore) {
        onLoadMore();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, onLoadMore]);

  return (
    <div className="relative px-8 py-4">
      {/* Top right controls */}
      <div className="flex justify-end items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">Technical View</span>
          <Switch
            checked={view === 'non-technical'}
            onCheckedChange={checked => onViewChange(checked ? 'non-technical' : 'technical')}
            id="view-switch"
          />
          <span className="text-xs text-neutral-400">Non-Technical View</span>
        </div>
        {/* <Button size="sm" variant="outline" className="ml-4" onClick={onJumpToDate}>
          Jump to a date
        </Button> */}
        {/* <button
          type="button"
          className="ml-2 px-2 py-1 text-xs text-primary hover:underline focus:outline-none bg-transparent border-none"
          onClick={onAddTask}
        >
          + Add a task
        </button> */}
      </div>
      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 border-dotted border-l-2 border-neutral-700 z-0" />
        <div className="space-y-10">
          {Object.entries(grouped).map(([dateLabel, tasks]) => (
            <div key={dateLabel}>
              <div className="mb-4 ml-12 text-sm font-semibold text-neutral-400">{dateLabel}</div>
              <div className="space-y-6">
                {tasks.map(task => (
                  <div key={task.id} className="relative flex items-start group">
                    {/* Timeline dot */}
                    <div className="absolute left-5 top-3 w-3 h-3 rounded-full bg-primary border-2 border-white z-10" />
                    <div className="ml-12 flex-1 bg-neutral-900 rounded-lg p-4 shadow-sm border border-neutral-800">
                      <div className="flex flex-row items-start">
                        {/* Div A: left side */}
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="font-semibold text-base truncate">{task.title}</div>
                          <div className="text-sm text-neutral-300 mt-1 mb-2 line-clamp-3">{task.description}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar className="w-6 h-6">
                              {task.developer.avatarUrl ? (
                                <AvatarImage src={task.developer.avatarUrl} alt={task.developer.name} />
                              ) : (
                                <AvatarFallback>{getInitials(task.developer.name)}</AvatarFallback>
                              )}
                            </Avatar>
                            <span className="text-xs text-neutral-400">{task.developer.name}</span>
                          </div>
                        </div>
                        {/* Div B: right side */}
                        <div className="flex flex-col items-center ml-auto min-w-[48px] justify-center">
                          <span className="text-xs text-neutral-400 whitespace-nowrap mb-1">{formatTime(task.timestamp)}</span>
                          {/* <button
                            type="button"
                            className="p-1 rounded hover:bg-neutral-800 focus:outline-none mt-3"
                            onClick={() => onEditTask && onEditTask(task.id)}
                            title="Edit task"
                          >
                            <Pen className="w-4 h-4 text-white" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          )}
          {/* No more tasks indicator */}
          {!isLoading && !hasMore && tasks.length > 0 && (
            <div className="text-center text-sm text-neutral-400 py-4">
              No more tasks to load
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function groupTasksByDate(tasks: Task[]) {
  // Sort by timestamp desc
  const sorted = [...tasks].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const groups: Record<string, Task[]> = {};
  for (const task of sorted) {
    const label = getDateLabel(task.timestamp);
    if (!groups[label]) groups[label] = [];
    groups[label].push(task);
  }
  return groups;
}

function getDateLabel(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const taskDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = (today.getTime() - taskDay.getTime()) / (1000 * 60 * 60 * 24);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(iso: string) {
  const date = new Date(iso);
  return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

function getInitials(name: string | undefined) {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase();
} 