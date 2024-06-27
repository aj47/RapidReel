import React, { createContext, useContext, useState, useEffect } from 'react';

const CategoriserContext = createContext();

export const useCategoriser = () => useContext(CategoriserContext);

export const CategoriserProvider = ({ children }) => {
  const [transcript, setTranscript] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, label: "reviewing AI tool", color: "#4CAF50", shortcut: "1" },
    { id: 2, label: "talking to chat", color: "#2196F3", shortcut: "2" },
    { id: 3, label: "irrelevant", color: "#808080", shortcut: "3" },
  ]);
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);
  const [isManualCategorization, setIsManualCategorization] = useState(true);

  useEffect(() => {
    fetch('/transcript.json')
      .then(response => response.json())
      .then(data => {
        const formattedTranscript = data.chunks.map((chunk, index) => ({
          id: index + 1,
          text: chunk.text,
          category: getCategoryId(chunk.classification),
          timestamp: chunk.timestamp
        }));
        setTranscript(formattedTranscript);
      })
      .catch(error => console.error('Error loading transcript:', error));
  }, []);

  const getCategoryId = (classification) => {
    switch (classification) {
      case "reviewing AI tool":
        return 1;
      case "talking to chat":
        return 2;
      case "irrelevant":
        return 3;
      default:
        return 3; // Default to irrelevant if unknown
    }
  }

  const handleTextCategoryChange = (textId, newCategoryId) => {
    setTranscript(
      transcript.map((t) => (t.id === textId ? { ...t, category: newCategoryId } : t))
    )
  }

  const handleCategorize = (categoryId) => {
    setTranscript(transcript.map(
      (t, index) => (index === currentTranscriptIndex ? { ...t, category: categoryId } : t)
    ))
    handleNextTranscript()
  }

  const handleNextTranscript = () => {
    setCurrentTranscriptIndex((prevIndex) => prevIndex + 1)
  }

  const handlePreviousTranscript = () => {
    setCurrentTranscriptIndex((prevIndex) => prevIndex - 1)
  }

  const addCategory = (newCategory) => {
    const newId = Math.max(...categories.map(c => c.id)) + 1
    setCategories([...categories, { ...newCategory, id: newId }])
  }

  const updateCategory = (updatedCategory) => {
    setCategories(categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)))
  }

  const value = {
    transcript,
    setTranscript,
    categories,
    setCategories,
    currentTranscriptIndex,
    setCurrentTranscriptIndex,
    isManualCategorization,
    setIsManualCategorization,
    handleTextCategoryChange,
    handleCategorize,
    handleNextTranscript,
    handlePreviousTranscript,
    addCategory,
    updateCategory,
  };

  return (
    <CategoriserContext.Provider value={value}>
      {children}
    </CategoriserContext.Provider>
  );
};
