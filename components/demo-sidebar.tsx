'use client';

import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search, Plus, Settings, User, ArrowUp, ArrowDown, CreditCard } from "lucide-react";

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
  }
];

function DemoSidebar() {
  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-800">
        <h1 className="text-xl font-semibold text-white">TrackYourDev</h1>
      </div>

      {/* Organization selector */}
      <div className="p-4 border-b border-neutral-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between text-white hover:bg-neutral-800">
              <span className="truncate">Acme Corp</span>
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-neutral-900 border-neutral-800">
            {DEMO_ORGS.map((org) => (
              <DropdownMenuItem
                key={org.name}
                className="text-white hover:bg-neutral-800 focus:bg-neutral-800"
              >
                {org.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-neutral-800" />
            <div className="px-2 py-1.5 text-xs text-neutral-400 flex items-center gap-1">
              <button 
                onClick={() => {
                  window.open('https://github.com/apps/trackyourdev/installations/new', '_blank');
                }} 
                className="hover:text-white transition-colors duration-200 flex items-center gap-1"
              >
                <Settings className="w-3 h-3 text-white" />
                <span className="text-white">Manage Organizations</span>
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
        <SidebarOption icon={<CreditCard className="w-5 h-5" />} label="Manage Billing" />
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Demo User</p>
            <p className="text-xs text-neutral-400 truncate">demo@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarOption({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors">
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}

export default DemoSidebar; 