'use client'

import { useTranslation } from '@/core/i18n/useTranslation';
import React from 'react';

const DashboardSummary = () => {
    const { t } = useTranslation();
  // Static data mimicking the image
  const summaryData = [
    { title: 'Total Revenue', value: '$1,818.80', icon: '💰', color: 'teal' },
    { title: 'Total Order', value: '14', icon: '🛒', color: 'purple' },
    { title: 'Vendor', value: '11', icon: '📋', color: 'indigo' },
    { title: 'Total Shops', value: '14', icon: '🏪', color: 'rose' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold text-teal-800 mb-4">{t('summary')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 border border-gray-200 flex flex-col items-center text-center"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <h3 className="text-gray-600 text-sm font-medium">{item.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
            <div
              className={`w-16 h-1 mt-2 rounded-full bg-${item.color}-500`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSummary;
