
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export type ItemType = "lost" | "found";

export interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  image: string;
  type: ItemType;
}

const ItemCard = ({
  id,
  title,
  description,
  category,
  location,
  date,
  image,
  type,
}: ItemCardProps) => {
  return (
    <Link to={`/items/${id}`}>
      <Card className="overflow-hidden hover-scale">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge
            className="absolute top-3 right-3"
            variant={type === "lost" ? "destructive" : "default"}
          >
            {type === "lost" ? "Lost" : "Found"}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="bg-secondary">
              {category}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemCard;
