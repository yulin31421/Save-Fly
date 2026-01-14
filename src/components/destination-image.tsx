import { suggestDestinationImage } from '@/ai/flows/destination-image-suggestion';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import { Suspense } from 'react';
import placeholderData from '@/lib/placeholder-images.json';

interface DestinationImageProps {
  destination: string;
  country: string;
}

async function ImageFetcher({ destination, country }: DestinationImageProps) {
  let imageUrl: string;
  let imageHint: string = `${destination} ${country}`;

  try {
    const result = await suggestDestinationImage({ destination: `${destination}, ${country}` });
    imageUrl = result.imageUrl;
  } catch (error) {
    console.error('Failed to fetch destination image from AI:', error);
    const fallbackId = `${destination.toLowerCase()}_placeholder`;
    const fallbackImage = placeholderData.placeholderImages.find(p => p.id.startsWith(destination.toLowerCase()));
    imageUrl = fallbackImage?.imageUrl ?? 'https://picsum.photos/seed/travel/600/400';
    imageHint = fallbackImage?.imageHint ?? 'travel landscape';
  }

  return (
    <Image
      src={imageUrl}
      alt={`Image of ${destination}`}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      data-ai-hint={imageHint}
    />
  );
}

export function DestinationImage({ destination, country }: DestinationImageProps) {
  return (
    <div className="aspect-video w-full relative overflow-hidden">
      <Suspense fallback={<Skeleton className="w-full h-full" />}>
        <ImageFetcher destination={destination} country={country} />
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-2xl font-bold text-white font-headline">{destination}</h3>
        <p className="text-sm text-white/90">{country}</p>
      </div>
    </div>
  );
}
