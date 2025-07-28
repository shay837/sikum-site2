
import React, { useState } from 'react';
import { Summary, Category } from '../types';
import initialCategories from '../data/categories.json';

interface SummaryFormProps {
  onAddSummary: (summary: Omit<Summary, 'id'>) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ onAddSummary }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [categoryId, setCategoryId] = useState(initialCategories[0]?.id || '');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [categories] = useState<Category[]>(initialCategories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !categoryId || !summaryText) {
      alert('אנא מלא את כל השדות.');
      return;
    }
    
    onAddSummary({
      title,
      author,
      categoryId,
      coverImageUrl: coverImageUrl || `https://picsum.photos/400/600?random=${Date.now()}`,
      summaryText,
    });

    // Reset form
    setTitle('');
    setAuthor('');
    setCategoryId(categories[0]?.id || '');
    setCoverImageUrl('');
    setSummaryText('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">הוספת סיכום חדש</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">כותרת</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">מחבר</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">קטגוריה</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            required
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="coverImageUrl" className="block text-sm font-medium text-gray-700 mb-1">קישור לתמונת כריכה (אופציונלי)</label>
          <input
            type="url"
            id="coverImageUrl"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="summaryText" className="block text-sm font-medium text-gray-700 mb-1">הסיכום</label>
        <textarea
          id="summaryText"
          value={summaryText}
          onChange={(e) => setSummaryText(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>
      
      <div className="flex justify-start">
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          שמור סיכום
        </button>
      </div>
    </form>
  );
};
