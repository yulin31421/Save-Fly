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

  const { departure, destination, startDate, endDate, flexibleDates } = validatedFields.data;

  const filteredFlights = mockFlights.filter(flight => {
    const toMatchDeparture = departure ? flight.departure.airport === departure : true;
    const toMatchDestination = destination ? flight.arrival.airport === destination : true;

    const toMatchDate = !flexibleDates && startDate && endDate
      ? new Date(flight.departure.time) >= startDate && new Date(flight.arrival.time) <= endDate
      : true;

    return toMatchDeparture && toMatchDestination && toMatchDate;
  });

  return filteredFlights.sort((a, b) => a.price - b.price).slice(0, 20);
}
