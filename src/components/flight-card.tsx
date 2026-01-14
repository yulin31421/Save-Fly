import type { Flight } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DestinationImage } from './destination-image';
import { CrownIcon } from './icons/crown';
import { AirlineLogo } from './icons/airline-logos';
import { ArrowRight, Clock, PlaneTakeoff, PlaneLanding } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
  index: number;
}

export async function FlightCard({ flight, index }: FlightCardProps) {
  const departureTime = new Date(flight.departure.time);
  const arrivalTime = new Date(flight.arrival.time);

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <DestinationImage
          destination={flight.arrival.city}
          country={flight.destinationCountry}
        />
        {index < 3 && (
          <Badge
            variant="default"
            className="absolute top-3 right-3 bg-amber-400 text-amber-900 hover:bg-amber-400"
          >
            <CrownIcon className="w-4 h-4 mr-1" />
            Best Value
          </Badge>
        )}
      </div>
      <CardContent className="flex flex-col flex-grow p-4">
        <div className="flex items-center gap-3 mb-3">
          <AirlineLogo airline={flight.airline} className="h-8" />
          <div>
            <p className="font-semibold text-foreground">{flight.airline}</p>
            <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{flight.departure.city}</span>
          <span>{flight.arrival.city}</span>
        </div>
        <div className="flex items-center gap-2 my-1">
          <span className="font-bold font-mono text-lg text-foreground">{flight.departure.airport}</span>
          <Separator className="flex-1" />
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <Separator className="flex-1" />
          <span className="font-bold font-mono text-lg text-foreground">{flight.arrival.airport}</span>
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <div className="flex items-center gap-2">
            <PlaneTakeoff className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono">{departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
          </div>
          <div className="flex items-center gap-2">
            <PlaneLanding className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono">{arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{flight.duration}</span>
        </div>
        <div className="flex-grow" />
      </CardContent>
      <CardFooter className="p-4 pt-0 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-end justify-between w-full">
            <div>
                <p className="text-sm text-muted-foreground">Price from</p>
                <p className="text-3xl font-bold font-headline text-primary">
                    ${flight.price}
                </p>
            </div>
          <Button asChild className="font-bold bg-accent text-accent-foreground hover:bg-accent/90">
            <a href={flight.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
