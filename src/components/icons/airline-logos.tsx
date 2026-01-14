import Image from 'next/image';

interface AirlineLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  airline: string;
}

const StarluxLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#2E3A59"/>
    <path d="M50 20 L55 35 L70 35 L58 45 L63 60 L50 50 L37 60 L42 45 L30 35 L45 35 Z" fill="#E8B923"/>
  </svg>
);

const EvaAirLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#007A33"/>
    <path d="M30,30 L70,50 L30,70 Z" fill="white"/>
  </svg>
);

const ChinaAirlinesLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#C0002A"/>
    <path d="M50 25 C 65 25, 75 40, 75 50 C 75 60, 65 75, 50 75 C 35 75, 25 60, 25 50 C 25 40, 35 25, 50 25 Z" stroke="#FFFFFF" strokeWidth="8"/>
    <path d="M40 40 L 60 60 M 60 40 L 40 60" stroke="#FFFFFF" strokeWidth="6"/>
  </svg>
);

const DefaultLogo = ({ name, ...props }: React.SVGProps<SVGSVGElement> & { name: string }) => (
    <svg {...props} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="hsl(var(--muted))"/>
        <text x="50" y="55" fontFamily="sans-serif" fontSize="12" fill="hsl(var(--muted-foreground))" textAnchor="middle" dominantBaseline="middle">
            {name.split(' ').map(n => n[0]).join('')}
        </text>
    </svg>
)

const airlineLogoMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  'Starlux Airlines': StarluxLogo,
  'EVA Air': EvaAirLogo,
  'China Airlines': ChinaAirlinesLogo,
};

export function AirlineLogo({ airline, className }: AirlineLogoProps) {
  const LogoComponent = airlineLogoMap[airline];
  return (
    <div className={`aspect-square w-10 ${className}`}>
      {LogoComponent ? <LogoComponent className="w-full h-full" /> : <DefaultLogo name={airline} className="w-full h-full" />}
    </div>
  );
}
