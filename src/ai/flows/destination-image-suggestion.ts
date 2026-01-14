'use server';

/**
 * @fileOverview Fetches a relevant image URL for a given destination using Google Images.
 *
 * - suggestDestinationImage - A function that retrieves an image URL for a destination.
 * - DestinationImageSuggestionInput - The input type for the suggestDestinationImage function.
 * - DestinationImageSuggestionOutput - The return type for the suggestDestinationImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DestinationImageSuggestionInputSchema = z.object({
  destination: z.string().describe('The destination to find an image for.'),
});
export type DestinationImageSuggestionInput = z.infer<
  typeof DestinationImageSuggestionInputSchema
>;

const DestinationImageSuggestionOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the suggested image.'),
});
export type DestinationImageSuggestionOutput = z.infer<
  typeof DestinationImageSuggestionOutputSchema
>;

export async function suggestDestinationImage(
  input: DestinationImageSuggestionInput
): Promise<DestinationImageSuggestionOutput> {
  return destinationImageSuggestionFlow(input);
}

const destinationImageSuggestionPrompt = ai.definePrompt({
  name: 'destinationImageSuggestionPrompt',
  input: {schema: DestinationImageSuggestionInputSchema},
  output: {schema: DestinationImageSuggestionOutputSchema},
  prompt: `Find a representative image URL for {{{destination}}} from Google Images. Return only the URL.`,
});

const destinationImageSuggestionFlow = ai.defineFlow(
  {
    name: 'destinationImageSuggestionFlow',
    inputSchema: DestinationImageSuggestionInputSchema,
    outputSchema: DestinationImageSuggestionOutputSchema,
  },
  async input => {
    const {output} = await destinationImageSuggestionPrompt(input);
    return output!;
  }
);
