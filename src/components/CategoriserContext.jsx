import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const CategoriserContext = createContext();

export const useCategoriser = () => useContext(CategoriserContext);

export const CategoriserProvider = ({ children }) => {
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([
    { id: 1, label: "reviewing AI tool", color: "#4CAF50", shortcut: "1" },
    { id: 2, label: "talking to chat", color: "#2196F3", shortcut: "2" },
    { id: 3, label: "irrelevant", color: "#808080", shortcut: "3" },
  ]);
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(0);
  const [isDashboardView, setIsDashboardView] = useState(true);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const lastSavedTimeRef = useRef(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const saveTimerRef = useRef(null);

  useEffect(() => {
    const fetchTranscript = async () => {
      const response = await fetch("http://localhost:8787/transcript");
      const data = await response.json();
      console.log(data);
      setTranscript(data);
    };

    fetchTranscript()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error loading transcript:", error);
        setLoading(false);
      });
  }, []);

  const updateDatabase = useCallback(async () => {
    if (!hasUnsavedChanges) return;

    try {
      await fetch("http://localhost:8787/update_transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transcript),
      });
      console.log("Database updated successfully");
      const now = new Date();
      setLastSavedTime(now);
      lastSavedTimeRef.current = now;
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error updating database:", error);
    }
  }, [transcript, hasUnsavedChanges]);

  const scheduleUpdate = useCallback(() => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      updateDatabase();
    }, Math.min(3000, 15000 - (Date.now() - (lastSavedTimeRef.current?.getTime() || 0))));
  }, [updateDatabase]);

  const handleChange = useCallback(() => {
    setHasUnsavedChanges(true);
    scheduleUpdate();
  }, [scheduleUpdate]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
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
  };

  const handleTextCategoryChange = (textId, newCategoryId) => {
    setTranscript(transcript.map((t) =>
      t.id === textId ? { ...t, category: newCategoryId } : t
    ));
    handleChange();
  };

  const handleCategorize = (categoryId) => {
    setTranscript(
      transcript.map((t, index) =>
        index === currentTranscriptIndex ? { ...t, category: categoryId } : t
      )
    );
    handleNextTranscript();
    handleChange();
  };

  const handleNextTranscript = () => {
    setCurrentTranscriptIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousTranscript = () => {
    setCurrentTranscriptIndex((prevIndex) => prevIndex - 1);
  };

  const addCategory = (newCategory) => {
    const newId = Math.max(...categories.map((c) => c.id)) + 1;
    setCategories([...categories, { ...newCategory, id: newId }]);
    handleChange();
  };

  const updateCategory = (updatedCategory) => {
    setCategories(
      categories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
    );
    handleChange();
  };

  const value = {
    transcript,
    setTranscript,
    categories,
    setCategories,
    currentTranscriptIndex,
    setCurrentTranscriptIndex,
    isDashboardView,
    setIsDashboardView,
    handleTextCategoryChange,
    handleCategorize,
    handleNextTranscript,
    handlePreviousTranscript,
    addCategory,
    updateCategory,
    lastSavedTime,
    lastSavedTimeRef,
    hasUnsavedChanges,
    loading,
  };

  return (
    <CategoriserContext.Provider value={value}>
      {children}
    </CategoriserContext.Provider>
  );
};
