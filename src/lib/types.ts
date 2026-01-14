import { z } from 'zod';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
  };
  duration: string;
  price: number;
  destinationCountry: 'Japan' | 'South Korea' | 'Thailand' | 'Vietnam' | 'Singapore';
  bookingUrl: string;
}

export const searchSchema = z.object({
  departure: z.string().min(1, 'Departure is required').default('TPE'),
  destinationCountry: z.string().default('any'),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  flexibleDates: z.boolean().default(false),
  travelers: z.coerce.number().min(1, "At least one traveler is required").default(1),
  travelStyle: z.array(z.string()).optional(),
  budget: z.string().optional(),
  flightTime: z.string().optional(),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
