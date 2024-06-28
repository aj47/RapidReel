import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { useCategoriser } from "./CategoriserContext";

const TranscriptLine = ({ text, category, onClick, style }) => (
  <div 
    className="bg-background rounded-md p-2 w-full cursor-pointer mb-2"
    style={{
      ...style,
      borderLeft: `4px solid ${category.color}`,
      backgroundColor: category.color,
    }}
    onClick={onClick}
  >
    {text}
  </div>
);

const PreviousTranscriptLines = ({ transcript, currentIndex, categories, handlePreviousTranscript }) => {
  const lines = [];
  for (let i = currentIndex - 1; i >= 0; i--) {
    const category = categories.find((c) => c.id === transcript[i].category);
    lines.push(
      <TranscriptLine
        key={i}
        text={transcript[i].text}
        category={category}
        onClick={() => handlePreviousTranscript(currentIndex - i)}
        style={{ opacity: 0.8 - (currentIndex - i) * 0.1 }}
      />
    );
  }
  return <div className="flex-1 overflow-y-auto flex flex-col-reverse">{lines}</div>;
};

const CurrentTranscriptLine = ({ transcript, index, categories }) => {
	console.log(index);
  const category = categories.find((c) => c.id === transcript[index].category);
  
  return (
    <div
      className="bg-muted rounded-md p-4 flex flex-col items-center justify-center my-4"
      style={{
        borderLeft: `4px solid ${category.color}`,
        backgroundColor: category.color,
        color: `${category.color}-foreground`,
      }}>
      <div className="text-lg font-bold">{transcript[index].text}</div>
    </div>
  );
};

const NextTranscriptLines = ({ transcript, currentIndex, categories, handleNextTranscript }) => {
  const lines = [];
  for (let i = currentIndex + 1; i < transcript.length; i++) {
    const category = categories.find((c) => c.id === transcript[i].category);
    lines.push(
      <TranscriptLine
        key={i}
        text={transcript[i].text}
        category={category}
        onClick={() => handleNextTranscript(i - currentIndex)}
        style={{ opacity: 0.8 - (i - currentIndex - 1) * 0.1 }}
      />
    );
  }
  return <div className="flex-1 overflow-y-auto flex flex-col">{lines}</div>;
};

const CategoryButtons = ({ categories, handleCategorize }) => (
  <div className="flex flex-wrap gap-2 mt-4">
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

export function EasyCategorise() {
  const {
    transcript,
    categories,
    currentTranscriptIndex,
    handleCategorize,
    handlePreviousTranscript,
    handleNextTranscript,
    loading
  } = useCategoriser();
  if (loading) {
    return <div>Loading...</div>;
  }

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = `${window.innerHeight - 100}px`;
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-hidden p-4 flex flex-col items-center justify-center">
      <div className="bg-background rounded-md p-6 max-w-3xl w-full h-full flex flex-col">
        <PreviousTranscriptLines 
          transcript={transcript} 
          currentIndex={currentTranscriptIndex} 
          categories={categories}
          handlePreviousTranscript={handlePreviousTranscript}
        />
        <CurrentTranscriptLine 
          transcript={transcript} 
          index={currentTranscriptIndex} 
          categories={categories}
        />
        <NextTranscriptLines 
          transcript={transcript} 
          currentIndex={currentTranscriptIndex} 
          categories={categories}
          handleNextTranscript={handleNextTranscript}
        />
        <CategoryButtons categories={categories} handleCategorize={handleCategorize} />
      </div>
    </div>
  );
}
