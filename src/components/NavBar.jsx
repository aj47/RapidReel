import React from 'react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { TagIcon, LayoutDashboardIcon, ListChecksIcon } from 'lucide-react';

export function NavBar({ isDashboardView, setIsDashboardView, openCategoryModal }) {
  return (
    <div className="bg-background text-foreground p-4 border-b border-muted">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">RapidReel</h1>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            onClick={() => setIsDashboardView((prev) => !prev)}
            className="flex items-center space-x-2">
            {isDashboardView ? (
              <ListChecksIcon className="w-4 h-4" />
            ) : (
              <LayoutDashboardIcon className="w-4 h-4" />
            )}
            <span>{isDashboardView ? "Categorise" : "Dashboard"}</span>
          </Button>
          <Button
            variant="ghost"
            onClick={openCategoryModal}
            className="flex items-center space-x-2">
            <TagIcon className="w-4 h-4" />
            <span>Manage Categories</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
