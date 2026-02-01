import { CheckCircle } from "lucide-react";
import belliniLogo from "@/assets/logos/bellinis-logo.png";
import wildDuckLogo from "@/assets/logos/wild-duck-logo.png";
import walshsImage from "@/assets/logos/walshs-hotel-image.jpg";

const venues = [
  {
    name: "Bellini's",
    location: "Newry",
    logo: belliniLogo,
    bgDark: true,
  },
  {
    name: "Walsh's Hotel",
    location: "Maghera",
    logo: walshsImage,
    bgDark: false,
  },
  {
    name: "The Wild Duck Inn",
    location: "Portglenone",
    logo: wildDuckLogo,
    bgDark: false,
  },
];

const LiveDeployments = () => {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide">
              <CheckCircle className="h-4 w-4 text-accent" />
              Live at
            </div>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <div 
                key={venue.name}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all"
              >
                <div 
                  className={`h-16 w-full flex items-center justify-center mb-4 rounded-lg ${
                    venue.bgDark ? 'bg-primary' : 'bg-white'
                  }`}
                >
                  <img 
                    src={venue.logo} 
                    alt={`${venue.name} logo`}
                    className="max-h-12 max-w-[140px] object-contain"
                  />
                </div>
                <p className="font-semibold text-foreground text-center">{venue.name}</p>
                <p className="text-sm text-muted-foreground">{venue.location}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            Enquiry capture & follow-up installed
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveDeployments;
