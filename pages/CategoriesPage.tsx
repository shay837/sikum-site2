
import React, { useState, useMemo } from 'react';
import { useSummaries } from '../hooks/useSummaries';
import { SummaryCard } from '../components/SummaryCard';
import { Category } from '../types';
import initialCategories from '../data/categories.json';

export const CategoriesPage: React.FC = () => {
  const { summaries, loading } = useSummaries();
  const [categories] = useState<Category[]>(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const filteredSummaries = useMemo(() => {
    if (!selectedCategoryId) {
      return summaries;
    }
    return summaries.filter(s => s.categoryId === selectedCategoryId);
  }, [summaries, selectedCategoryId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">סיכומים לפי קטגוריה</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedCategoryId(null)}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            selectedCategoryId === null
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200 shadow-sm border'
          }`}
        >
          כל הסיכומים
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedCategoryId === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200 shadow-sm border'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">טוען סיכומים...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSummaries.map(summary => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      )}
    </div>
  );
};
