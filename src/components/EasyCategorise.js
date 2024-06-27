import React from 'react';
import { Button } from "@/components/ui/button";

const PreviousTranscriptLine = ({ transcript, index, categories, onClick }) => {
  if (index <= 0) return null;
  
  const category = categories.find((c) => c.id === transcript[index - 1].category);
  
  return (
    <div 
      className="bg-background rounded-md p-4 mb-4 w-full cursor-pointer"
      style={{
        opacity: 0.8,
        borderLeft: `4px solid ${category.color}`,
        backgroundColor: category.color,
      }}
      onClick={onClick}
    >
      {transcript[index - 1].text}
    </div>
  );
};

const CurrentTranscriptLine = ({ transcript, index, categories }) => {
  const category = categories.find((c) => c.id === transcript[index].category);
  
  return (
    <div
      className="bg-muted rounded-md p-4 flex flex-col items-center justify-center"
      style={{
        borderLeft: `4px solid ${category.color}`,
        backgroundColor: category.color,
        color: `${category.color}-foreground`,
      }}>
      <div className="text-lg font-bold mb-2">{transcript[index].text}</div>
    </div>
  );
};

const NextTranscriptLine = ({ transcript, index, categories, onClick }) => {
  if (index >= transcript.length - 1) return null;
  
  const category = categories.find((c) => c.id === transcript[index + 1].category);
  
  return (
    <div 
      className="bg-background rounded-md p-4 mt-4 w-full cursor-pointer"
      style={{
        opacity: 0.8,
        borderLeft: `4px solid ${category.color}`,
        backgroundColor: category.color,
      }}
      onClick={onClick}
    >
      {transcript[index + 1].text}
    </div>
  );
};

const CategoryButtons = ({ categories, handleCategorize }) => (
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
);

export function EasyCategorise({ transcript, categories, currentTranscriptIndex, handleCategorize, handlePreviousTranscript, handleNextTranscript }) {
  return (
    <div className="flex-1 overflow-auto p-4 flex flex-col items-center justify-center">
      <div className="bg-background rounded-md p-6 max-w-md w-full">
        <PreviousTranscriptLine 
          transcript={transcript} 
          index={currentTranscriptIndex} 
          categories={categories}
          onClick={handlePreviousTranscript}
        />
        <CurrentTranscriptLine 
          transcript={transcript} 
          index={currentTranscriptIndex} 
          categories={categories}
        />
        <NextTranscriptLine 
          transcript={transcript} 
          index={currentTranscriptIndex} 
          categories={categories}
          onClick={handleNextTranscript}
        />
        <CategoryButtons categories={categories} handleCategorize={handleCategorize} />
      </div>
    </div>
  );
}
