import React from 'react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function NavBar({ isManualCategorization, setIsManualCategorization }) {
  return (
    <div className="bg-background text-foreground p-4 border-b border-muted">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">RapidReel</h1>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsManualCategorization((prev) => !prev)}>
            <VibrateIcon className="w-4 h-4" />
            <span className="sr-only">Toggle Categorization View</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function VibrateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m2 8 2 2-2 2 2 2-2 2" />
      <path d="m22 8-2 2 2 2-2 2 2 2" />
      <rect width="8" height="14" x="8" y="5" rx="1" />
    </svg>
  );
}
