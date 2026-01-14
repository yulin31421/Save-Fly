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

    let toMatchDate = true;
    
    // If specific dates are provided and flexibleDates is false, filter by them
    if (startDate && endDate && !flexibleDates) {
      const departureTime = new Date(flight.departure.time);
      departureTime.setHours(0, 0, 0, 0);
      
      const sDate = new Date(startDate);
      sDate.setHours(0, 0, 0, 0);
      const eDate = new Date(endDate);
      eDate.setHours(0, 0, 0, 0);
      
      toMatchDate = departureTime >= sDate && departureTime <= eDate;
    } else {
      // If no dates are provided, or if flexible is checked, filter for flights in the next 30 days
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const thirtyDaysFromNow = new Date(today);
      thirtyDaysFromNow.setDate(today.getDate() + 30);

      const departureTime = new Date(flight.departure.time);
      departureTime.setHours(0, 0, 0, 0);

      toMatchDate = departureTime >= today && departureTime <= thirtyDaysFromNow;
    }

    return toMatchDeparture && toMatchDestination && toMatchDate;
  });

  return filteredFlights.sort((a, b) => a.price - b.price).slice(0, 20);
}
