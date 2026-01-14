'use server';

/**
 * @fileOverview A flow for searching for flights.
 *
 * - searchFlightsFlow - A function that searches for flights based on given criteria.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { Flight, SearchFormValues } from '@/lib/types';
import { searchSchema } from '@/lib/types';
import { airports } from '@/lib/airports';

const FlightSchema: z.ZodType<Flight> = z.object({
  id: z.string().describe('A unique identifier for the flight.'),
  airline: z.string().describe('The name of the airline.'),
  flightNumber: z.string().describe('The flight number.'),
  departure: z.object({
    airport: z.string().describe('The IATA code of the departure airport.'),
    city: z.string().describe('The city of departure.'),
    time: z
      .string()
      .describe('The departure time in a valid ISO 8601 format (e.g., "2024-09-10T08:30:00.000Z").'),
  }),
  arrival: z.object({
    airport: z.string().describe('The IATA code of the arrival airport.'),
    city: z.string().describe('The city of arrival.'),
    time: z.string().describe('The arrival time in a valid ISO 8601 format (e.g., "2024-09-10T12:45:00.000Z").'),
  }),
  duration: z.string().describe('The total duration of the flight (e.g., "3h 15m").'),
  price: z.number().describe('The price of the flight in USD.'),
  destinationCountry: z.enum([
    'Japan',
    'South Korea',
    'Thailand',
    'Vietnam',
    'Singapore',
  ]),
  bookingUrl: z
    .string()
    .url()
    .describe('The URL to book the flight, which should always be "https://www.google.com/flights".'),
});

const SearchFlightsOutputSchema = z.array(FlightSchema);
type SearchFlightsOutput = z.infer<typeof SearchFlightsOutputSchema>;

const airlines = [
  'Starlux Airlines',
  'EVA Air',
  'China Airlines',
  'Korean Air',
  'Asiana Airlines',
  'Tway Air',
  'Thai Airways',
  'Thai Lion Air',
  'Vietnam Airlines',
  'VietJet Air',
  'Singapore Airlines',
  'Scoot',
  'Peach Aviation',
];

export async function searchFlightsFlow(
  input: SearchFormValues
): Promise<SearchFlightsOutput> {
  const airportMap = new Map(airports.map(a => [a.value, a.label]));
  const departureCity = airportMap.get(input.departure)?.split(' - ')[1].split(',')[0] ?? input.departure;
  const destinationCity = airportMap.get(input.destination)?.split(' - ')[1].split(',')[0] ?? input.destination;

  const { output } = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    prompt: `You are a flight search engine. Generate a list of 1 to 9 realistic flights based on the following criteria.
    
    Search Criteria:
    - Departure Airport: ${input.departure} (${departureCity})
    - Destination Airport: ${input.destination} (${destinationCity})
    - Start Date: ${input.startDate ? input.startDate.toISOString() : 'Not specified'}
    - End Date: ${input.endDate ? input.endDate.toISOString() : 'Not specified'}
    - Flexible Dates: ${input.flexibleDates ? 'Yes' : 'No'}
    - Number of Travelers: ${input.travelers}
    - Travel Styles: ${input.travelStyle?.join(', ') || 'Any'}
    - Budget: ${input.budget || 'Any'}
    - Flight Time Preference: ${input.flightTime || 'Any'}

    Important Instructions:
    1. If 'Flexible Dates' is true OR if Start/End dates are not specified, generate flights for various dates within the next 30-60 days.
    2. If specific dates are provided, generate flights within that date range.
    3. The flight times (departure and arrival) must be logical for the given route.
    4. CRITICAL: The 'time' fields for departure and arrival MUST be a valid ISO 8601 UTC string (e.g., "2024-09-10T08:30:00.000Z"). Do not use local time formats.
    5. The prices should be realistic for the route and budget preference. 'budget' is cheapest, 'mid' is moderate, 'comfort' is expensive.
    6. Use a variety of airlines from the provided list.
    7. The 'destinationCountry' must be correctly identified based on the destination airport.
    8. ALWAYS set the bookingUrl to 'https://www.google.com/flights'.
    9. Generate between 1 and 9 flights.
    10. Ensure the ID for each flight is a unique string.

    Available Airlines: ${airlines.join(', ')}
    `,
    output: { schema: SearchFlightsOutputSchema },
  });

  return output ?? [];
}
