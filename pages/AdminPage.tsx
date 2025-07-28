
import React from 'react';
import { useSummaries } from '../hooks/useSummaries';
import { SummaryForm } from '../components/SummaryForm';
import { TrashIcon } from '../components/icons/TrashIcon';

export const AdminPage: React.FC = () => {
  const { summaries, addSummary, deleteSummary, loading } = useSummaries();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`האם אתה בטוח שברצונך למחוק את הסיכום "${title}"?`)) {
      deleteSummary(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">ממשק ניהול סיכומים</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SummaryForm onAddSummary={addSummary} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">סיכומים קיימים</h2>
          {loading ? (
            <p>טוען...</p>
          ) : (
            <ul className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {summaries.map(summary => (
                <li key={summary.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-semibold text-gray-800">{summary.title}</p>
                    <p className="text-sm text-gray-500">{summary.author}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(summary.id, summary.title)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                    aria-label={`Delete ${summary.title}`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="mt-8 bg-yellow-100 border-r-4 border-yellow-500 text-yellow-800 p-4 rounded-md">
          <p className="font-bold">הערה חשובה:</p>
          <p>כל הסיכומים שנוספים או נמחקים נשמרים בדפדפן המקומי שלך (localStorage). הם לא מעדכנים את קבצי המקור של הפרויקט. כדי לעדכן את קבצי ברירת המחדל, יש להעתיק את התוכן מ-localStorage ו לעדכן את הקובץ `summaries.json` ידנית.</p>
      </div>
    </div>
  );
};
