
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Designer",
    content: "Lostify helped me find my lost laptop bag at the airport! Their platform is so intuitive and the community is incredible.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Student",
    content: "I found someone's wallet and wanted to return it. Lostify made it super simple to connect with the owner. Great service!",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Teacher",
    content: "Lost my keys during a hiking trip and thought they were gone forever. Thanks to Lostify, someone found them and contacted me within hours!",
    rating: 5,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people have to say about their experience with Lostify.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-scale">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-foreground">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
