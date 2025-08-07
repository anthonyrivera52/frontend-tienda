'use client'

import { useTranslation } from '@/core/i18n/useTranslation';
import React from 'react';

const OrderStatus = () => {
  // Static data mimicking the image
  const statusData = [
    { title: 'Pending Order', value: '0', icon: '📋', color: 'blue' },
    { title: 'Processing Order', value: '0', icon: '👥', color: 'orange' },
    { title: 'Completed Order', value: '0', icon: '📦', color: 'green' },
    { title: 'Cancelled Order', value: '0', icon: '💰', color: 'yellow' },
  ];

  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold text-green-800 mb-4">{t('order_status')}</h2>
      {/* <div className="flex justify-end space-x-2 mb-2">
        <button className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100">Today</button>
        <button className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100">Weekly</button>
        <button className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100">Monthly</button>
        <button className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100">Yearly</button>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {statusData.map((item, index) => (
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

export default OrderStatus;
