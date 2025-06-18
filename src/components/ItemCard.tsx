
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ClaimModal from "./ClaimModal";
import { useAuth } from "@/contexts/AuthContext";

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
  user_id?: string;
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
  user_id,
}: ItemCardProps) => {
  const [showClaimModal, setShowClaimModal] = useState(false);
  const { user } = useAuth();

  const canClaim = user && user_id && user.id !== user_id;

  return (
    <>
      <Card className="overflow-hidden hover-scale">
        <Link to={`/items/${id}`}>
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
        </Link>
        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="bg-secondary">
              {category}
            </Badge>
          </div>
          <Link to={`/items/${id}`}>
            <h3 className="text-lg font-semibold mb-2 line-clamp-1 hover:text-gndec-blue transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {description}
            </p>
          </Link>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2">
          <div className="w-full flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{date}</span>
            </div>
          </div>
          {canClaim && (
            <Button
              size="sm"
              variant="outline"
              className="w-full mt-2 border-gndec-green text-gndec-green hover:bg-gndec-green hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                setShowClaimModal(true);
              }}
            >
              <MessageCircle size={14} className="mr-1" />
              {type === "lost" ? "I Found This" : "This is Mine"}
            </Button>
          )}
        </CardFooter>
      </Card>

      {showClaimModal && user_id && (
        <ClaimModal
          isOpen={showClaimModal}
          onClose={() => setShowClaimModal(false)}
          itemId={id}
          itemTitle={title}
          itemOwnerId={user_id}
        />
      )}
    </>
  );
};

export default ItemCard;
