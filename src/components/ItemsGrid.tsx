
import ItemCard, { ItemCardProps } from "@/components/ItemCard";

interface ItemsGridProps {
  items: ItemCardProps[];
  title: string;
  description?: string;
}

const ItemsGrid = ({ items, title, description }: ItemsGridProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
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
      </div>
    </section>
  );
};

export default ItemsGrid;
