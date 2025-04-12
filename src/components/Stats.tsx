
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
  { label: "Items Found", value: "1,250+", icon: "📚" },
  { label: "Successful Returns", value: "980+", icon: "🔄" },
  { label: "Happy Students", value: "1,500+", icon: "😊" },
  { label: "Campus Areas", value: "23+", icon: "🏫" },
];

const Stats = () => {
  return (
    <section className="py-14 section-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gndec-blue">
          Lost &amp; Found at GNDEC
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="light-card border-t-4 border-t-gndec-lightGreen">
              <CardContent className="p-6 text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-3xl sm:text-4xl font-bold text-gndec-burgundy mb-2">{stat.value}</p>
                <p className="text-gndec-blue font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
