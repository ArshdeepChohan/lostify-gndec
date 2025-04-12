
import ItemCard, { ItemCardProps } from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ItemsGridProps {
  items: ItemCardProps[];
  title: string;
  description?: string;
  showViewAllButton?: boolean;
  viewAllLink?: string;
}

const ItemsGrid = ({ items, title, description, showViewAllButton = true, viewAllLink = "#" }: ItemsGridProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-gndec-blue">{title}</h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
        
        {showViewAllButton && (
          <div className="mt-10 text-center">
            <Button 
              variant="outline" 
              className="border-gndec-blue text-gndec-blue hover:bg-gndec-blue/10 gap-2 group"
              asChild
            >
              <a href={viewAllLink}>
                View All Items
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemsGrid;
