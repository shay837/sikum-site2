
import { useState, useEffect, useCallback } from 'react';
import { Summary } from '../types';
import initialSummaries from '../data/summaries.json';

const STORAGE_KEY = 'sikum_summaries';

export const useSummaries = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedSummaries = localStorage.getItem(STORAGE_KEY);
      if (storedSummaries) {
        setSummaries(JSON.parse(storedSummaries));
      } else {
        // If nothing in storage, initialize with the JSON file content
        setSummaries(initialSummaries);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSummaries));
      }
    } catch (error) {
      console.error("Failed to load summaries from localStorage", error);
      // Fallback to initial data if localStorage is corrupt or unavailable
      setSummaries(initialSummaries);
    } finally {
      setLoading(false);
    }
  }, []);

  const addSummary = useCallback((newSummaryData: Omit<Summary, 'id'>) => {
    setSummaries(prevSummaries => {
      const newSummary: Summary = {
        ...newSummaryData,
        id: `${newSummaryData.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
      };
      const updatedSummaries = [newSummary, ...prevSummaries];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSummaries));
      return updatedSummaries;
    });
  }, []);

  const deleteSummary = useCallback((summaryId: string) => {
    setSummaries(prevSummaries => {
      const updatedSummaries = prevSummaries.filter(s => s.id !== summaryId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSummaries));
      return updatedSummaries;
    });
  }, []);
  
  const getSummaryById = useCallback((id: string): Summary | undefined => {
    return summaries.find(s => s.id === id);
  }, [summaries]);

  return { summaries, loading, addSummary, deleteSummary, getSummaryById };
};
