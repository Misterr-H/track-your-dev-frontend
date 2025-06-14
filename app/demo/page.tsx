'use client';

import React, { useState, useRef } from 'react';
import DemoSidebar from '@/components/demo-sidebar';
import { ProjectCards, Project } from '@/components/ProjectCards';
import { ProjectTasksTimeline, Task } from '@/components/ProjectTasksTimeline';
import { Button } from '@/components/ui/button';
import { Bell, Pen, ArrowUp } from 'lucide-react';

// Dummy data
const DEMO_ORGS = [
  {
    name: 'Acme Corp',
    repositories: [
      { id: 1, name: 'web-app', enabledForTasks: true },
      { id: 2, name: 'mobile-app', enabledForTasks: true },
      { id: 3, name: 'api-service', enabledForTasks: true },
      { id: 4, name: 'design-system', enabledForTasks: true },
      { id: 5, name: 'analytics-dashboard', enabledForTasks: true }
    ]
  },
  {
    name: 'TechStart',
    repositories: [
      { id: 6, name: 'frontend', enabledForTasks: true },
      { id: 7, name: 'backend', enabledForTasks: true },
      { id: 8, name: 'mobile-app', enabledForTasks: true },
      { id: 9, name: 'devops', enabledForTasks: true }
    ]
  }
];

const DEMO_TASKS: Record<string, Task[]> = {
  'web-app': [
    {
      id: '1',
      title: 'Implement user authentication',
      description: 'Add JWT-based authentication system with refresh tokens',
      timestamp: '2024-03-15T10:00:00Z',
      developer: { name: 'John Doe', avatarUrl: '' },
      type: 'technical',
      project: 'web-app'
    },
    {
      id: '2',
      title: 'Design new landing page',
      description: 'Create modern and responsive landing page design',
      timestamp: '2024-03-15T09:30:00Z',
      developer: { name: 'Jane Smith', avatarUrl: '' },
      type: 'non-technical',
      project: 'web-app'
    },
    {
      id: '3',
      title: 'Add dark mode support',
      description: 'Implement theme switching and dark mode styles',
      timestamp: '2024-03-14T15:45:00Z',
      developer: { name: 'Mike Johnson', avatarUrl: '' },
      type: 'technical',
      project: 'web-app'
    },
    {
      id: '4',
      title: 'Implement form validation',
      description: 'Add client-side validation for all forms',
      timestamp: '2024-03-14T14:30:00Z',
      developer: { name: 'Emily Chen', avatarUrl: '' },
      type: 'technical',
      project: 'web-app'
    },
    {
      id: '5',
      title: 'Add unit tests',
      description: 'Write unit tests for core components',
      timestamp: '2024-03-14T13:15:00Z',
      developer: { name: 'David Wilson', avatarUrl: '' },
      type: 'technical',
      project: 'web-app'
    },
    {
      id: '6',
      title: 'Update user documentation',
      description: 'Revise and update user guide with new features',
      timestamp: '2024-03-14T11:45:00Z',
      developer: { name: 'Sarah Brown', avatarUrl: '' },
      type: 'non-technical',
      project: 'web-app'
    }
  ],
  'mobile-app': [
    {
      id: '7',
      title: 'Fix payment gateway integration',
      description: 'Resolve issues with Stripe payment processing',
      timestamp: '2024-03-15T11:20:00Z',
      developer: { name: 'Sarah Wilson', avatarUrl: '' },
      type: 'technical',
      project: 'mobile-app'
    },
    {
      id: '8',
      title: 'Implement push notifications',
      description: 'Add Firebase Cloud Messaging for push notifications',
      timestamp: '2024-03-15T10:15:00Z',
      developer: { name: 'Alex Brown', avatarUrl: '' },
      type: 'technical',
      project: 'mobile-app'
    },
    {
      id: '9',
      title: 'Update app store listing',
      description: 'Refresh screenshots and update app description',
      timestamp: '2024-03-14T16:30:00Z',
      developer: { name: 'Emma Davis', avatarUrl: '' },
      type: 'non-technical',
      project: 'mobile-app'
    },
    {
      id: '10',
      title: 'Add offline support',
      description: 'Implement local storage and sync functionality',
      timestamp: '2024-03-14T15:20:00Z',
      developer: { name: 'Michael Lee', avatarUrl: '' },
      type: 'technical',
      project: 'mobile-app'
    },
    {
      id: '11',
      title: 'Optimize app performance',
      description: 'Reduce bundle size and improve load times',
      timestamp: '2024-03-14T14:10:00Z',
      developer: { name: 'Lisa Chen', avatarUrl: '' },
      type: 'technical',
      project: 'mobile-app'
    },
    {
      id: '12',
      title: 'Conduct user testing',
      description: 'Organize and analyze user feedback sessions',
      timestamp: '2024-03-14T13:00:00Z',
      developer: { name: 'Tom Wilson', avatarUrl: '' },
      type: 'non-technical',
      project: 'mobile-app'
    }
  ],
  'api-service': [
    {
      id: '13',
      title: 'Optimize database queries',
      description: 'Improve performance of frequently used queries',
      timestamp: '2024-03-15T14:20:00Z',
      developer: { name: 'David Lee', avatarUrl: '' },
      type: 'technical',
      project: 'api-service'
    },
    {
      id: '14',
      title: 'Add rate limiting',
      description: 'Implement API rate limiting for all endpoints',
      timestamp: '2024-03-15T13:45:00Z',
      developer: { name: 'Lisa Chen', avatarUrl: '' },
      type: 'technical',
      project: 'api-service'
    },
    {
      id: '15',
      title: 'Update API documentation',
      description: 'Add new endpoints and update existing documentation',
      timestamp: '2024-03-14T11:15:00Z',
      developer: { name: 'Tom Wilson', avatarUrl: '' },
      type: 'non-technical',
      project: 'api-service'
    },
    {
      id: '16',
      title: 'Implement caching',
      description: 'Add Redis caching for frequently accessed data',
      timestamp: '2024-03-14T10:30:00Z',
      developer: { name: 'James Brown', avatarUrl: '' },
      type: 'technical',
      project: 'api-service'
    },
    {
      id: '17',
      title: 'Add request validation',
      description: 'Implement input validation for all endpoints',
      timestamp: '2024-03-14T09:45:00Z',
      developer: { name: 'Rachel Green', avatarUrl: '' },
      type: 'technical',
      project: 'api-service'
    },
    {
      id: '18',
      title: 'Set up monitoring',
      description: 'Configure logging and error tracking',
      timestamp: '2024-03-14T09:00:00Z',
      developer: { name: 'Chris Evans', avatarUrl: '' },
      type: 'technical',
      project: 'api-service'
    }
  ],
  'design-system': [
    {
      id: '19',
      title: 'Create button component variants',
      description: 'Implement different button styles and states',
      timestamp: '2024-03-15T16:00:00Z',
      developer: { name: 'Sophie Martin', avatarUrl: '' },
      type: 'technical',
      project: 'design-system'
    },
    {
      id: '20',
      title: 'Design color palette',
      description: 'Create and document the color system',
      timestamp: '2024-03-15T15:30:00Z',
      developer: { name: 'James Wilson', avatarUrl: '' },
      type: 'non-technical',
      project: 'design-system'
    },
    {
      id: '21',
      title: 'Create typography system',
      description: 'Define and implement text styles and hierarchy',
      timestamp: '2024-03-15T14:45:00Z',
      developer: { name: 'Emma Davis', avatarUrl: '' },
      type: 'technical',
      project: 'design-system'
    },
    {
      id: '22',
      title: 'Build form components',
      description: 'Create reusable form input components',
      timestamp: '2024-03-15T14:00:00Z',
      developer: { name: 'Michael Lee', avatarUrl: '' },
      type: 'technical',
      project: 'design-system'
    },
    {
      id: '23',
      title: 'Create icon library',
      description: 'Design and implement custom icon set',
      timestamp: '2024-03-15T13:15:00Z',
      developer: { name: 'Sarah Brown', avatarUrl: '' },
      type: 'technical',
      project: 'design-system'
    },
    {
      id: '24',
      title: 'Document component usage',
      description: 'Create comprehensive component documentation',
      timestamp: '2024-03-15T12:30:00Z',
      developer: { name: 'Tom Wilson', avatarUrl: '' },
      type: 'non-technical',
      project: 'design-system'
    }
  ],
  'analytics-dashboard': [
    {
      id: '25',
      title: 'Implement data visualization',
      description: 'Add charts and graphs for key metrics',
      timestamp: '2024-03-15T17:45:00Z',
      developer: { name: 'Rachel Green', avatarUrl: '' },
      type: 'technical',
      project: 'analytics-dashboard'
    },
    {
      id: '26',
      title: 'Add export functionality',
      description: 'Implement CSV and PDF export options',
      timestamp: '2024-03-15T17:00:00Z',
      developer: { name: 'Chris Evans', avatarUrl: '' },
      type: 'technical',
      project: 'analytics-dashboard'
    },
    {
      id: '27',
      title: 'Create custom reports',
      description: 'Build report builder interface',
      timestamp: '2024-03-15T16:15:00Z',
      developer: { name: 'Anna Lee', avatarUrl: '' },
      type: 'technical',
      project: 'analytics-dashboard'
    },
    {
      id: '28',
      title: 'Add data filtering',
      description: 'Implement advanced filtering options',
      timestamp: '2024-03-15T15:30:00Z',
      developer: { name: 'Peter Parker', avatarUrl: '' },
      type: 'technical',
      project: 'analytics-dashboard'
    },
    {
      id: '29',
      title: 'Set up data refresh',
      description: 'Configure automatic data updates',
      timestamp: '2024-03-15T14:45:00Z',
      developer: { name: 'Bruce Wayne', avatarUrl: '' },
      type: 'technical',
      project: 'analytics-dashboard'
    },
    {
      id: '30',
      title: 'Create user guide',
      description: 'Write documentation for dashboard features',
      timestamp: '2024-03-15T14:00:00Z',
      developer: { name: 'Clark Kent', avatarUrl: '' },
      type: 'non-technical',
      project: 'analytics-dashboard'
    }
  ],
  'frontend': [
    {
      id: '31',
      title: 'Migrate to React 18',
      description: 'Update codebase to use React 18 features',
      timestamp: '2024-03-15T18:30:00Z',
      developer: { name: 'Anna Lee', avatarUrl: '' },
      type: 'technical',
      project: 'frontend'
    },
    {
      id: '32',
      title: 'Implement error boundaries',
      description: 'Add error boundaries for better error handling',
      timestamp: '2024-03-15T18:00:00Z',
      developer: { name: 'Peter Parker', avatarUrl: '' },
      type: 'technical',
      project: 'frontend'
    },
    {
      id: '33',
      title: 'Add unit tests',
      description: 'Write tests for core components',
      timestamp: '2024-03-15T17:15:00Z',
      developer: { name: 'Bruce Wayne', avatarUrl: '' },
      type: 'technical',
      project: 'frontend'
    },
    {
      id: '34',
      title: 'Optimize bundle size',
      description: 'Implement code splitting and lazy loading',
      timestamp: '2024-03-15T16:30:00Z',
      developer: { name: 'Clark Kent', avatarUrl: '' },
      type: 'technical',
      project: 'frontend'
    },
    {
      id: '35',
      title: 'Add accessibility features',
      description: 'Implement ARIA labels and keyboard navigation',
      timestamp: '2024-03-15T15:45:00Z',
      developer: { name: 'Tony Stark', avatarUrl: '' },
      type: 'technical',
      project: 'frontend'
    },
    {
      id: '36',
      title: 'Update documentation',
      description: 'Revise component documentation',
      timestamp: '2024-03-15T15:00:00Z',
      developer: { name: 'Natasha Romanoff', avatarUrl: '' },
      type: 'non-technical',
      project: 'frontend'
    }
  ],
  'backend': [
    {
      id: '37',
      title: 'Set up caching layer',
      description: 'Implement Redis caching for frequently accessed data',
      timestamp: '2024-03-15T19:15:00Z',
      developer: { name: 'Bruce Wayne', avatarUrl: '' },
      type: 'technical',
      project: 'backend'
    },
    {
      id: '38',
      title: 'Add database migrations',
      description: 'Create and document database migration system',
      timestamp: '2024-03-15T19:00:00Z',
      developer: { name: 'Clark Kent', avatarUrl: '' },
      type: 'technical',
      project: 'backend'
    },
    {
      id: '39',
      title: 'Implement rate limiting',
      description: 'Add API rate limiting middleware',
      timestamp: '2024-03-15T18:15:00Z',
      developer: { name: 'Tony Stark', avatarUrl: '' },
      type: 'technical',
      project: 'backend'
    },
    {
      id: '40',
      title: 'Add request validation',
      description: 'Implement input validation middleware',
      timestamp: '2024-03-15T17:30:00Z',
      developer: { name: 'Natasha Romanoff', avatarUrl: '' },
      type: 'technical',
      project: 'backend'
    },
    {
      id: '41',
      title: 'Set up logging',
      description: 'Configure structured logging system',
      timestamp: '2024-03-15T16:45:00Z',
      developer: { name: 'Steve Rogers', avatarUrl: '' },
      type: 'technical',
      project: 'backend'
    },
    {
      id: '42',
      title: 'Update API documentation',
      description: 'Revise OpenAPI specification',
      timestamp: '2024-03-15T16:00:00Z',
      developer: { name: 'Wanda Maximoff', avatarUrl: '' },
      type: 'non-technical',
      project: 'backend'
    }
  ],
  'devops': [
    {
      id: '43',
      title: 'Set up CI/CD pipeline',
      description: 'Configure GitHub Actions for automated deployment',
      timestamp: '2024-03-15T20:00:00Z',
      developer: { name: 'Tony Stark', avatarUrl: '' },
      type: 'technical',
      project: 'devops'
    },
    {
      id: '44',
      title: 'Configure monitoring',
      description: 'Set up Prometheus and Grafana for system monitoring',
      timestamp: '2024-03-15T19:45:00Z',
      developer: { name: 'Natasha Romanoff', avatarUrl: '' },
      type: 'technical',
      project: 'devops'
    },
    {
      id: '45',
      title: 'Implement infrastructure as code',
      description: 'Convert infrastructure to Terraform',
      timestamp: '2024-03-15T19:00:00Z',
      developer: { name: 'Steve Rogers', avatarUrl: '' },
      type: 'technical',
      project: 'devops'
    },
    {
      id: '46',
      title: 'Set up backup system',
      description: 'Configure automated database backups',
      timestamp: '2024-03-15T18:15:00Z',
      developer: { name: 'Wanda Maximoff', avatarUrl: '' },
      type: 'technical',
      project: 'devops'
    },
    {
      id: '47',
      title: 'Configure security scanning',
      description: 'Set up automated security checks',
      timestamp: '2024-03-15T17:30:00Z',
      developer: { name: 'Vision', avatarUrl: '' },
      type: 'technical',
      project: 'devops'
    },
    {
      id: '48',
      title: 'Update deployment docs',
      description: 'Revise deployment procedures',
      timestamp: '2024-03-15T16:45:00Z',
      developer: { name: 'Sam Wilson', avatarUrl: '' },
      type: 'non-technical',
      project: 'devops'
    }
  ]
};

function DemoDashboard() {
  const [selected, setSelected] = useState(0);
  const [taskView, setTaskView] = useState<'technical' | 'non-technical'>('technical');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Convert repositories to projects
  const projects: Project[] = DEMO_ORGS[0].repositories.map(repo => ({
    name: repo.name,
    category: '',
    id: repo.id,
    enabledForTasks: true
  }));

  const selectedProject = projects[selected];
  const isTasksEnabled = true; // Always enabled in demo

  // Get tasks for the selected project
  const projectTasks = DEMO_TASKS[selectedProject?.name || ''] || [];
  
  // Filter tasks based on the current view
  const filteredTasks = projectTasks.filter(task => task.type === taskView);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle scroll to show/hide scroll to top button
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setShowScrollTop(scrollContainerRef.current.scrollTop > 100);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-950">
      <DemoSidebar />
      <main className="flex-1 min-h-screen bg-[#101011] text-white p-0 flex flex-col relative">
        {/* Mini bar */}
        <div className="flex justify-end items-center h-16 px-8 border-b border-neutral-800">
          <Button variant="ghost" size="icon" className="text-white mr-2">
            <Bell className="w-5 h-5" />
          </Button>
          <Button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md bg-neutral-800">
            <Pen className="w-4 h-4" />
            <span className="font-medium text-sm">Plan a sprint</span>
          </Button>
        </div>
        {/* Scrollable content area */}
        <div 
          ref={scrollContainerRef} 
          className="flex-1 overflow-y-auto"
          onScroll={handleScroll}
        >
          <ProjectCards projects={projects} selected={selected} setSelected={setSelected} />
          {/* Project tasks timeline */}
          {selectedProject && isTasksEnabled && (
            <div className="h-full">
              <ProjectTasksTimeline
                tasks={filteredTasks}
                view={taskView}
                onViewChange={setTaskView}
                onJumpToDate={() => {}}
                onAddTask={() => {}}
                onEditTask={() => {}}
                isLoading={false}
                onLoadMore={() => {}}
                hasMore={false}
              />
            </div>
          )}
        </div>
        {/* Scroll to top button */}
        <Button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          size="icon"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      </main>
    </div>
  );
}

export default DemoDashboard; 