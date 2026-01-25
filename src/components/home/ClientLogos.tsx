const clients = [
  { name: "The Grand Hotel", initials: "TGH" },
  { name: "Riverside Venues", initials: "RV" },
  { name: "Manor Events", initials: "ME" },
  { name: "Coastal Retreats", initials: "CR" },
  { name: "Garden House", initials: "GH" },
];

const ClientLogos = () => {
  return (
    <section className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Trusted by leading hospitality venues
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center h-10 px-4 text-muted-foreground/60 font-semibold tracking-wide text-sm hover:text-muted-foreground transition-colors"
              title={client.name}
            >
              <span className="font-display">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
