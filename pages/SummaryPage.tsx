
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSummaries } from '../hooks/useSummaries';
import { Summary } from '../types';

export const SummaryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getSummaryById, loading } = useSummaries();
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    if (id && !loading) {
      const foundSummary = getSummaryById(id);
      setSummary(foundSummary || null);
    }
  }, [id, getSummaryById, loading]);

  if (loading) {
    return <p className="text-center py-10">טוען...</p>;
  }

  if (!summary) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">סיכום לא נמצא</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">חזור לדף הבית</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img 
              className="h-96 w-full object-cover md:w-64" 
              src={summary.coverImageUrl} 
              alt={`Cover for ${summary.title}`} 
            />
          </div>
          <div className="p-8 flex-grow">
            <h1 className="text-4xl font-extrabold text-gray-900">{summary.title}</h1>
            <h2 className="mt-2 text-xl text-gray-600">{summary.author}</h2>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">תקציר</h3>
              <div className="prose prose-lg text-gray-700 whitespace-pre-line leading-relaxed">
                {summary.summaryText}
              </div>
            </div>
             <div className="mt-8 text-right">
                <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
                    &larr; חזרה לכל הסיכומים
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
