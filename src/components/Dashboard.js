import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoveVerticalIcon } from "lucide-react";
import { useCategoriser } from "./CategoriserContext";

export function Dashboard() {
  const { transcript, categories, handleTextCategoryChange } = useCategoriser();

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="bg-muted rounded-md p-4">
        <h2 className="text-lg font-bold mb-2">Transcript</h2>
        <div className="space-y-2">
          {transcript.map((item) => (
            <div
              key={item.id}
              className="bg-background rounded-md p-2 flex items-center justify-between"
              style={{
                borderLeft: `4px solid ${
                  categories.find((c) => c.id === item.category).color
                }`,
                backgroundColor: categories.find(
                  (c) => c.id === item.category
                ).color,
                color:
                  categories.find((c) => c.id === item.category).color +
                  "-foreground",
              }}
            >
              <div className="text-sm">{item.text}</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoveVerticalIcon className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onSelect={() =>
                        handleTextCategoryChange(item.id, category.id)
                      }
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span>
                          {category.label} ({category.shortcut})
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
