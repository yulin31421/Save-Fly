'use server';

import { z } from 'zod';
import { mockFlights } from './mock-data';
import type { Flight } from './types';
import { searchSchema } from './types';

export async function searchFlights(
  values: z.infer<typeof searchSchema>
): Promise<Flight[]> {

  await new Promise(resolve => setTimeout(resolve, 1500));

  const validatedFields = searchSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error('Invalid search criteria.');
  }

  const { destinationCountry, dateRange, flexibleDates } = validatedFields.data;

  const filteredFlights = mockFlights.filter(flight => {
    const toMatchCountry = destinationCountry && destinationCountry !== 'any' 
      ? flight.destinationCountry === destinationCountry 
      : true;

    const toMatchDate = !flexibleDates && dateRange && dateRange.from && dateRange.to
      ? new Date(flight.departure.time) >= dateRange.from && new Date(flight.departure.time) <= dateRange.to
      : true;

    return toMatchCountry && toMatchDate;
  });

  return filteredFlights.sort((a, b) => a.price - b.price).slice(0, 20);
}
