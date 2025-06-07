import React from "react";
import { LogoIcon } from "@/components/ui/logo";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search, Plus, Settings, User } from "lucide-react";

const organizations = [
  { name: "trackyourdev" },
  { name: "know-your-dev" },
  { name: "dummy-org" },
];

export default function Sidebar() {
  const [selectedOrg, setSelectedOrg] = React.useState(organizations[0].name);

  return (
    <aside className="h-screen w-64 bg-black text-white flex flex-col border-r border-neutral-800">
      {/* Top Section: Org, Search, Plus */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-neutral-800">
        <LogoIcon className="w-8 h-8 bg-blue-600 rounded-md p-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-2 py-1 text-[11px] font-semibold flex items-center gap-1 text-white hover:bg-neutral-900 focus:bg-neutral-900">
              <span className="truncate max-w-[100px]">{selectedOrg}</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-neutral-900 border-neutral-800 text-white">
            {organizations.map((org) => (
              <DropdownMenuItem
                key={org.name}
                onClick={() => setSelectedOrg(org.name)}
                className={selectedOrg === org.name ? "bg-neutral-800" : ""}
              >
                {org.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="text-white hover:bg-neutral-900">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-neutral-900">
          <Plus className="w-5 h-5" />
        </Button>
      </div>
      {/* Sidebar Options */}
      <nav className="flex-1 flex flex-col gap-1 px-2 py-4">
        <SidebarOption icon={<User className="w-5 h-5" />} label="Profile" />
        <SidebarOption icon={<Settings className="w-5 h-5" />} label="Settings" />
        <SidebarOption icon={<Search className="w-5 h-5" />} label="Search" />
        <SidebarOption icon={<Plus className="w-5 h-5" />} label="Create" />
        {/* <SidebarOption icon={<LogoIcon className="w-5 h-5" />} label="Dashboard" /> */}
        {/* Add more dummy options as needed */}
      </nav>
      <div className="px-4 py-4 border-t border-neutral-800 text-xs text-neutral-400">© 2025 TrackYourDev</div>
    </aside>
  );
}

function SidebarOption({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-neutral-900 transition-colors text-left">
      <span>{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}
