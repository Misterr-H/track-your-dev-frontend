import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Smartphone, Box, Globe, Server, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || selected === -1) return;

    const selectedCard = container.children[selected] as HTMLElement;
    if (!selectedCard) return;

    const containerWidth = container.clientWidth;
    const cardLeft = selectedCard.offsetLeft;
    const cardWidth = selectedCard.offsetWidth;
    const cardRight = cardLeft + cardWidth;

    // Calculate the scroll position to center the selected card
    const scrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);

    // Smooth scroll to the calculated position
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }, [selected]);

  if (projects.length === 0) {
    return (
      <div className="relative w-[80vw]">
        <div className="flex items-center justify-center h-32 text-neutral-400">
          No projects available
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[80vw]">
      {/* Left arrow indicator */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center">
        <div className="bg-neutral-900/80 backdrop-blur-sm rounded-r-lg p-2 flex items-center gap-1 text-neutral-400">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-medium">←</span>
        </div>
      </div>

      {/* Right arrow indicator */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center">
        <div className="bg-neutral-900/80 backdrop-blur-sm rounded-l-lg p-2 flex items-center gap-1 text-neutral-400">
          <span className="text-xs font-medium">→</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex gap-4 px-8 py-6 overflow-x-auto">
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