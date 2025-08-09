'use client'

import { GET } from '@/app/api/dashboard/summary/routes';
import { Summary } from '@/core/dashboard/summary/lib/types';
import { useTranslation } from '@/core/i18n/useTranslation';
import React, { useEffect, useState, useCallback } from 'react';
import { Skeleton } from './skeleton/page';

// Define Sale type for potential WebSocket integration
interface Sale {
  amount: number;
  // Add other fields as needed (e.g., orderId, vendorId)
}

const DashboardSummary = () => {
  const { t } = useTranslation();
  const [summary, setSummary] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalTime = process.env.NEXT_PUBLIC_SUMMARY_INTERVAL
  ? parseInt(process.env.NEXT_PUBLIC_SUMMARY_INTERVAL, 10)
  : 300000;
  const retriesIntent = process.env.NEXT_PUBLIC_RETRIES_INTENT
  ? parseInt(process.env.NEXT_PUBLIC_RETRIES_INTENT, 10)
  : 3
  const waitCallFunction = process.env.NEXT_PUBLIC_WAIT_CALL_FUNCTION
  ? parseInt(process.env.NEXT_PUBLIC_WAIT_CALL_FUNCTION, 10)
  : 2000

  const fetchSummary = useCallback(async (retries = retriesIntent) => {
    setLoading(true);
    setError(null);
    try {
      const response = await GET();
      setSummary(response);
    } catch (err) {
      if (retries > 0) {
        console.warn(`Retrying... Attempts left: ${retries}`);
        await new Promise((resolve) => setTimeout(resolve, waitCallFunction));
        await fetchSummary(retries - 1);
      } else {
        setError('Failed to fetch summary data after multiple attempts.');
        console.error('Error fetching summary:', err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchSummary();

    // Set interval to fetch data every 5 minutes (300,000 ms)
    const intervalId = setInterval(fetchSummary, intervalTime);

    // Optional WebSocket integration (uncomment and configure if needed)
    // let socket;
    // if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_WEBSOCKET === 'true') {
    //   socket = io('http://localhost:3001');
    //   socket.on('sale', (sale: Sale) => {
    //     console.log('New sale received:', sale);
    //     setSummary((prevSummary) =>
    //       prevSummary.map((item) => {
    //         if (item.title === 'Total Revenue') {
    //           return { ...item, value: (parseFloat(item.value as string) + sale.amount).toFixed(2) };
    //         } else if (item.title === 'Total Order') {
    //           return { ...item, value: (parseInt(item.value as string) + 1).toString() };
    //         }
    //         return item;
    //       })
    //     );
    //   });
    // }

    // Cleanup interval and WebSocket (if enabled)
    return () => {
      clearInterval(intervalId);
      // if (socket) socket.disconnect();
    };
  }, [fetchSummary]); // Include fetchSummary as dependency

  // Render logic with accessibility and error handling
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500" role="alert">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <h2 className="text-lg font-semibold text-teal-800 mb-4" aria-label={t('summary')}>
            {t('summary')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {summary.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 border border-gray-200 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md"
                role="region"
                aria-label={`Summary card for ${item.title}`}
              >
                <div className="text-2xl mb-2" aria-hidden="true">
                  {typeof item.icon === 'string' ? item.icon : ''}
                </div>
                <h3 className="text-gray-600 text-sm font-medium">{item.title}</h3>
                <p className="text-2xl font-bold text-gray-900" aria-live="polite">
                  {item.value}
                </p>
                <div
                  className={`w-16 h-1 mt-2 rounded-full bg-${item.color}-500 transition-colors duration-300`}
                ></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSummary;
