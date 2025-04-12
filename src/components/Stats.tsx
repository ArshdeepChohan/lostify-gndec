
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
  { label: "Items Found", value: "12,500+" },
  { label: "Successful Returns", value: "9,800+" },
  { label: "Happy Users", value: "15,000+" },
  { label: "Areas Covered", value: "230+" },
];

const Stats = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="border-primary/10 hover-scale">
              <CardContent className="p-6 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
