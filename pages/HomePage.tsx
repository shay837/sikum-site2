
import React, { useState, useMemo } from 'react';
import { useSummaries } from '../hooks/useSummaries';
import { SummaryCard } from '../components/SummaryCard';

export const HomePage: React.FC = () => {
  const { summaries, loading } = useSummaries();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSummaries = useMemo(() => {
    if (!searchTerm) {
      return summaries;
    }
    return summaries.filter(summary =>
      summary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [summaries, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center bg-white p-10 rounded-lg shadow-md mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">ברוכים הבאים לסיכום</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          מאגר אישי של סיכומי ספרים, שנכתבו בקפידה כדי לזקק תובנות ורעיונות מרכזיים.
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="חפש סיכום לפי כותרת או מחבר..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 text-lg border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">טוען סיכומים...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSummaries.length > 0 ? (
            filteredSummaries.map(summary => (
              <SummaryCard key={summary.id} summary={summary} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">לא נמצאו סיכומים התואמים את החיפוש.</p>
          )}
        </div>
      )}
    </div>
  );
};
