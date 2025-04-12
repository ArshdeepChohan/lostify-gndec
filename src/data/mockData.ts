
import { ItemCardProps } from "@/components/ItemCard";

export const mockLostItems: ItemCardProps[] = [
  {
    id: "1",
    title: "Black Leather Wallet",
    description: "Lost my wallet near Central Park. Contains ID, credit cards, and a family photo. Reward offered.",
    category: "Accessories",
    location: "Central Park, New York",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "lost",
  },
  {
    id: "2",
    title: "Golden Retriever Dog",
    description: "My dog Max went missing from our backyard. He's friendly and wearing a red collar with tags.",
    category: "Pets",
    location: "Riverdale, Bronx",
    date: "April 9, 2025",
    image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "lost",
  },
  {
    id: "3",
    title: "iPhone 14 Pro",
    description: "Lost my phone at Starbucks on 5th Avenue. It has a blue case with a photo of my cat on the back.",
    category: "Electronics",
    location: "5th Avenue, New York",
    date: "April 8, 2025",
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "lost",
  },
  {
    id: "4",
    title: "Car Keys with Rabbit Foot Keychain",
    description: "Lost my car keys somewhere between the grocery store and my apartment. Has a distinctive rabbit foot keychain.",
    category: "Keys",
    location: "Brooklyn Heights",
    date: "April 7, 2025",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "lost",
  },
];

export const mockFoundItems: ItemCardProps[] = [
  {
    id: "5",
    title: "Silver Necklace with Heart Pendant",
    description: "Found this necklace on the jogging trail at Prospect Park. Looks like it has sentimental value.",
    category: "Jewelry",
    location: "Prospect Park, Brooklyn",
    date: "April 11, 2025",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "found",
  },
  {
    id: "6",
    title: "Prescription Glasses",
    description: "Found these glasses at the library. They have tortoise shell frames and seem to be prescription.",
    category: "Accessories",
    location: "NY Public Library",
    date: "April 10, 2025",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "found",
  },
  {
    id: "7",
    title: "Blue Backpack",
    description: "Found a blue backpack on the subway. Contains some books and a water bottle. Left it with the station manager.",
    category: "Bags",
    location: "14th St Subway Station",
    date: "April 9, 2025",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "found",
  },
  {
    id: "8",
    title: "Child's Teddy Bear",
    description: "Found this teddy bear at the playground. It looks well-loved and I'm sure someone misses it.",
    category: "Toys",
    location: "Madison Square Park",
    date: "April 8, 2025",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "found",
  },
];

export const allItems = [...mockLostItems, ...mockFoundItems];
