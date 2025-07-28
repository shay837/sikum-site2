
import React from 'react';
import { Link } from 'react-router-dom';
import { Summary } from '../types';

interface SummaryCardProps {
  summary: Summary;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  return (
    <Link 
      to={`/summary/${summary.id}`} 
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative">
        <img 
          src={summary.coverImageUrl} 
          alt={`Cover of ${summary.title}`} 
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{summary.title}</h3>
        <p className="text-md text-gray-600 mt-1">{summary.author}</p>
      </div>
    </Link>
  );
};
