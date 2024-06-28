import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { TagIcon, LayoutDashboardIcon, ListChecksIcon } from 'lucide-react';
import { useCategoriser } from './CategoriserContext';

export function NavBar({ isDashboardView, setIsDashboardView, openCategoryModal }) {
  const { lastSavedTimeRef, hasUnsavedChanges } = useCategoriser();
  const [timeSinceLastSave, setTimeSinceLastSave] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lastSavedTimeRef.current) {
        const now = new Date();
        const diffInSeconds = Math.round((now - lastSavedTimeRef.current) / 1000);
        setTimeSinceLastSave(diffInSeconds);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [lastSavedTimeRef]);

  return (
    <div className="bg-background text-foreground p-4 border-b border-muted">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">RapidReel</h1>
          {hasUnsavedChanges ? (
            <span className="text-xs text-yellow-500">Unsaved changes</span>
          ) : (
            timeSinceLastSave !== null && timeSinceLastSave <= 2 && (
              <span className="text-xs text-green-custom">Saved to cloud!</span>
            )
          )}
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {/* <Button
            variant="ghost"
            onClick={() => setIsDashboardView((prev) => !prev)}
            className="flex items-center space-x-2">
            {isDashboardView ? (
              <ListChecksIcon className="w-4 h-4" />
            ) : (
              <LayoutDashboardIcon className="w-4 h-4" />
            )}
            <span>{isDashboardView ? "Categorise" : "Dashboard"}</span>
          </Button> */}
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
