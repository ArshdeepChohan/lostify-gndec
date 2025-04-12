
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rajinder Singh",
    role: "Computer Science Student",
    content: "Lost my calculator before an important exam. Thanks to Lostify, I found it within hours! The GNDEC community is amazing.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Civil Engineering Student",
    content: "Found someone's project notes and used Lostify to return them. The platform made it super easy to connect with the owner.",
    rating: 5,
  },
  {
    name: "Dr. Amandeep Kaur",
    role: "Faculty Member",
    content: "As a professor, I'm impressed with how Lostify has organized the campus lost and found system. It's efficient and user-friendly.",
    rating: 5,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gndec-blue">What Our GNDEC Community Says</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from students and faculty who have used Lostify to find their lost items on campus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="gndec-card hover-scale">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gndec-burgundy">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Join hundreds of GNDEC students and faculty who have successfully used Lostify.
          </p>
          <Button className="gndec-btn">
            Share Your Experience
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
