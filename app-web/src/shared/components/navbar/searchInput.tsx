// components/SearchInput.jsx
'use client'; // Mark as a Client Component if using hooks like useSearchParams

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

  const handleSearch = (event: { target: { value: any; }; }) => {
    const term = event.target.value;
    setSearchTerm(term);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.replace(`?${params.toString()}`); // Update URL without full page reload
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}