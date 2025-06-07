import React from 'react';
import { Card } from '@/components/ui/card';
import { Smartphone, Box, Globe, Server } from 'lucide-react';

export type Project = {
  name: string;
  category: string;
};

type ProjectCardsProps = {
  projects: Project[];
  selected: number;
  setSelected: (idx: number) => void;
};

export function ProjectCards({ projects, selected, setSelected }: ProjectCardsProps) {
  return (
    <div className="flex gap-4 px-8 py-6 overflow-x-auto">
      {projects.map((project, idx) => (
        <Card
          key={project.name}
          onClick={() => setSelected(idx)}
          className={`min-w-[220px] cursor-pointer border-2 transition-all duration-150 ${
            selected === idx
              ? 'border-primary shadow-lg bg-neutral-900'
              : 'border-neutral-800 bg-[#18181a] hover:border-primary/60'
          }`}
        >
          <div className="p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-lg truncate">
              {getCategoryIcon(project.category)}
              <span>{project.name}</span>
            </div>
            <div className="text-xs text-neutral-400 capitalize">{project.category}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'mobile app':
      return <Smartphone className="w-5 h-5 text-primary" />;
    case 'crm':
      return <Box className="w-5 h-5 text-primary" />;
    case 'website':
      return <Globe className="w-5 h-5 text-primary" />;
    case 'backend':
      return <Server className="w-5 h-5 text-primary" />;
    default:
      return null;
  }
} 