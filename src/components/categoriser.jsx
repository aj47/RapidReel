/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/VgkU0zZmf19
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "./ui/input"
import { useCategoriser, CategoriserProvider } from "./CategoriserContext"

export function Categoriser() {
  return (
    <CategoriserProvider>
      <CategoriserContent />
    </CategoriserProvider>
  );
}

function CategoriserContent() {
  const {
    transcript,
    categories,
    currentTranscriptIndex,
    isManualCategorization,
    setIsManualCategorization,
    handleTextCategoryChange,
    handleCategorize,
    handleNextTranscript,
    handlePreviousTranscript,
    addCategory,
    updateCategory
  } = useCategoriser()

  const [editingCategory, setEditingCategory] = useState(null)
  const [newCategory, setNewCategory] = useState({ label: "", color: "#000000", shortcut: "" })

  const handleAddCategory = () => {
    if (newCategory.label && newCategory.color && newCategory.shortcut) {
      addCategory(newCategory)
      setNewCategory({ label: "", color: "#000000", shortcut: "" })
    }
  }

  const handleCategoryEdit = (category) => {
    setEditingCategory(category)
  }

  const handleCategorySave = (updatedCategory) => {
    updateCategory(updatedCategory)
    setEditingCategory(null)
  }

  const handleKeyboardShortcut = (event) => {
    const shortcutIndex = categories.findIndex((category) => category.shortcut === event.key)
    if (shortcutIndex !== -1) {
      handleCategorize(categories[shortcutIndex].id)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardShortcut)
    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcut)
    };
  }, [categories, handleKeyboardShortcut])
  return (
    (<div className="flex flex-col h-screen">
      <div className="bg-background text-foreground p-4 border-b border-muted">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Video Transcript</h1>
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
      {isManualCategorization ? (
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-[1fr_300px] gap-4">
            <div className="bg-muted rounded-md p-4">
              <h2 className="text-lg font-bold mb-2">Transcript</h2>
              <div className="space-y-2">
                {transcript.map((item) => (
                  <div
                    key={item.id}
                    className="bg-background rounded-md p-2 flex items-center justify-between"
                    style={{
                      borderLeft: `4px solid ${categories.find((c) => c.id === item.category).color}`,
                      backgroundColor: categories.find((c) => c.id === item.category).color,
                      color: categories.find((c) => c.id === item.category).color + "-foreground",
                    }}>
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
                            onSelect={() => handleTextCategoryChange(item.id, category.id)}>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: category.color }} />
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
            <div className="bg-muted rounded-md p-4">
              <h2 className="text-lg font-bold mb-2">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    {editingCategory?.id === category.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editingCategory.label}
                          onChange={(e) => setEditingCategory({ ...editingCategory, label: e.target.value })}
                          className="bg-transparent border-b border-muted focus:outline-none" />
                        <input
                          type="color"
                          value={editingCategory.color}
                          onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                          className="w-8 h-8 border-none rounded-full cursor-pointer" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }} />
                        <span>
                          {category.label} ({category.shortcut})
                        </span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      {editingCategory?.id === category.id ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCategorySave(editingCategory)}>
                          <CheckIcon className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" onClick={() => handleCategoryEdit(category)}>
                          <FilePenIcon className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <h3 className="text-sm font-semibold mb-2">Add New Category</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Label"
                      value={newCategory.label}
                      onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
                      className="flex-grow"
                    />
                    <Input
                      type="color"
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                      className="w-10 h-10 p-1 border-none rounded-full cursor-pointer"
                    />
                    <Input
                      type="text"
                      placeholder="Shortcut"
                      value={newCategory.shortcut}
                      onChange={(e) => setNewCategory({ ...newCategory, shortcut: e.target.value })}
                      className="w-20"
                    />
                    <Button onClick={handleAddCategory}>Add</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex-1 overflow-auto p-4 flex flex-col items-center justify-center">
          <div className="bg-background rounded-md p-6 max-w-md w-full">
            {currentTranscriptIndex > 0 && (
              <div className="bg-background rounded-md p-4 mb-4 w-full opacity-80">
                {transcript[currentTranscriptIndex - 1].text}
              </div>
            )}
            <div
              className="bg-muted rounded-md p-4 flex flex-col items-center justify-center"
              style={{
                borderLeft: `4px solid ${
                  categories.find((c) => c.id === transcript[currentTranscriptIndex].category).color
                }`,
                backgroundColor: categories.find((c) => c.id === transcript[currentTranscriptIndex].category).color,
                color:
                  categories.find((c) => c.id === transcript[currentTranscriptIndex].category).color + "-foreground",
              }}>
              <div className="text-lg font-bold mb-2">{transcript[currentTranscriptIndex].text}</div>
            </div>
            {currentTranscriptIndex < transcript.length - 1 && (
              <div className="bg-background rounded-md p-4 mt-4 w-full opacity-80">
                {transcript[currentTranscriptIndex + 1].text}
              </div>
            )}
            <div className="flex gap-2 mt-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCategorize(category.id)}
                  className={`bg-${category.color} text-${category.color}-foreground hover:opacity-80`}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }} />
                    <span>
                      {category.label} ({category.shortcut})
                    </span>
                  </div>
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="ghost"
                size="icon"
                disabled={currentTranscriptIndex === 0}
                onClick={handlePreviousTranscript}
                className={`opacity-${currentTranscriptIndex === 0 ? "50" : "100"}`}>
                <ChevronLeftIcon className="w-4 h-4" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={currentTranscriptIndex === transcript.length - 1}
                onClick={handleNextTranscript}
                className={`opacity-${currentTranscriptIndex === transcript.length - 1 ? "50" : "100"}`}>
                <ChevronRightIcon className="w-4 h-4" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>)
  );
}

function CheckIcon(props) {
  return (
    (<svg
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
      <path d="M20 6 9 17l-5-5" />
    </svg>)
  );
}


function ChevronLeftIcon(props) {
  return (
    (<svg
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
      <path d="m15 18-6-6 6-6" />
    </svg>)
  );
}


function ChevronRightIcon(props) {
  return (
    (<svg
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
      <path d="m9 18 6-6-6-6" />
    </svg>)
  );
}


function FilePenIcon(props) {
  return (
    (<svg
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>)
  );
}


function MoveVerticalIcon(props) {
  return (
    (<svg
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>)
  );
}


function ShuffleIcon(props) {
  return (
    (<svg
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
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
      <path d="m18 14 4 4-4 4" />
    </svg>)
  );
}


function VibrateIcon(props) {
  return (
    (<svg
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
    </svg>)
  );
}
