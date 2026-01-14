import type { Flight } from '@/lib/types';
import { FlightCard } from './flight-card';

interface FlightResultsProps {
  flights: Flight[] | null;
  searched: boolean;
}

export function FlightResults({ flights, searched }: FlightResultsProps) {
  if (!searched) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <h3 className="text-xl font-semibold">Ready to explore?</h3>
        <p>Fill out the form above to find your next adventure!</p>
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <h3 className="text-xl font-semibold">No flights found</h3>
        <p>Try adjusting your search criteria for more results.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold font-headline">
        Top {flights.length} Results For You
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {flights.map((flight, index) => (
          <FlightCard key={flight.id} flight={flight} index={index} />
        ))}
      </div>
    </div>
  );
}
