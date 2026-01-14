'use server';

import { z } from 'zod';
import { searchSchema } from './types';
import { searchFlightsFlow } from '@/ai/flows/search-flights-flow';

export async function searchFlights(
  values: z.infer<typeof searchSchema>
) {
  const validatedFields = searchSchema.safeParse(values);

  if (!validatedFields.success) {
    // This should not happen if the form validation is working correctly.
    console.error('Invalid search fields:', validatedFields.error);
    throw new Error('Invalid search criteria.');
  }

  // Call the Genkit flow to get flight results
  const flights = await searchFlightsFlow(validatedFields.data);

  return flights;
}
