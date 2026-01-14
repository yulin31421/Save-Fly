'use client';

import { useState, useTransition } from 'react';
import type { Flight, SearchFormValues } from '@/lib/types';
import { SearchForm } from '@/components/search-form';
import { FlightResults } from '@/components/flight-results';
import { searchFlights } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { FlightCardSkeleton } from './flight-card-skeleton';

export function SearchContainer() {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<Flight[] | null>(null);
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = (data: SearchFormValues) => {
    startTransition(async () => {
      try {
        const flightResults = await searchFlights(data);
        setResults(flightResults);
        setSearched(true);
      } catch (error) {
        console.error('Search failed:', error);
        toast({
          variant: 'destructive',
          title: 'Search Error',
          description: 'Something went wrong while searching for flights. Please try again.',
        });
        setResults([]);
        setSearched(true);
      }
    });
  };

  return (
    <div className="container px-4 mx-auto mt-[-4rem] sm:mt-[-5rem]">
      <SearchForm onSearch={handleSearch} isSearching={isPending} />
      <div className="mt-8">
        {isPending ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <FlightCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <FlightResults flights={results} searched={searched} />
        )}
      </div>
    </div>
  );
}
