import React from 'react';
import { Button } from "@/components/ui/button";

export function EasyCategorise({ transcript, categories, currentTranscriptIndex, handleCategorize, handlePreviousTranscript, handleNextTranscript }) {
  return (
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
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={currentTranscriptIndex === transcript.length - 1}
            onClick={handleNextTranscript}
            className={`opacity-${currentTranscriptIndex === transcript.length - 1 ? "50" : "100"}`}>
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
