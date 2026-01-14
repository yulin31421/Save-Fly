import { SearchContainer } from '@/components/search-container';
import { Plane } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="py-12 sm:py-16 md:py-20 bg-card/50">
        <div className="container px-4 mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Plane className="w-10 h-10 text-primary sm:w-12 sm:h-12" />
            <div>
              <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl md:text-6xl text-foreground">
                Save & Fly
              </h1>
              <h2 className="text-2xl text-primary font-headline sm:text-3xl">省錢飛</h2>
            </div>
          </div>
          <p className="max-w-3xl mx-auto mt-6 text-base text-muted-foreground sm:text-lg">
            We believe travel is the spice of life and shouldn't be limited by high costs or tedious planning. Let us find the best deals for you, so you can embark on your next adventure with joy and excitement.
          </p>
        </div>
      </header>
      <main className="flex-grow w-full">
        <SearchContainer />
      </main>
      <footer className="py-6 mt-16 text-sm text-center text-muted-foreground">
        <div className="container px-4 mx-auto">
          <p>&copy; {new Date().getFullYear()} Save & Fly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
